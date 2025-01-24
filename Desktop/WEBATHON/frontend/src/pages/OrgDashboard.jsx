import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaUser } from 'react-icons/fa';
import './OrgDashboard.css'

function OrgDashboard() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      name: 'John Doe',
      avatar: 'https://picsum.photos/50/50?random=8',
      position: 'Frontend Developer',
      status: 'Pending',
      experience: '3 years',
      appliedDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      avatar: 'https://picsum.photos/50/50?random=9',
      position: 'Backend Developer',
      status: 'Pending',
      experience: '5 years',
      appliedDate: '2024-03-14'
    }
  ]);

  const handleStatus = (id, newStatus) => {
    setApplications(applications.map(app => {
      if (app.id === id) {
        toast.success(`Application ${newStatus.toLowerCase()}`);
        return { ...app, status: newStatus };
      }
      return app;
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#fff' }}>Applications Received</h2>
        <Link to="/job/post" className="btn btn-primary">
          <FaPlus />
          Post New Job
        </Link>
      </div>
      
      <div className="card-container">
  {applications.map((app, index) => (
    <motion.div
      key={app.id}
      className="card"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="card-header">
        <img src={app.avatar} alt={app.name} className="company-logo" />
        <div>
          <h3>{app.name}</h3>
          <p>{app.position}</p>
          <p>{app.experience} experience • Applied on {app.appliedDate}</p>
        </div>
      </div>
      <div className="card-footer">
        <motion.button
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleStatus(app.id, 'Accepted')}
        >
          Accept
        </motion.button>
        <motion.button
          className="btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleStatus(app.id, 'Rejected')}
        >
          Reject
        </motion.button>
      </div>
    </motion.div>
  ))}
</div>

    </motion.div>
  );
}

export default OrgDashboard;