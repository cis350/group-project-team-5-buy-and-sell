import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SnackbarProvider } from 'notistack';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import TestPage from './pages/TestPage';
import './App.css';

function App() {
  return (
    <SnackbarProvider>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </AnimatePresence>
    </SnackbarProvider>
  );
}

export default App;
