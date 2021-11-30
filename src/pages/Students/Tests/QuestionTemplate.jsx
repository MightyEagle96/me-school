import React from 'react';

export default function QuestionTemplate({
  question,
  index,
  answeredQuestion,
  setAnsweredQuestion,
}) {
  function GetChecked(e) {
    const checkIfUserHasAnswered = answeredQuestion.find((question) => {
      return question.questionId === index;
    });

    if (checkIfUserHasAnswered) {
      //to update the users answer
      const questionIndex = answeredQuestion.findIndex(
        (x) => x.questionId === index
      );

      let questionToUpdate = answeredQuestion[questionIndex];
      questionToUpdate.choice = e.target.value;
      questionToUpdate.score = question.correctAns === e.target.value ? 1 : 0;

      setAnsweredQuestion([
        ...answeredQuestion.slice(0, index),
        questionToUpdate,
        ...answeredQuestion.slice(questionIndex + 1),
      ]);
    } else {
      setAnsweredQuestion((answeredQuestion) => [
        ...answeredQuestion,
        {
          questionId: index,
          choice: e.target.value,
          score: question.correctAns === e.target.value ? 1 : 0,
        },
      ]);
    }
  }

  let options;
  if (question) {
    options = [
      question.optionA,
      question.optionB,
      question.optionC,
      question.optionD,
    ];
  }

  //to check if user has answered this question and display the checked option
  function HasAnswered(value) {
    const answered = answeredQuestion.find((q) => q.choice === value);
    if (answered) return true;
    else return false;
  }

  return (
    <div>
      {question ? (
        <div>
          <div>
            <div className="h2">Question {index + 1}</div>
            <hr />
            <div className="h3">{question.question}</div>

            <div className="mt-4">
              {options != null ? (
                <div>
                  {options.map((option, i) => {
                    return (
                      <div className="form-check mb-4 h5" key={i}>
                        <input
                          type="radio"
                          className="form-check-input"
                          id={option}
                          name={index}
                          onClick={GetChecked}
                          value={option}
                          checked={HasAnswered(option)}
                        />
                        <label htmlFor={option} className="form-check-label">
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
