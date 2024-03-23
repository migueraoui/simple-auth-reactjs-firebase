import React, { useRef, useState } from 'react';
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { translation } from '../languages/Translation';
import { useAuth } from '../context/AuthContext';
// Import your logo image
import logo from '../assets/logo.png';

const Login = ({ lang }) => {

  const {login} = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      emailRef.current.value = "";
      passwordRef.current.value = "";
      navigate(redirectPath, {replace: true}); 

    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        if(lang === "en"){
          setError("Invalid credentials, please check.");
        } else if(lang === "fr"){
          setError("Les informations d'identification invalides, vérifiez s'il vous plaît.");
        }
      }
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
         <Button variant="primary" type='submit' className='w-100 mt-3' disabled={loading} hidden={loading}>
           {translation('loginButton', lang)}
         </Button>
       </Form>
       <div className='w-100 text-center mt-3'>
         <Link hidden={loading} to="/reste-password" className="forgot-password-link">{translation('forgotPasswordLink', lang)}</Link>
       </div>
       
     </Card.Body>
     {/* <div className='w-100 text-center mt-3'>
          Need an account?  
         <Link to="/signup" > Signup</Link>
       </div> */}
   </Card>
 </div>

 </>
  );
};

export default Login;