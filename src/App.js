import React, { useState, useEffect } from "react";
import questions from "./questions.json";
import ToolTip from "./ToolTip";
import Footer from "./Footer";

export default function App() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [solution, setSolution] = useState("");
    const [hint, setHint] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const getNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSolution(""); // Clear the solution when moving to the next question
            setHint(questions[currentQuestionIndex + 1].hint);
            setShowHint(false); // Hide the hint when moving to the next question
            setSeconds(0); // Reset the timer when moving to the next question
        } else {
            // If you want to loop back to the first question when reaching the end
            setCurrentQuestionIndex(0);

            // If you want to disable the button when reaching the end
            // setCurrentQuestionIndex(questions.length - 1);
        }
    };

    const showSolution = () => {
        // Get the current question's solution
        const currentSolution = questions[currentQuestionIndex].solution;

        // Update the state variable with the solution
        setSolution(currentSolution);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-8 px-4 sm:py-16 lg:py-24">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Click here to access the{" "}
                        <a
                            href="https://usermanual.wiki/Document/Practical20Guide20To20Quantitative20Finance20Interview.604244935.pdf"
                            target="_blank"
                            rel="noreferrer"
                            className="font-semibold text-red-600"
                        >
                            <span
                                className="absolute inset-0"
                                aria-hidden="true"
                            />
                            PDF Book <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
                <div className="text-center">
                    {showTimer ? (
                        // align the timer and the button in the same row

                        <div className="flex justify-between">
                            <div>
                                <p>{formatTime(seconds)}</p>
                            </div>
                            <ToolTip tooltip="Timer resets for each question.">
                                <button
                                    onClick={() => setShowTimer(false)}
                                    className="rounded-md bg-gray-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                >
                                    Hide Timer
                                </button>
                            </ToolTip>
                        </div>
                    ) : (
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowTimer(true)}
                                className="rounded-md bg-gray-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Show Timer
                            </button>
                        </div>
                    )}
                    {/* Question title */}
                    {questions[currentQuestionIndex].name ? (
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            {questions[currentQuestionIndex].name}
                        </h1>
                    ) : (
                        <h1 className="text-xl font-bold tracking-tight text-gray-900">
                            Question
                        </h1>
                    )}

                    {/* Question text */}
                    <p className="mt-2 text-lg leading-8 text-gray-600 text-justify">
                        {questions[currentQuestionIndex].question}
                    </p>

                    {/* Hint */}

                    {hint && (
                        <div className="mt-4">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-sm font-semibold leading-6 text-red-900"
                            >
                                {showHint
                                    ? "Hide Hint"
                                    : "The book provided a hint. Click here to see it."}
                            </button>
                            {showHint && (
                                <div>
                                    {/* Hint title */}
                                    <h2 className="text-lg font-bold text-gray-900">
                                        Hint:
                                    </h2>

                                    {/* Hint text */}
                                    <p className="mt-2 text-gray-600 text-justify">
                                        {hint}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    {/* Solution */}
                    {solution && (
                        <div className="mt-4">
                            {/* Solution title */}
                            <h2 className="text-lg font-bold text-gray-900">
                                Solution:
                            </h2>
                            {/* Solution text */}
                            <p className="mt-2 text-gray-600 text-justify">
                                {solution}
                            </p>
                        </div>
                    )}

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {/* Solution button */}
                        <button
                            onClick={showSolution}
                            href="#"
                            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Solution
                        </button>

                        {/* Next question button */}
                        <button
                            onClick={getNextQuestion}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            Next question <span aria-hidden="true">→</span>
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
