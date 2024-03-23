import React, { useRef, useState } from 'react';
import { Button,Card, Form, Alert } from "react-bootstrap";
import { translation } from '../languages/Translation';
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';


const Signup = ({ lang }) => {

  const {signup} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
      navigate("/");

    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  };

  return (
    <>
       <div className="form-container">
      <Card className="login-card">
        <Card.Body>
          <img src={logo} alt="Logo" className="logo" />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor='email' className="form-label">{translation('emailLabel', lang)}</Form.Label>
              <Form.Control type="email" id="email" ref={emailRef}  required placeholder={translation('emailPlaceholder', lang)} className="form-input" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='password' className="form-label">{translation('passwordLabel', lang)}</Form.Label>
              <Form.Control type="password" id="password" ref={passwordRef}  required placeholder='********' className="form-input" />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='password' className="form-label">Confirm Password</Form.Label>
              <Form.Control type="password" id="password" ref={confirmPasswordRef}  required placeholder='********' className="form-input" />
            </Form.Group>
            <Button  type='submit' className='w-100 mt-3' disabled={loading}>
              Signup
            </Button>
          </Form>
        </Card.Body>
        <div className='w-100 text-center mt-3'>
            <Link to="/login" className="forgot-password-link">Log In</Link>
          </div>
      </Card>
    </div>
    </>
  )
}

export default Signup