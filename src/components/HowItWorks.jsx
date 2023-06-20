import {
    AcademicCapIcon,
    CheckBadgeIcon,
    ClockIcon,
    PuzzlePieceIcon,
} from "@heroicons/react/24/outline";

const actions = [
    {
        title: "Question",
        icon: AcademicCapIcon,
        iconForeground: "text-indigo-700",
        iconBackground: "bg-indigo-50",
        text: "Click 'next question' to randomly generate a question from the source book.",
    },
    {
        title: "Solution",
        icon: CheckBadgeIcon,
        iconForeground: "text-purple-700",
        iconBackground: "bg-purple-50",
        text: "Once you think you have the answer, click 'solution' to reveal the answer",
    },
    {
        title: "Timer",
        icon: ClockIcon,
        iconForeground: "text-teal-700",
        iconBackground: "bg-teal-50",
        text: "Everytime you click 'next question', a timer will start/reset. You can click show/hide timer to show/hide the timer. Even when hidden, the timer will run.",
    },
    {
        title: "Hint",
        icon: PuzzlePieceIcon,
        iconForeground: "text-sky-700",
        iconBackground: "bg-sky-50",
        text: "Sometimes, the book provide hints. If your question comes with hints, you will be able to see it by clicking on the 'show hint' button.",
    },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function Example() {
    return (
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
            {actions.map((action, actionIdx) => (
                <div
                    key={action.title}
                    className={classNames(
                        actionIdx === 0
                            ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                            : "",
                        actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                        actionIdx === actions.length - 2
                            ? "sm:rounded-bl-lg"
                            : "",
                        actionIdx === actions.length - 1
                            ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                            : "",
                        "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
                    )}
                >
                    <div>
                        <span
                            className={classNames(
                                action.iconBackground,
                                action.iconForeground,
                                "inline-flex rounded-lg p-3 ring-4 ring-white"
                            )}
                        >
                            <action.icon
                                className="h-6 w-6"
                                aria-hidden="true"
                            />
                        </span>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            <span
                                className="absolute inset-0"
                                aria-hidden="true"
                            />
                            {action.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                            {action.text}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
