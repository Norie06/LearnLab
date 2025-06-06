import React from 'react'
import {useRef, useState, useEffect} from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import './SignUp.css';
import '../App.css';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8,24}$/;
const REGISTER_URL = '/signup'


function SignUp() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => { 
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid input. Please check the fields above.');
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ name: user, password: pwd }),
            { 
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(response.data);
        console.log(response.accessToken);
        console.log(JSON.stringify(response));
        setSuccess(true);
        //clear input fields
        
    } catch (error) {
        if (!error?.response) {
            setErrMsg('No Server Response.');
            return;
        } else if (error.response?.status === 409) {
            setErrMsg('Username already exists. Please choose another.');
            return;
        } else {
            setErrMsg('Registration failed.');
        }
        errRef.current.focus();
    }


        /* if (!validName || !validPwd || !validMatch) {
            setErrMsg('Invalid input. Please check the fields above.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, pwd }),
            });
            if (response.ok) {
                setSuccess(true);
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            setErrMsg(error.message);
        } */
    };

    return (
        <>
        {success ? (
                <section>
                    <h1>Sign In</h1>
                    <p>
                        <a href="/signin">Sign In</a> {/* Add link to sign in page */}
                    </p>
                </section>
            ) : (
        <section id='signup' /* className="page" */  >
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>
                {errMsg}
            </p>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-line'>
                    <label htmlFor="username">
                        <span className={validName ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validName || !user ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        Username:
                    </label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={!validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                </div>
                <div className='input-line'>
                    <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{paddingRight: "1%"}} />
                        4 to 24 characters. <br />
                        Must start with a letter. <br />
                        Letters, numbers, hyphens, and underscores are allowed.
                    </p>
                </div>
                <div className='input-line'>
                    <label htmlFor="password">
                        <span className={validPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        Password:
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        autoComplete='off'
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={!validPwd ? "false" : "true"}
                        aria-describedby='pwdnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                </div>
                <div className='input-line'>
                    <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{paddingRight: "1%"}} />
                        8 to 24 characters. <br />
                        Must include uppercase and lowercase letters, a number, and a special characters. <br />
                        Allowed special characters: 
                        <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dollar sign'>$</span>
                        <span aria-label='percent'>%</span>
                    </p>
                </div>
                <div className='input-line'>
                    <label htmlFor="confirm_pwd">
                        <span className={validMatch && matchPwd ? "valid" : "hide"}>
                            <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                            <FontAwesomeIcon icon={faTimes} />
                        </span>
                        Confirm Password:
                    </label>
                    <input 
                        type="password" 
                        id="confirm_pwd"
                        autoComplete='off'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        aria-invalid={!validMatch ? "false" : "true"}
                        aria-describedby='confirmnote'
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    
                </div>
                <div className='input-line'>
                    <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{paddingRight: "1%"}} />
                        Must match the password above.
                    </p>
                </div>
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>
            </form>
            <p id='have-account'>
                Already have an account? <a href="/log-in">Log In</a> {/* Add link to sign in page */}
            </p>
        </section>
        )}
        </>
    );
}

export default SignUp;