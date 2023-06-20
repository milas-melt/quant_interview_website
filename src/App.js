import React, { useState, useEffect } from "react";
import questions from "./questions.json";
import ToolTip from "./ToolTip";
import Footer from "./Footer";
import QuestionBox from "./components/QuestionBox";
import HintModal from "./components/HintModal";

export default function App() {
    const START_QUESTION_INDEX = 9;

    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(START_QUESTION_INDEX);
    // const [chapter, setChapter] = useState("brainteasers");
    // const [solution, setSolution] = useState(
    //     questions.brainteasers[START_QUESTION_INDEX].solution
    // );
    const [hint, setHint] = useState(
        questions.brainteasers[START_QUESTION_INDEX].hint
    );
    const [showHint, setShowHint] = useState(false);
    const [showSolution, setShowSolution] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    // console.log(questions.brainteasers[currentQuestionIndex].question);
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Show questions in order
    // const getNextQuestion = () => {
    //     if (currentQuestionIndex < questions.brainteasers.length - 1) {
    //         setCurrentQuestionIndex(currentQuestionIndex + 1);
    //         setSolution(""); // Clear the solution when moving to the next question
    //         setHint(questions.brainteasers[currentQuestionIndex + 1].hint);
    //         setShowHint(false); // Hide the hint when moving to the next question
    //         setSeconds(0); // Reset the timer when moving to the next question
    //     } else {
    //         // If you want to loop back to the first question when reaching the end
    //         setCurrentQuestionIndex(0);

    //         // If you want to disable the button when reaching the end
    //         // setCurrentQuestionIndex(questions.brainteasers.length - 1);
    //     }
    // };
    // Show questions in random order
    const getNextQuestion = () => {
        const randomIndex = Math.floor(
            Math.random() * questions.brainteasers.length
        );
        setCurrentQuestionIndex(randomIndex);
        // setSolution(questions.brainteasers[randomIndex].solution); // Clear the solution when moving to the next question
        setHint(questions.brainteasers[randomIndex].hint);
        setShowHint(false); // Hide the hint when moving to the next question
        setSeconds(0); // Reset the timer when moving to the next question
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    return (
        <div className="bg-white flex flex-col max-h-screen justify-between">
            <div className="mx-auto  w-2/3 max-w-2xl py-8  sm:py-16 lg:py-16">
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

                        <div className="flex justify-between mb-4">
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
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowTimer(true)}
                                className="rounded-md bg-gray-600 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                            >
                                Show Timer
                            </button>
                        </div>
                    )}
                    {/* Question title */}
                    {/* <div className="shadow sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            
                        </div>
                    </div> */}

                    <QuestionBox
                        question={
                            questions.brainteasers[currentQuestionIndex]
                                .question
                        }
                        question_name={
                            questions.brainteasers[currentQuestionIndex].name
                        }
                    />

                    {/* Hint */}

                    <button
                        onClick={() => setShowHint(!showHint)}
                        className={`${
                            hint ? "visible" : "invisible"
                        } text-sm font-semibold leading-6 text-red-900`}
                    >
                        The book provided a hint. Click here to see it.
                    </button>

                    <HintModal
                        open={showHint}
                        setOpen={setShowHint}
                        hint={hint}
                    />

                    {/* Solution */}

                    <div
                        className={`${
                            showSolution ? "visible" : "invisible"
                        } mt-4`}
                    >
                        <QuestionBox
                            question={
                                questions.brainteasers[currentQuestionIndex]
                                    .solution
                            }
                            question_name="Solution"
                        />
                    </div>

                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {/* Solution button */}
                        <button
                            onClick={() => setShowSolution(!showSolution)} // {() => setShowHint(!showHint)}
                            className="rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            {showSolution ? "Hide" : "Show"} Solution
                        </button>

                        {/* Next question button */}
                        <button
                            onClick={getNextQuestion}
                            className="text-sm font-semibold leading-6 text-gray-900 align-bottom"
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
