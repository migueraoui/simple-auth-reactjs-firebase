import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { translation } from '../languages/Translation';

// Import your logo image
import logo from '../assets/logo.png';

const RestePassowrd = ({ lang }) => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetSuccessful, setResetSuccessful] = useState(false); 
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      if(lang === "en"){
          setMessage("Check your email inbox for further instructions.");
        } else if(lang === "fr"){
          setMessage("Vérifiez votre boîte de réception e-mail pour plus d'instructions");
        }
        setResetSuccessful(true); // Set resetSuccessful to true on successful password reset
        emailRef.current.value = "";
    } catch {
      if(lang === "en"){
          setError("Failed to reset password.");
        } else if(lang === "fr"){
          setError("Échec de la réinitialisation du mot de passe.");
        }
    }

    setLoading(false);
  }

  return (
    <>
      <div className="form-container">
      <Card className="login-card">
        <Card.Body>
          <img src={logo} alt="Logo" className="logo" />
          <h5 className='text-center mb-4'>{translation('resetPassword', lang)}</h5>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            {!resetSuccessful && ( // Conditional rendering based on resetSuccessful state
              <Form.Group>
                <Form.Label htmlFor='email' className="form-label">{translation('emailLabel', lang)}</Form.Label>
                <Form.Control type="email" id="email" ref={emailRef} required placeholder={translation('emailPlaceholder', lang)} className="form-input" />
              </Form.Group>
            )}
            {resetSuccessful ? ( // Conditional rendering based on resetSuccessful state
              <Button variant="primary" type='Login' className='w-100 mt-3' disabled={loading} hidden={loading}>
                 {translation('loginButton', lang)} 
              </Button>
            ) : (
              <Button variant="primary" type='Next' className='w-100 mt-3' disabled={loading} hidden={loading} onClick={handleSubmit}>
                 {translation('nextButton', lang)} 
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};

export default RestePassowrd;
