import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios'; // Import axios to make requests to the backend

function OrgDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    get_all_applies();
  }, []);

  async function get_all_applies() {
    var mail = localStorage.getItem("mail");
    const response = await fetch(`http://localhost:5001/get_for_orga/${mail}`);
    const data = await response.json();
    console.log("data:", data);

    // Fetch additional job details for each application using post_id
    const updatedApplications = await Promise.all(data.map(async (app) => {
      const jobResponse = await axios.post("http://localhost:5001/requested", { post_id: app.post_id });
      const jobData = jobResponse.data;
      return { ...app, jobDetails: jobData }; // Include job details in the application object
    }));

    setApplications(updatedApplications);
  }

  const handleStatus = async (id, newStatus, from) => {
    try {
      const mail = localStorage.getItem("mail");
      console.log("Payload:", { id, newStatus, from, mail });
  
      const response = await axios.post("http://localhost:5001/update_apply_status", {
        post_id: id,
        status: newStatus,
        from: from,
        mail: mail,
      });
  
      if (response.status === 200) {
        alert(`Application status updated to ${newStatus}!`);
        console.log("Updated Response:", response.data);
      }
    } catch (error) {
      console.error("Error updating status:", error.response?.data || error.message);
      alert("Failed to update application status. Please try again.");
    }
  };
  

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f6f9',
      color: '#333',
      padding: '20px',
    },
    heading: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: '#1e3a8a',
    },
    button: {
      backgroundColor: '#1e3a8a',
      color: 'white',
      border: 'none',
      padding: '12px 18px',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#2563eb',
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      padding: '20px',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-10px)',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    },
    cardHeader: {
      display: 'flex',
      padding: '20px',
      alignItems: 'center',
      borderBottom: '1px solid #e5e7eb',
    },
    companyLogo: {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      marginRight: '15px',
    },
    cardHeaderTitle: {
      fontSize: '1.25rem',
      color: '#1e3a8a',
      marginBottom: '5px',
    },
    cardHeaderText: {
      fontSize: '1rem',
      color: '#6b7280',
    },
    cardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f9fafb',
    },
    footerButton: {
      backgroundColor: '#10b981',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      width: '48%', // Ensure both buttons have the same width
    },
    footerButtonHover: {
      backgroundColor: '#34d399',
    },
    footerButtonReject: {
      backgroundColor: '#ef4444',
    },
    footerButtonRejectHover: {
      backgroundColor: '#f87171',
    },
    postJobButton: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '10px 16px',
      borderRadius: '8px',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      textDecoration: 'none',
    },
    postJobButtonHover: {
      backgroundColor: '#2563eb',
    },
    plusIcon: {
      fontSize: '1.2rem',
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={styles.container}
    >
      <button style={styles.button} onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}>
        Post a job application
      </button>

      <div>
        <h2 style={styles.heading}>Applications Received</h2>
        <Link to="/job/post" style={styles.postJobButton} onMouseEnter={(e) => e.target.style.backgroundColor = styles.postJobButtonHover.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = styles.postJobButton.backgroundColor}>
          <FaPlus style={styles.plusIcon} />
          Post New Job
        </Link>
      </div>
      
      <div style={styles.cardContainer}>
        {applications.map((app, index) => (
          <motion.div
            key={app.id}
            style={styles.card}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={styles.cardHeader}>
              <img src={app.avatar} alt={app.name} style={styles.companyLogo} />
              <div>
                <h3 style={styles.cardHeaderTitle}>{app.from}</h3>
                <p style={styles.cardHeaderText}>{app.post_id}</p>
                <p style={styles.cardHeaderText}>{app.experience} experience • Applied on {app.appliedDate}</p>
                {/* Display job details */}
                {app.jobDetails && (
                  <div>
                    <p style={styles.cardHeaderText}><strong>Job Title:</strong> {app.jobDetails.Job_title}</p>
                    <p style={styles.cardHeaderText}><strong>Location:</strong> {app.jobDetails.Location}</p>
                    <p style={styles.cardHeaderText}><strong>Salary Range:</strong> {app.jobDetails.Salary_Range}</p>
                    <p style={styles.cardHeaderText}><strong>Requirements:</strong></p>
                    <pre style={styles.cardHeaderText}>{app.jobDetails.Requirements}</pre>
                    <p style={styles.cardHeaderText}><strong>Description:</strong></p>
                    <p style={styles.cardHeaderText}>{app.jobDetails.Description}</p>
                  </div>
                )}
              </div>
            </div>
            <div style={styles.cardFooter}>
              <motion.button
                style={styles.footerButton}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.footerButtonHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.footerButton.backgroundColor}
                onClick={() => handleStatus(app.post_id, 'Accepted' , (app.from))}
              >
                Accept
              </motion.button>
              <motion.button
                style={{ ...styles.footerButton, ...styles.footerButtonReject }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={(e) => e.target.style.backgroundColor = styles.footerButtonRejectHover.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = styles.footerButtonReject.backgroundColor}
                onClick={() => handleStatus(app.post_id, 'Rejected')}
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
