// App.js
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import { useState } from 'react';
import { useEffect } from 'react';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoForm from './Components/TodoForm';
import TodoEditForm from './Components/TodoEditForm';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import LoginRoute from './Components/LoginRoute';
function App() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    localStorage.setItem('theme','light');
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Router>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<PrivateRoute/>}>
        <Route exact path="/" element={<Home theme={theme} />} />
        </Route>
        <Route path="/" element={<LoginRoute/>}>
        <Route exact path="/login" element={<Login theme={theme} />} />
        </Route>
        <Route path="/" element={<LoginRoute/>}>
        <Route exact path="/forgotpassword" element={<ForgotPassword theme={theme} />} />
        </Route>
        <Route path="/" element={<LoginRoute/>}>
        <Route exact path="/signup" element={<SignUp theme={theme} />} />
        </Route>
        <Route path="/" element={<LoginRoute/>}>
        <Route path="/resetpassword/:resetToken" element={<ResetPassword/>} />
        </Route>
        <Route path="/" element={<PrivateRoute/>}>
        <Route exact path="/addtodo" element={<TodoForm theme={theme} />} />
        </Route>
        <Route path="/" element={<PrivateRoute/>}>
        <Route exact path="/edittodo" element={<TodoEditForm theme={theme} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
