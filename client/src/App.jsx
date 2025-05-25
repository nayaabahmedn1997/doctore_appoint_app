
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <Routes>
      <Route  
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
      <Route  
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

      <Route  
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
    </Routes>
      
    
  );
}

export default App;
