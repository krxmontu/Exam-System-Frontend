import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/UserContext';
import './LoginPage.css';

// Validation schema
const loginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Select a role'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = (values) => {
    setUser(values); // Set the user in the context
    navigate(`/${values.role}`);
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <Formik
          initialValues={{ username: '', password: '', role: '' }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label>Username</label>
                <Field name="username" type="text" className="form-input" />
                <ErrorMessage name="username" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <Field name="password" type="password" className="form-input" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <label>Role</label>
                <Field name="role" as="select" className="form-input">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </Field>
                <ErrorMessage name="role" component="div" className="error" />
              </div>
              <button type="submit" className="submit-btn">Login</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
