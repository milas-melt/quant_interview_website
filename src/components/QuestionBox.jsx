export default function QuestionBox({ question_name, question }) {
    return (
        <div className="bg-white shadow-xl sm:rounded-lg lg:h-40 sm:h-100 overflow-y-auto scrollbar-container">
            <div className="px-4 py-5 sm:p-6">
                {question_name ? (
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        {question_name}
                    </h3>
                ) : (
                    <h3 className="text-base font-semibold leading-6 text-gray-900">
                        Question
                    </h3>
                )}

                <div className="mt-2  text-sm text-gray-800 text-justify">
                    {question ? (
                        <p>{question}</p>
                    ) : (
                        <p>
                            Please check the solution on the book. It contains
                            too many illustrations / equations so it has not
                            been implemented here yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
