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
import Profile from './pages/Profile';
import OrganizationReg from './pages/OrganizationReg';
import OrganizationProfile from './pages/OrganizationProfile';
import ResumeForm from './pages/ResumeForm';
import { useState } from 'react';
import ResumePreview from './pages/ResumePreview';
function App() {

  const [selectedTemplate, setSelectedTemplate] = useState('it');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    summary: '',
    education: [],
    experience: [],
    skills: '',
  });

  const handleFormChange = (data) => {
    setFormData(data);
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'it':
        return <ITTemplate data={formData} />;
      case 'finance':
        return <FinanceTemplate data={formData} />;
      case 'marketing':
        return <MarketingTemplate data={formData} />;
      case 'education':
        return <EducationTemplate data={formData} />;
      default:
        return <ITTemplate data={formData} />;
    }
  };

  const ResumeBuilder = () => (
    <div className="app-container">
      <div className="template-selector">
        <h2>Select Your Template</h2>
        <div className="template-buttons">
          <button 
            className={selectedTemplate === 'it' ? 'active' : ''} 
            onClick={() => setSelectedTemplate('it')}
          >
            <i className="fas fa-laptop-code"></i> IT
          </button>
          <button 
            className={selectedTemplate === 'finance' ? 'active' : ''} 
            onClick={() => setSelectedTemplate('finance')}
          >
            <i className="fas fa-chart-line"></i> Finance
          </button>
          <button 
            className={selectedTemplate === 'marketing' ? 'active' : ''} 
            onClick={() => setSelectedTemplate('marketing')}
          >
            <i className="fas fa-bullhorn"></i> Marketing
          </button>
          <button 
            className={selectedTemplate === 'education' ? 'active' : ''} 
            onClick={() => setSelectedTemplate('education')}
          >
            <i className="fas fa-graduation-cap"></i> Education
          </button>
        </div>
      </div>
      <div className="content-container">
        <ResumeForm data={formData} onFormChange={handleFormChange} />
        <div className="template-preview">
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
  
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
          <Route path = "/Profile" element={<Profile />} />
          <Route path ="/OrganizationReg" element={<OrganizationReg />} />
          <Route path="/OrganizationProfile" element={<OrganizationProfile />} />
          <Route path ="/ResumeForm" element={<ResumeForm />} />
          <Route path='/preview' element={<ResumePreview />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;