import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { About } from './components/About';
import { Agenda } from './components/Agenda';
import { Contact } from './components/Contact';
import { EditContact } from './components/EditContact';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Menu } from './components/Menu';
import { NotFound } from './components/NotFound';
import { Signup } from './components/Signup';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Menu isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/agenda" element={<Agenda />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/edit/:id" element={<EditContact />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login onLogin={handleLogin} />}></Route>
          <Route path="/logout" element={<Logout onLogout={handleLogout} />}></Route>
          <Route path="/*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </React.StrictMode>
  );
}

function isUserLoggedIn() {
  const token = localStorage.getItem('token');
  return !!token;
}

ReactDOM.render(<App />, document.getElementById('root'));
