import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../context/UserContext'; // Import UserContext
import './TeacherDashboard.css';

const TeacherDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { setUser } = useContext(UserContext); // Get setUser from context

  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    type: 'MCQ',
    text: '',
    marks: '',
    options: { A: '', B: '', C: '', D: '' },
    correctAnswer: '',
  });

  const openModal = (type, question = {
    id: null,
    type: 'MCQ',
    text: '',
    marks: '',
    options: { A: '', B: '', C: '', D: '' },
    correctAnswer: '',
  }) => {
    setModalType(type);
    setCurrentQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuestion({
      id: null,
      type: 'MCQ',
      text: '',
      marks: '',
      options: { A: '', B: '', C: '', D: '' },
      correctAnswer: '',
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      const newQuestion = { ...currentQuestion, id: Date.now() };
      setQuestions([...questions, newQuestion]);
    } else {
      setQuestions(questions.map(q => (q.id === currentQuestion.id ? currentQuestion : q)));
    }
    closeModal();
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleLogout = () => {
    setUser(null); // Clear user from context
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="teacher-container">
      <h2>Welcome to Exam Control Panel - Teacher</h2>
      <div className="controls">
        <button className="control-btn add-btn" onClick={() => openModal('add', { type: 'MCQ' })}>Add MCQs</button>
        <button className="control-btn add-one-word-btn" onClick={() => openModal('add', { type: 'One Word' })}>Add One Word Question</button>
        <button className="control-btn logout-btn" onClick={handleLogout}>Logout</button> {/* Updated logout button */}
      </div>

      <h3>Question List</h3>
      <div className="question-list">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={question.id}>
                <td>{index + 1}</td>
                <td>{question.text}</td>
                <td>
                  <button onClick={() => openModal('edit', question)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteQuestion(question.id)} className="remove-btn">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{modalType === 'add' ? `Add ${currentQuestion.type}` : 'Edit Question'}</h3>
            <form onSubmit={handleFormSubmit}>
              <label>Question Text</label>
              <input
                type="text"
                value={currentQuestion.text}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, text: e.target.value })}
                required
              />

              <label>Marks</label>
              <input
                type="number"
                value={currentQuestion.marks}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, marks: e.target.value })}
                required
              />

              {currentQuestion.type === 'MCQ' && (
                <>
                  <label>Option A</label>
                  <input
                    type="text"
                    value={currentQuestion.options?.A || ''}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: { ...currentQuestion.options, A: e.target.value } })}
                    required
                  />

                  <label>Option B</label>
                  <input
                    type="text"
                    value={currentQuestion.options?.B || ''}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: { ...currentQuestion.options, B: e.target.value } })}
                    required
                  />

                  <label>Option C</label>
                  <input
                    type="text"
                    value={currentQuestion.options?.C || ''}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: { ...currentQuestion.options, C: e.target.value } })}
                    required
                  />

                  <label>Option D</label>
                  <input
                    type="text"
                    value={currentQuestion.options?.D || ''}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, options: { ...currentQuestion.options, D: e.target.value } })}
                    required
                  />

                  <label>Correct Answer</label>
                  <select
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </>
              )}

              {currentQuestion.type === 'One Word' && (
                <>
                  <label>Answer Key</label>
                  <input
                    type="text"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    required
                  />
                </>
              )}

              <div className="modal-buttons">
                <button type="submit" className="save-btn">{modalType === 'add' ? 'Add Question' : 'Save Changes'}</button>
                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
