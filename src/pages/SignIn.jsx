import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import './SignIn.css';

const LOGIN_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:PMtYj7w6/auth/login';

function SignIn() {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const { setAuth } = useAuth();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      
      const accessToken = response?.data?.accessToken;
      const userData = response?.data?.user; // Assuming your API returns user data

      setAuth({ 
        email, 
        accessToken,
        userId: userData.id,
        name: userData.name,
        // Add other user data you want to store
      });

      // Handle successful login
      console.log(response.data);
      setSuccess(true);
      setEmail('');
      setPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 401) {
        setErrMsg('Invalid email or password');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <section id="signin">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-line">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="input-line">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
            <button>Sign In</button>
          </form>
          <p id="need-account">
            Need an account?{' '}
            <Link to="/sign-up">Sign Up</Link>
          </p>
        </section>
      )}
    </>
  );
}

export default SignIn;