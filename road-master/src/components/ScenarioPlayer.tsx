import { useState } from "react";
import ScenarioCanvas from "./ScenarioCanvas";
import type { InterScenario, Scenario } from "../contracts/scenario";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StaticVisualRenderer from "./staticVisual/StaticVisualRenderer";

const ScenarioPlayer = ({
  mockScenario,
  handleUserSelections,
  userSelectedOption,
  isWideLayout = false,
  chapterNavigation,
}: {
  mockScenario: Scenario;
  handleUserSelections: (optionIndex: number) => void;
  userSelectedOption: number | null;
  isWideLayout?: boolean;
  chapterNavigation?: {
    currentIndex: number;
    total: number;
    onPrevious: () => void;
    onNext: () => void;
  };
}) => {
  const [replayKey, setReplayKey] = useState(0);
  const [interScenario, setInterScenario] = useState<InterScenario>(
    getIntroScenario(mockScenario),
  );
  const interactionType = mockScenario.meta.interactionType;
  const isAutoplayPauseReplay = interactionType === "AUTOPLAY_PAUSE_REPLAY";
  const isStaticOnly = interactionType === "STATIC_ONLY";
  const shouldUseStaticVisual = isStaticOnly && Boolean(mockScenario.staticVisual);
  const isLoopMode =
    interactionType === "LOOP_WITH_CHOICES" ||
    interactionType === "LOOP_GATED_CHOICES";
  const playbackMode = isStaticOnly ? "static" : isLoopMode ? "loop" : "once";

  function handleOptionSelect(optionId: string) {
    const optionIndex = optionId.charCodeAt(0) - "A".charCodeAt(0);

    if (isAutoplayPauseReplay) {
      const optionTrack = mockScenario.animations.script.optionTracks.find(
        (track) => track.optionId === optionId,
      );

      if (optionTrack) {
        setInterScenario({
          ...interScenario,
          tracks: optionTrack.tracks,
          duration: mockScenario.animations.script.optionDuration,
        });
        setReplayKey((prev) => prev + 1);
      }
    }

    handleUserSelections(optionIndex);
  }

  function handleReplaySetup() {
    setInterScenario(getIntroScenario(mockScenario));
    setReplayKey((prev) => prev + 1);
  }

  const selectedOption =
    userSelectedOption != null
      ? mockScenario.questions.options[userSelectedOption]
      : null;
  const correctOption = mockScenario.questions.options.find(
    (option) => option.isCorrect,
  );

  return (
    <div className="space-y-4">
      <section className="relative overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3">
        {shouldUseStaticVisual && mockScenario.staticVisual ? (
          <StaticVisualRenderer
            visual={mockScenario.staticVisual}
            isWideLayout={isWideLayout}
          />
        ) : (
          <ScenarioCanvas
            key={replayKey}
            scenario={interScenario}
            isWideLayout={isWideLayout}
            playback={playbackMode}
          />
        )}
        {isAutoplayPauseReplay && (
          <div className="absolute bottom-3 right-3">
            <button
              type="button"
              onClick={handleReplaySetup}
              className="rounded-md border border-zinc-300 bg-white/95 px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm hover:bg-white"
            >
              Replay setup
            </button>
          </div>
        )}
      </section>

      <div className="rounded-lg border border-zinc-200 bg-white">
        <section className="border-b border-zinc-200 px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                Question
              </p>
              <h2 className="mt-2 pl-4 text-[17px] font-semibold leading-6 text-zinc-950">
                {mockScenario.questions.prompt}
              </h2>
              <p className="mt-1 pl-4 text-sm leading-5 text-zinc-600">
                {mockScenario.meta.preview}
              </p>
            </div>

            {chapterNavigation && (
              <div className="mt-0.5 flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={chapterNavigation.onPrevious}
                  disabled={chapterNavigation.currentIndex === 0}
                  aria-label="Previous question"
                  title="Previous question"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-zinc-500"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={chapterNavigation.onNext}
                  disabled={
                    chapterNavigation.currentIndex >=
                    chapterNavigation.total - 1
                  }
                  aria-label="Next question"
                  title="Next question"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-zinc-500"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="px-6 py-3">
          <ul className={["grid gap-2", isWideLayout ? "grid-cols-2" : ""].join(" ")}>
            {mockScenario.questions.options.map((option) => {
              const optionIndex = option.id.charCodeAt(0) - "A".charCodeAt(0);
              const isSelected = userSelectedOption === optionIndex;

              return (
                <li key={option.id}>
                  <button
                    type="button"
                    onClick={() => handleOptionSelect(option.id)}
                    className={[
                      "group flex h-full w-full items-center gap-3 rounded-md border px-4 py-2.5 text-left transition",
                      isSelected
                        ? option.isCorrect
                          ? "border-green-300 bg-green-50"
                          : "border-red-300 bg-red-50"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                        isSelected
                          ? option.isCorrect
                            ? "border-green-600 bg-green-600 text-white"
                            : "border-red-600 bg-red-600 text-white"
                          : "border-zinc-300 bg-zinc-50 text-zinc-700 group-hover:border-zinc-500",
                      ].join(" ")}
                    >
                      {option.id}
                    </span>
                    <span className="text-sm leading-5 text-zinc-800">
                      {option.text}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {selectedOption && (
          <section
            className={[
              "border-t px-6 py-5",
              selectedOption.isCorrect
                ? "border-green-200 bg-green-50/70"
                : "border-red-200 bg-red-50/70",
            ].join(" ")}
          >
            <div className="flex items-start gap-3">
              <span
                className={[
                  "mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full",
                  selectedOption.isCorrect ? "bg-green-600" : "bg-red-600",
                ].join(" ")}
              />
              <div>
                <h3 className="text-sm font-semibold text-zinc-950">
                  {selectedOption.isCorrect ? "Correct" : "Review this choice"}
                </h3>
                {!selectedOption.isCorrect && correctOption && (
                  <p className="mt-2 text-sm font-medium text-zinc-800">
                    Correct answer: {correctOption.id}. {correctOption.text}
                  </p>
                )}
                <p className="mt-2 text-sm leading-6 text-zinc-700">
                  {mockScenario.questions.explanation}
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

function getIntroScenario(mockScenario: Scenario): InterScenario {
  return {
    tracks: mockScenario.animations.script.introTracks,
    duration: mockScenario.animations.script.introDuration,
    width: mockScenario.animations.width,
    height: mockScenario.animations.height,
    templateName: mockScenario.animations.template,
  };
}

export default ScenarioPlayer;
