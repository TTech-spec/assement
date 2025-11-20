// Main App component with routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddUserPage } from './pages/AddUserPage';
import { UserDetailPage } from './pages/UserDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
          <Route path="/user/:id/edit" element={<UserDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
