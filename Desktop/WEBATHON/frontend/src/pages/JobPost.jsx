import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

function JobPost() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock job posting - in real app, this would call an API
    toast.success('Job posted successfully!');
    navigate('/org/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ marginBottom: '2rem' }}>Post a New Job</h2>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
          />
        </div>
        <div className="form-group">
          <label>Requirements</label>
          <textarea
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Enter job requirements"
            style={{ width: '100%', minHeight: '100px', padding: '0.5rem' }}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter job location"
          />
        </div>
        <div className="form-group">
          <label>Salary Range</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary range"
          />
        </div>
        <motion.button
          className="btn btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: '100%' }}
        >
          Post Job
        </motion.button>
      </form>
    </motion.div>
  );
}

export default JobPost;