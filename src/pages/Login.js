import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    const userData = {
      email,
      password
    };

    dispatch(login(userData));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
             <img src="/logo.png" alt="College Logo" />
          </div>
          <h1>MALKHANAGAR COLLEGE</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <Mail size={20} />
              Email
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
              <Lock size={20} />
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>

        {/* <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;


// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, reset } from '../redux/slices/authSlice';
// import toast from 'react-hot-toast';
// import { Mail, Lock } from 'lucide-react';
// import './Auth.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const { email, password } = formData;

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess || user) {
//       navigate('/dashboard');
//     }

//     dispatch(reset());
//   }, [user, isError, isSuccess, message, navigate, dispatch]);

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       toast.error('Please fill in all fields');
//       return;
//     }

//     const userData = {
//       email,
//       password
//     };

//     dispatch(login(userData));
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <div className="auth-icon">
//              <img src="/logo.png" alt="College Logo" />
//           </div>
//           <h1>MALKHANAGAR COLLEGE</h1>
//           <p>Login to your account</p>
//         </div>

//         <form onSubmit={onSubmit} className="auth-form">
//           <div className="form-group">
//             <label>
//               <Mail size={20} />
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label>
//               <Lock size={20} />
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           <button type="submit" className="btn-primary" disabled={isLoading}>
//             {isLoading ? 'Loading...' : 'Login'}
//           </button>
//         </form>

//         {/* <div className="auth-footer">
//           <p>
//             Don't have an account? <Link to="/register">Register here</Link>
//           </p>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Login;