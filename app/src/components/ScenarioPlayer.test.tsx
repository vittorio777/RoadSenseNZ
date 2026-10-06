import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { useState } from "react";
import ScenarioPlayer from "./ScenarioPlayer";
import { allMockScenario } from "../content/scenario";
import type { Scenario, InterScenario } from "../contracts/scenario";

// Canvas pixels are checked manually; expose the playback payload to check player transitions.
vi.mock("./ScenarioCanvas", () => ({
  default: ({ scenario }: { scenario: InterScenario }) =>
    <output data-testid="playback">{JSON.stringify(scenario)}</output>,
}));

const scenario = allMockScenario.find((item) =>
  item.meta.interactionType === "AUTOPLAY_PAUSE_REPLAY" && item.animations.script.optionTracks.length > 0)!;

function Player({ data = scenario }: { data?: Scenario }) {
  const [answer, setAnswer] = useState<number | null>(null);
  return <ScenarioPlayer mockScenario={data} handleUserSelections={setAnswer} userSelectedOption={answer} />;
}

describe("scenario practice", () => {
  it("shows feedback only after answering and explains an incorrect choice", async () => {
    const user = userEvent.setup();
    render(<Player />);
    expect(screen.queryByText(scenario.questions.explanation)).not.toBeInTheDocument();
    const incorrect = scenario.questions.options.find((option) => !option.isCorrect)!;
    await user.click(screen.getByRole("button", { name: `${incorrect.id}${incorrect.text}` }));
    expect(screen.getByText("Review this choice")).toBeInTheDocument();
    expect(screen.getByText(scenario.questions.explanation)).toBeInTheDocument();
    const correct = scenario.questions.options.find((option) => option.isCorrect)!;
    expect(screen.getByText(`Correct answer: ${correct.id}. ${correct.text}`)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: `${correct.id}${correct.text}` }));
    expect(screen.getByText("Correct", { exact: true })).toBeInTheDocument();
    expect(screen.queryByText("Review this choice")).not.toBeInTheDocument();
  });

  it("plays the chosen outcome and restores the intro on replay", async () => {
    const user = userEvent.setup();
    render(<Player />);
    const initial = screen.getByTestId("playback").textContent;
    const outcome = scenario.animations.script.optionTracks[0];
    const option = scenario.questions.options.find((entry) => entry.id === outcome.optionId)!;
    await user.click(screen.getByRole("button", { name: `${option.id}${option.text}` }));
    expect(JSON.parse(screen.getByTestId("playback").textContent!).tracks).toEqual(outcome.tracks);
    await user.click(screen.getByRole("button", { name: "Replay setup" }));
    expect(screen.getByTestId("playback").textContent).toBe(initial);
    expect(screen.getByText(scenario.questions.explanation)).toBeInTheDocument();
  });

  it("renders static content without animated replay controls", () => {
    const data = allMockScenario.find((item) => item.staticVisual)!;
    render(<Player data={data} />);
    expect(screen.queryByTestId("playback")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Replay setup" })).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: data.questions.prompt })).toBeInTheDocument();
  });

  it("disables navigation at chapter boundaries", () => {
    const next = vi.fn();
    const props = { mockScenario: scenario, handleUserSelections: vi.fn(), userSelectedOption: null };
    const { rerender } = render(<ScenarioPlayer {...props} chapterNavigation={{ currentIndex: 0, total: 2, onPrevious: vi.fn(), onNext: next }} />);
    expect(screen.getByRole("button", { name: "Previous question" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next question" })).toBeEnabled();
    rerender(<ScenarioPlayer {...props} chapterNavigation={{ currentIndex: 1, total: 2, onPrevious: vi.fn(), onNext: next }} />);
    expect(screen.getByRole("button", { name: "Next question" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Previous question" })).toBeEnabled();
  });
});
