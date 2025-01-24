import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

function UserDashboard() {
  const applications = [
    { 
      id: 1, 
      company: 'Tech Corp',
      logo: 'https://picsum.photos/50/50?random=5',
      position: 'Frontend Developer',
      status: 'Pending',
      appliedDate: '2024-03-15'
    },
    { 
      id: 2,
      company: 'Dev Inc',
      logo: 'https://picsum.photos/50/50?random=6',
      position: 'Backend Developer',
      status: 'Accepted',
      appliedDate: '2024-03-10'
    },
    { 
      id: 3,
      company: 'Software Co',
      logo: 'https://picsum.photos/50/50?random=7',
      position: 'Full Stack Developer',
      status: 'Rejected',
      appliedDate: '2024-03-05'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Accepted': return <FaCheckCircle />;
      case 'Rejected': return <FaTimesCircle />;
      default: return <FaClock />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ color: '#fff', marginBottom: '2rem' }}>My Applications</h2>
      <div style={{ marginTop: '2rem' }}>
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            className="card"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <img src={app.logo} alt={app.company} className="company-logo" />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#1a237e' }}>{app.position}</h3>
                <p style={{ color: '#666' }}>{app.company}</p>
                <p style={{ color: '#888', fontSize: '0.875rem' }}>Applied on: {app.appliedDate}</p>
              </div>
              <div className={`status-badge status-${app.status.toLowerCase()}`}>
                {getStatusIcon(app.status)}
                {app.status}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default UserDashboard;