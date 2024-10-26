import React, { useState, useEffect, useCallback } from "react";
import "./StudentDashboard.css";

const questionsData = {
  Maths: [
    {
      id: 1,
      type: "MCQ",
      question: "What is 2 + 2?",
      options: { A: "3", B: "4", C: "5", D: "6" },
      correctAnswer: "B",
    },
    {
      id: 2,
      type: "MCQ",
      question: "What is 5 - 3?",
      options: { A: "2", B: "3", C: "1", D: "4" },
      correctAnswer: "A",
    },
    {
      id: 3,
      type: "MCQ",
      question: "What is 7 x 3?",
      options: { A: "21", B: "24", C: "18", D: "15" },
      correctAnswer: "A",
    },
    {
      id: 4,
      type: "MCQ",
      question: "What is 12 ÷ 4?",
      options: { A: "2", B: "4", C: "3", D: "5" },
      correctAnswer: "C",
    },
    {
      id: 5,
      type: "Short Answer",
      question: "What is the square root of 25?",
      correctAnswer: "5",
    },
    {
      id: 6,
      type: "Short Answer",
      question: "What is the value of pi (π) to two decimal places?",
      correctAnswer: "3.14",
    },
    {
      id: 7,
      type: "MCQ",
      question: "What is the next prime number after 7?",
      options: { A: "8", B: "9", C: "10", D: "11" },
      correctAnswer: "D",
    },
    {
      id: 8,
      type: "MCQ",
      question: "What is 15% of 200?",
      options: { A: "25", B: "30", C: "35", D: "40" },
      correctAnswer: "B",
    },
    {
      id: 9,
      type: "Short Answer",
      question: "What is 100 minus 37?",
      correctAnswer: "63",
    },
    {
      id: 10,
      type: "MCQ",
      question: "What is 3²?",
      options: { A: "6", B: "9", C: "12", D: "15" },
      correctAnswer: "B",
    },
  ],
  Science: [
    {
      id: 1,
      type: "MCQ",
      question: "What is H2O commonly known as?",
      options: { A: "Oxygen", B: "Hydrogen Peroxide", C: "Water", D: "Salt" },
      correctAnswer: "C",
    },
    {
      id: 2,
      type: "MCQ",
      question: "What planet is known as the Red Planet?",
      options: { A: "Earth", B: "Mars", C: "Venus", D: "Jupiter" },
      correctAnswer: "B",
    },
    {
      id: 3,
      type: "Short Answer",
      question: "What gas do plants absorb?",
      correctAnswer: "Carbon Dioxide",
    },
    {
      id: 4,
      type: "MCQ",
      question: "What is the chemical symbol for gold?",
      options: { A: "Au", B: "Ag", C: "Fe", D: "Pb" },
      correctAnswer: "A",
    },
    {
      id: 5,
      type: "MCQ",
      question: "What part of the cell contains the genetic material?",
      options: {
        A: "Cytoplasm",
        B: "Nucleus",
        C: "Cell Membrane",
        D: "Mitochondria",
      },
      correctAnswer: "B",
    },
    {
      id: 6,
      type: "Short Answer",
      question: "What is the process by which plants make food?",
      correctAnswer: "Photosynthesis",
    },
    {
      id: 7,
      type: "MCQ",
      question: "Which gas is essential for respiration?",
      options: {
        A: "Nitrogen",
        B: "Oxygen",
        C: "Carbon Dioxide",
        D: "Hydrogen",
      },
      correctAnswer: "B",
    },
    {
      id: 8,
      type: "MCQ",
      question: "What is the powerhouse of the cell?",
      options: {
        A: "Nucleus",
        B: "Ribosome",
        C: "Mitochondria",
        D: "Golgi Apparatus",
      },
      correctAnswer: "C",
    },
    {
      id: 9,
      type: "Short Answer",
      question: "What is the boiling point of water in degrees Celsius?",
      correctAnswer: "100",
    },
    {
      id: 10,
      type: "MCQ",
      question: "What is the main gas found in the air we breathe?",
      options: {
        A: "Oxygen",
        B: "Carbon Dioxide",
        C: "Nitrogen",
        D: "Hydrogen",
      },
      correctAnswer: "C",
    },
  ],
  English: [
    {
      id: 1,
      type: "MCQ",
      question: 'Select the correct past tense of "go".',
      options: { A: "Goed", B: "Went", C: "Go", D: "Gone" },
      correctAnswer: "B",
    },
    {
      id: 2,
      type: "MCQ",
      question: 'Identify the verb in "She runs fast."',
      options: { A: "She", B: "Runs", C: "Fast", D: "None" },
      correctAnswer: "B",
    },
    {
      id: 3,
      type: "MCQ",
      question: "Which word is a noun?",
      options: { A: "Quickly", B: "House", C: "Run", D: "Bright" },
      correctAnswer: "B",
    },
    {
      id: 4,
      type: "MCQ",
      question: 'Which of these is a synonym for "happy"?',
      options: { A: "Sad", B: "Angry", C: "Joyful", D: "Tired" },
      correctAnswer: "C",
    },
    {
      id: 5,
      type: "Short Answer",
      question: 'What is the plural of "child"?',
      correctAnswer: "Children",
    },
    {
      id: 6,
      type: "Short Answer",
      question: 'Provide the antonym of "hot".',
      correctAnswer: "Cold",
    },
    {
      id: 7,
      type: "MCQ",
      question: 'Which word is an adjective in "The tall tree"?',
      options: { A: "The", B: "Tall", C: "Tree", D: "None" },
      correctAnswer: "B",
    },
    {
      id: 8,
      type: "MCQ",
      question: 'Choose the correct article for "___ apple".',
      options: { A: "A", B: "An", C: "The", D: "No article" },
      correctAnswer: "B",
    },
    {
      id: 9,
      type: "Short Answer",
      question: 'What is the superlative form of "good"?',
      correctAnswer: "Best",
    },
    {
      id: 10,
      type: "MCQ",
      question: 'Identify the pronoun in "They are playing".',
      options: { A: "They", B: "Are", C: "Playing", D: "None" },
      correctAnswer: "A",
    },
  ],
};
const StudentDashboard = () => {
  const [isSubjectPopupOpen, setIsSubjectPopupOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [examQuestions, setExamQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [marks, setMarks] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [showTerms, setShowTerms] = useState(false); // Changed to false initially

  const openSubjectPopup = () => {
    setIsSubjectPopupOpen(true);
  };

  const closeSubjectPopup = () => {
    setIsSubjectPopupOpen(false);
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
    setExamQuestions(questionsData[subject]);
    closeSubjectPopup();
    setAnswers({});
    setShowResults(false);
    setTimeLeft(600); // Reset timer
    setShowTerms(false); // Hide terms when subject is selected
  };

  const handleAnswerChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = useCallback(() => {
    let totalMarks = 0;
    let incorrectCount = 0;

    examQuestions.forEach((question) => {
      if (
        question.type === "MCQ" &&
        answers[question.id] === question.correctAnswer
      ) {
        totalMarks++;
      } else if (
        question.type === "Short Answer" &&
        answers[question.id]?.trim().toLowerCase() ===
          question.correctAnswer.trim().toLowerCase()
      ) {
        totalMarks++;
      } else {
        incorrectCount++;
      }
    });

    setMarks(totalMarks);
    setWrongCount(incorrectCount);
    setShowResults(true);
  }, [examQuestions, answers]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showResults, handleSubmit]);

  useEffect(() => {
    const warnOnLeave = (event) => {
      event.preventDefault();
      event.returnValue = "Warning: Leaving this tab may result in a ban.";
    };

    window.addEventListener("beforeunload", warnOnLeave);

    return () => window.removeEventListener("beforeunload", warnOnLeave);
  }, []);

  return (
    <div className="student-container">
      <h2>Student Dashboard</h2>
      <button
        onClick={() => setShowTerms(true)} // Show terms when the button is clicked
        className="take-exam-btn"
      >
        Give Exam
      </button>

      {/* Show terms only when the "Give Exam" button is clicked and no subject is selected */}
      {showTerms && !selectedSubject && (
        <div className="terms-conditions">
          <h3>Terms and Conditions for the Competitive Exam:</h3>
          <ul>
            <li>No switching tabs or opening new windows during the exam.</li>
            <li>The exam is strictly timed; no extensions will be given.</li>
            <li>Mobile phones and other electronic devices are not allowed.</li>
            <li>Do not communicate with others during the exam.</li>
            <li>Use of any unauthorized materials is prohibited.</li>
            <li>All answers must be your own work.</li>
            <li>Leaving the tab will result in a warning.</li>
            <li>
              Attempting to navigate away from the exam screen is forbidden.
            </li>
            <li>All actions are monitored for integrity assurance.</li>
            <li>The exam will automatically end when time expires.</li>
            <li>Late submissions will not be accepted.</li>
            <li>Breaking the rules may lead to disqualification.</li>
            <li>Only one attempt per subject is allowed.</li>
            <li>The use of notes or other materials is prohibited.</li>
            <li>
              Ensure a stable internet connection to avoid disconnections.
            </li>
          </ul>
          {/* Apply the same button class */}
          <button onClick={openSubjectPopup} className="take-exam-btn">
            Proceed to Subject Selection
          </button>
        </div>
      )}

      {isSubjectPopupOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Select Subject</h3>
            <button onClick={() => handleSubjectSelection("Maths")}>
              Maths
            </button>
            <button onClick={() => handleSubjectSelection("Science")}>
              Science
            </button>
            <button onClick={() => handleSubjectSelection("English")}>
              English
            </button>
            <button onClick={closeSubjectPopup}>Cancel</button>
          </div>
        </div>
      )}

      {examQuestions.length > 0 && !showResults && (
        <div className="exam-container">
          <h3>Exam: {selectedSubject}</h3>
          <div className="timer">
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
          {examQuestions.map((question) => (
            <div key={question.id} className="question-card">
              <p>{question.question}</p>
              {question.type === "MCQ" && (
                <div className="options">
                  {Object.entries(question.options).map(([key, value]) => (
                    <label key={key}>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={key}
                        onChange={() => handleAnswerChange(question.id, key)}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              )}
              {question.type === "Short Answer" && (
                <input
                  type="text"
                  placeholder="Your answer"
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                />
              )}
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-btn">
            Submit Exam
          </button>
        </div>
      )}

      {showResults && (
        <div className="results-container">
          <h3>Results</h3>
          <p>Total Marks: {marks}</p>
          <p>Wrong Answers: {wrongCount}</p>
          <p>
            {timeLeft === 0 ? "Time's up!" : "Exam submitted successfully!"}
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
