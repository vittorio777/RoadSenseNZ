import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PracticePage from "./PracticePage";
import { allMockScenario } from "../content/scenario";

vi.mock("./ScenarioCanvas", () => ({ default: () => <div>Road scene</div> }));
// Keep these tests independent of WebGL, external map services, and API keys.
vi.mock("./ScenarioMap", () => ({ default: () => <div>Location map</div> }));

const storageKey = "roadsense.progress.v1";
const enabledKey = "roadsense.progress.enabled.v1";
const scenario = allMockScenario.find((entry) => entry.meta.stage === "unsignalised_intersections")!;
const correct = scenario.questions.options.find((option) => option.isCorrect)!;

async function openChapter(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Chapters" }));
  await user.click(screen.getByRole("button", { name: "Intersections" }));
  await user.click(screen.getByRole("button", { name: "Unsignalised" }));
}

describe("practice progress", () => {
  it("saves an answer and restores feedback after remounting", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<PracticePage />);
    await openChapter(user);
    await user.click(screen.getByRole("button", { name: `${correct.id}${correct.text}` }));
    expect(JSON.parse(localStorage.getItem(storageKey)!)[scenario.meta.scenarioId]).toBe(
      scenario.questions.options.indexOf(correct),
    );
    unmount();
    render(<PracticePage />);
    await openChapter(user);
    expect(screen.getByRole("heading", { name: "Correct" })).toBeInTheDocument();
    expect(screen.getByText(scenario.questions.explanation)).toBeInTheDocument();
  });

  it("clears saved answers and stops persisting when memory is disabled", async () => {
    const user = userEvent.setup();
    render(<PracticePage />);
    await openChapter(user);
    await user.click(screen.getByRole("button", { name: `${correct.id}${correct.text}` }));
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("button", { name: "Turn memory off" }));
    expect(localStorage.getItem(storageKey)).toBeNull();
    expect(localStorage.getItem(enabledKey)).toBe("false");
    expect(screen.queryByText(scenario.questions.explanation)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: `${correct.id}${correct.text}` }));
    expect(screen.getByRole("heading", { name: "Correct" })).toBeInTheDocument();
    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it("recovers from malformed saved JSON", async () => {
    localStorage.setItem(storageKey, "{broken json");
    const user = userEvent.setup();
    render(<PracticePage />);
    await openChapter(user);
    expect(screen.getByRole("heading", { name: scenario.questions.prompt })).toBeInTheDocument();
    expect(screen.queryByText(scenario.questions.explanation)).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({});
  });

  it("ignores old saved answers when memory was already disabled", async () => {
    localStorage.setItem(enabledKey, "false");
    localStorage.setItem(storageKey, JSON.stringify({ [scenario.meta.scenarioId]: scenario.questions.options.indexOf(correct) }));
    const user = userEvent.setup();
    render(<PracticePage />);
    await openChapter(user);
    expect(screen.queryByText(scenario.questions.explanation)).not.toBeInTheDocument();
    expect(localStorage.getItem(storageKey)).toBeNull();
  });
});
