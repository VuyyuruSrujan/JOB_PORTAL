import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import OrgLogin from './pages/OrgLogin';
import UserDashboard from './pages/UserDashboard';
import OrgDashboard from './pages/OrgDashboard';
import UserRegistration from './pages/UserRegistration';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import JobPost from './pages/JobPost';
import GetAllPostings from './pages/GetAllPostings';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/org/login" element={<OrgLogin />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/org/dashboard" element={<OrgDashboard />} />
          <Route path="/job/post" element={<JobPost />} />
          <Route path="/blog" element={<Navigate to="/jobs" />} />
          <Route path="/about" element={<Navigate to="/jobs" />} />
          <Route path="/contact" element={<Navigate to="/jobs" />} />
          <Route path="/UserRegistration" element={<UserRegistration />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path ="/ResetPassword" element={<ResetPassword />} />
          <Route path = "/AllPosts" element={<GetAllPostings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;