import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const [count, setCount] = useState(0)

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsRegistered(true);
    // Implement the registration logic - backend server call
  };

  return (
    <div className="App">
      <nav>
        {/* Navigation bar content */}
      </nav>

      <main className="main-content">
        <h1 className='text-blue-900 text-5xl'>Welcome to Penn Market!</h1>

        {isRegistered && (
          <div className="confirmation-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            You've successfully registered with your school email!
          </div>
        )}

        <form className="object-center" onSubmit={handleSubmit}>
          <div className="flex-col justify-start items-start">
          <label htmlFor="username" className="form-label">
            Username (Penn Email) 
          </label>
          <input
            type="email"
            id="username"
            className="form-input bg-stone-100"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-input bg-stone-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          </div>
        </form>
        <button type="submit" className="submit-button bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
      </main>
    </div>
  );
}

export default App;
