import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'student'
  });

  const { name, email, password, confirmPassword, phone, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // role field টা remove করুন এবং hardcode করুন
const onSubmit = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !confirmPassword) {
    toast.error('Please fill in all required fields');
    return;
  }

  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return;
  }

  const userData = {
    name,
    email,
    password,
    phone,
    role: 'student' // Always student
  };

  dispatch(register(userData));
};

// এবং form থেকে role select field টা remove করুন

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <UserPlus size={40} />
          </div>
          <h1>Create Account</h1>
          <p>Register for School Management System</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <User size={20} />
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={20} />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Phone size={20} />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label>
              <User size={20} />
              Role
            </label>
            <select name="role" value={role} onChange={onChange}>
              <option value="student">Student</option>
              {/* <option value="teacher">Teacher</option>
              <option value="admin">Admin</option> */}
            </select>
          </div>

          <div className="form-group">
            <label>
              <Lock size={20} />
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter password (min 6 characters)"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={20} />
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={onChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;