import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Alice Johnson', teacherId: 'T001' },
    { id: 2, name: 'Bob Williams', teacherId: 'T002' },
    { id: 3, name: 'Charlie Brown', teacherId: 'T003' }
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'David Miller', studentId: 'S001' },
    { id: 2, name: 'Eva Green', studentId: 'S002' },
    { id: 3, name: 'Frank Harris', studentId: 'S003' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', idNumber: '' });
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');

  // Filter logic for search
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Open modal for adding or editing user
  const openModal = (type, user = { id: null, name: '', idNumber: '' }) => {
    setModalType(type);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser({ id: null, name: '', idNumber: '' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...currentUser, id: currentUser.id || Date.now() };

    if (modalType === 'teacher') {
      if (currentUser.id) {
        setTeachers(teachers.map((t) => (t.id === currentUser.id ? { ...t, teacherId: currentUser.idNumber, name: currentUser.name } : t)));
      } else {
        setTeachers([...teachers, { ...newUser, teacherId: currentUser.idNumber }]);
      }
    } else {
      if (currentUser.id) {
        setStudents(students.map((s) => (s.id === currentUser.id ? { ...s, studentId: currentUser.idNumber, name: currentUser.name } : s)));
      } else {
        setStudents([...students, { ...newUser, studentId: currentUser.idNumber }]);
      }
    }
    closeModal();
  };

  const deleteUser = (id, type) => {
    if (type === 'teacher') {
      setTeachers(teachers.filter((t) => t.id !== id));
    } else {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  // Logout function to handle redirection
  const handleLogout = () => {
    // You can clear any authentication state here if needed
    navigate('/login'); // Redirect to LoginPage
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button className="blue-btn" onClick={() => openModal('teacher')}>Add Teacher</button>
        <button className="blue-btn" onClick={() => openModal('student')}>Add Student</button>
        <button className="red-btn" onClick={handleLogout}>Logout</button> {/* Updated logout button */}
      </div>

      {/* Teacher Section */}
      <UserSection 
        title="Teachers"
        searchValue={teacherSearch}
        onSearchChange={setTeacherSearch}
        users={filteredTeachers}
        userType="teacher"
        openModal={openModal}
        deleteUser={deleteUser}
      />

      {/* Student Section */}
      <UserSection 
        title="Students"
        searchValue={studentSearch}
        onSearchChange={setStudentSearch}
        users={filteredStudents}
        userType="student"
        openModal={openModal}
        deleteUser={deleteUser}
      />

      {isModalOpen && (
        <Modal 
          modalType={modalType}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

// UserSection component for DRY principle
const UserSection = ({ title, searchValue, onSearchChange, users, userType, openModal, deleteUser }) => (
  <div className="user-frame">
    <h2>{title}</h2>
    <input
      type="text"
      className="search-input"
      placeholder={`Search ${title}...`}
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
    />
    <div className="scrollable-list">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>{userType === 'teacher' ? 'ID' : 'Enrollment No.'}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{userType === 'teacher' ? user.teacherId : user.studentId}</td>
              <td>
                <button className="edit-btn" onClick={() => openModal(userType, user)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteUser(user.id, userType)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Modal component for DRY principle
const Modal = ({ modalType, currentUser, setCurrentUser, onClose, onSubmit }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h3>{modalType === 'teacher' ? 'Add/Edit Teacher' : 'Add/Edit Student'}</h3>
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input
          type="text"
          value={currentUser.name}
          onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
          required
        />
        <label>{modalType === 'teacher' ? 'Teacher ID' : 'Enrollment No.'}</label>
        <input
          type="text"
          value={currentUser.idNumber}
          onChange={(e) => setCurrentUser({ ...currentUser, idNumber: e.target.value })}
          required
        />
        <div className="modal-buttons">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  </div>
);

export default AdminDashboard;
