import React, { useState } from 'react';

const sampleExam = [
  { id: 1, type: 'MCQ', question: 'What is 2+2?', options: ['2', '3', '4', '5'], answer: '4' },
  { id: 2, type: 'Short Answer', question: 'Explain gravity.' },
];

const ExamPage = () => {
  const [answers, setAnswers] = useState({});

  const handleMCQChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleShortAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  return (
    <div>
      <h2>Exam</h2>
      {sampleExam.map((q) => (
        <div key={q.id}>
          <h4>{q.question}</h4>
          {q.type === 'MCQ' ? (
            <div>
              {q.options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={option}
                    onChange={() => handleMCQChange(q.id, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <textarea onChange={(e) => handleShortAnswerChange(q.id, e.target.value)} />
          )}
        </div>
      ))}
      <button>Submit Exam</button>
    </div>
  );
};

export default ExamPage;
