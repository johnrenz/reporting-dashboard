import {useRef, useState, useEffect } from "react";
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const styles = {
        loginApp: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '1rem 0.5rem',
            backgroundColor: 'dodgerblue'
        },
        section: {
            width: '100%',
            maxWidth: '420px',
            minHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            padding: '1rem',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            fontSize: '22px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            flexGrow: '1',
            paddingBottom: '1rem'
        },
        labelButton: {
            marginTop: '1rem'
        },
        button: {
            marginTop: '1rem',
            padding: '1rem',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '22px',
            borderRadius: '0.5rem'
        },
        inputText: {
            fontFamily: 'Nunito, sans-serif',
            fontSize: '22px',
            padding: '0.25rem',
            borderRadius: '0.5rem'
        },
        errmsg: {
            backgroundColor: 'lightpink',
            color: 'firebrick',
            fontWeight: 'bold',
            padding: '0.5rem',
            marginBottom: '0.5rem'
        },
        offscreen: {
            position: 'absolute',
            left: '-9999px'
        },
        anchor: {
            color: '#fff'
        }
    };
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type' : 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles.map(role => { return role.role.type });
            setAuth( {user, pwd, roles, accessToken });
            setUser('');
            setPwd('');        
            navigate(from, { replace: true });
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No server response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(`Login failed - ${err}`);
            }
            errRef.current.focus();
        }
    }

    return (
       <div className="loginApp" style={styles.loginApp}>
            <section style={styles.section}>
                <p ref={errRef} style={errMsg ? styles.errmsg : styles.offscreen} aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                <label htmlFor="username" style={styles.labelButton} >Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        style={styles.inputText}
                    />
                    <label htmlFor="password" style={styles.labelButton}>Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        style={styles.inputText}
                    />
                    <button style={styles.button}>Sign In</button>
                </form>
                
            </section>
        </div>
    )
}

export default Login
