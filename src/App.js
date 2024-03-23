// App.js
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import RestePassword from './Components/RestePassowrd';
import UpdateProfile from './Components/UpdateProfile';
import Dashbord from './Components/Dashboard';
import './Components/styles.css'; // Import global stylesheet
import { translation } from './languages/Translation';
import AuthProvider from "./context/AuthContext";
import AuthRequire from "./context/AuthRequire";
const App = () => {
  const [lang, setLang] = useState('fr'); // Initialize language state

  const handleLangChange = (e) => {
    setLang(e.target.value);
  };

  return (
    <Container  
      className="d-flex align-items-center justify-content-center container-with-bg" 
      style={{ minHeight: "100vh", position: 'relative', padding: '0 10px' }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
          <Routes>
            {/* <Route path="/signup" element={<Signup lang={lang}/>}/>  */}
            <Route path="/login" element={<Login lang={lang}/>}/> 
            <Route path="/reste-password" element={<RestePassword lang={lang}/>}/> 
            <Route path="/update-profile" element={<UpdateProfile lang={lang}/>}/> 
            <Route 
              path="/"  
              element={
              <AuthRequire>
                <Dashbord lang={lang}/>
              </AuthRequire>
              }/>
          </Routes>
          </AuthProvider>
        </Router>
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <select
            value={lang}
            onChange={handleLangChange}
            style={{
              backgroundColor: '#f2f2f2',
              border: '1px solid #ccc',
              padding: '8px 12px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
              outline: 'none', // Remove default focus outline
            }}
          >
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
        </div>
      </div>
    </Container>
  );
};

export default App;
