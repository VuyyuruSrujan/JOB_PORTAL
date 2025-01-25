// import axios from 'axios';
// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function UserDashboard() {
//   const navigate = useNavigate();
//   const [applications, setApplications] = useState([]);

//   useEffect(() => {
//     const validate = localStorage.getItem("authToken");
//     if (!validate) {
//       navigate("/user/login");
//     }
//     getAllPosts();
//   }, []);

//   async function getAllPosts() {
//     const response = await fetch("http://localhost:5001/all_job_postings");
//     const data = await response.json();
//     console.log("data",data);
//     setApplications(data);
//   }

//   const styles = {
//     dashboardContainer: {
//       padding: "2rem",
//       fontFamily: "'Roboto', sans-serif",
//       background: "linear-gradient(135deg, #1a237e, #0d47a1)",
//       color: "#fff",
//     },
//     dashboardTitle: {
//       textAlign: "center",
//       fontSize: "2.5rem",
//       marginBottom: "2rem",
//       marginTop: "80px",
//     },
//     makeResumeButton: {
//       position: "absolute",
//       top: "100px",
//       right: "20px",
//       backgroundColor: "#1a237e",
//       color: "#fff",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       border: "none",
//       fontSize: "1rem",
//       fontWeight: "bold",
//       cursor: "pointer",
//       transition: "background-color 0.3s ease",
//     },
//     makeResumeButtonHover: {
//       backgroundColor: "#0d47a1",
//     },
//     cardsContainer: {
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//       gap: "1.5rem",
//       margin: "0 auto",
//     },
//     jobCard: {
//       background: "#fff",
//       color: "#333",
//       borderRadius: "12px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column",
//       transition: "transform 0.3s ease-in-out",
//     },
//     cardHeader: {
//       background: "#0d47a1",
//       color: "#fff",
//       padding: "1rem",
//       display: "flex",
//       alignItems: "center",
//     },
//     logoPlaceholder: {
//       width: "50px",
//       height: "50px",
//       background: "#e3f2fd",
//       color: "#0d47a1",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: "1.5rem",
//       fontWeight: "bold",
//       borderRadius: "50%",
//       marginRight: "1rem",
//     },
//     jobTitle: {
//       fontSize: "1.25rem",
//       fontWeight: "bold",
//     },
//     cardBody: {
//       padding: "1rem",
//     },
//     jobDescription: {
//       marginBottom: "1rem",
//       fontSize: "0.9rem",
//     },
//     jobDetails: {
//       display: "flex",
//       justifyContent: "space-between",
//       fontSize: "0.9rem",
//       marginTop: "0.5rem",
//     },
//     icon: {
//       marginRight: "0.5rem",
//       color: "#0d47a1",
//     },
//     cardFooter: {
//       padding: "1rem",
//       textAlign: "center",
//       background: "#f5f5f5",
//     },
//     applyButton: {
//       background: "#1a237e",
//       color: "#fff",
//       border: "none",
//       padding: "0.5rem 1.5rem",
//       borderRadius: "8px",
//       cursor: "pointer",
//       fontSize: "1rem",
//       fontWeight: "bold",
//       transition: "background 0.3s ease",
//     },
//   };

//   async function ApplyNow(post_id, Job_title) {
//     try {
//       const mail = localStorage.getItem("mail");
  
//       const response = await axios.post("http://localhost:5001/get_post_by_id", {
//         post_id,
//         mail,
//         Job_title,
//       });
//         const data = response.data;
//         console.log("Response data:", data);
//       toast.success(data.message);
//     } catch (error) {
//       // Log any error that occurs
//       console.error("Error applying for job:", error);
//       toast.warning(error);
//     }
//   }
  
//   async function makeResume(){
//     navigate('/ResumeForm')
//   };

//   return (
//     <motion.div
//       style={styles.dashboardContainer}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h1 style={styles.dashboardTitle}>Available Job Postings</h1>
//       <button
//         style={styles.makeResumeButton}
//         onMouseEnter={(e) =>
//           (e.target.style.backgroundColor = styles.makeResumeButtonHover.backgroundColor)
//         }
//         onMouseLeave={(e) =>
//           (e.target.style.backgroundColor = styles.makeResumeButton.backgroundColor)
//         }
//       onClick={makeResume}>
//         Make Resume
//       </button>
//       <div style={styles.cardsContainer}>
//         {applications.map((app, index) => (
//           <motion.div
//             key={index}
//             style={styles.jobCard}
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: index * 0.1 }}
//             whileHover={{ scale: 1.05 }}
//           >
//             <div style={styles.cardHeader}>
//               <div style={styles.logoPlaceholder}>{app.Job_title[0]}</div>
//               <h2 style={styles.jobTitle}>{app.Job_title}</h2>
//             </div>
//             <div style={styles.cardBody}>
//               <p style={styles.jobDescription}>{app.Description}</p>
//               <div style={styles.jobDetails}>
//                 <div>
//                   <FaMapMarkerAlt style={styles.icon} />
//                   {app.Location}
//                 </div>
//                 <div>
//                   <FaMoneyBillWave style={styles.icon} />
//                   {app.Salary_Range}
//                 </div>
//               </div>
//             </div>
//             <div style={styles.cardFooter}>
//               <motion.button
//                 style={styles.applyButton}
//                 whileHover={{ backgroundColor: "#0d47a1" }}
//               >
//                 <p onClick={()=>ApplyNow((app.post_id),(app.Job_title))}> Apply Now </p>
//               </motion.button>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default UserDashboard;


import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UserDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loadingPostId, setLoadingPostId] = useState(null); // Track loading state for specific job

  useEffect(() => {
    const validate = localStorage.getItem("authToken");
    if (!validate) {
      navigate("/user/login");
    }
    getAllPosts();
  }, []);

  async function getAllPosts() {
    const response = await fetch("http://localhost:5001/all_job_postings");
    const data = await response.json();
    setApplications(data);
  }

  const styles = {
    dashboardContainer: {
      padding: "2rem",
      fontFamily: "'Roboto', sans-serif",
      background: "linear-gradient(135deg, #1a237e, #0d47a1)",
      color: "#fff",
    },
    dashboardTitle: {
      textAlign: "center",
      fontSize: "2.5rem",
      marginBottom: "2rem",
      marginTop: "80px",
    },
    makeResumeButton: {
      position: "absolute",
      top: "100px",
      right: "20px",
      backgroundColor: "#1a237e",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      margin: "0 auto",
    },
    jobCard: {
      background: "#fff",
      color: "#333",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    cardHeader: {
      background: "#0d47a1",
      color: "#fff",
      padding: "1rem",
      display: "flex",
      alignItems: "center",
    },
    logoPlaceholder: {
      width: "50px",
      height: "50px",
      background: "#e3f2fd",
      color: "#0d47a1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      fontWeight: "bold",
      borderRadius: "50%",
      marginRight: "1rem",
    },
    jobTitle: {
      fontSize: "1.25rem",
      fontWeight: "bold",
    },
    cardBody: {
      padding: "1rem",
    },
    jobDescription: {
      marginBottom: "1rem",
      fontSize: "0.9rem",
    },
    jobDetails: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "0.9rem",
      marginTop: "0.5rem",
    },
    icon: {
      marginRight: "0.5rem",
      color: "#0d47a1",
    },
    cardFooter: {
      padding: "1rem",
      textAlign: "center",
      background: "#f5f5f5",
    },
    applyButton: {
      background: "#1a237e",
      color: "#fff",
      border: "none",
      padding: "0.5rem 1.5rem",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "bold",
    },
  };

  async function ApplyNow(post_id, Job_title) {
    setLoadingPostId(post_id); // Set the loading post ID
    try {
      const from = localStorage.getItem("mail");
      const response = await axios.post("http://localhost:5001/get_post_by_id", {
        post_id,
        from,
        Job_title,
      });
      const data = response.data;
      
      // Await the POST request to apply for the job
      const insertingResponse = await axios.post("http://localhost:5001/applied_jobs", { from, post_id });
      console.log("insertingResponse", insertingResponse.data);
  
      toast.success(data.message);
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.warning("Failed to apply for the job.");
    } finally {
      setLoadingPostId(null); // Reset the loading post ID
    }
  }
  

  async function makeResume() {
    navigate('/ResumeForm');
  }

  return (
    <motion.div
      style={styles.dashboardContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 style={styles.dashboardTitle}>Available Job Postings</h1>
      <button
        style={styles.makeResumeButton}
        onClick={makeResume}
      >
        Make Resume
      </button>
      <div style={styles.cardsContainer}>
        {applications.map((app, index) => (
          <motion.div
            key={index}
            style={styles.jobCard}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.logoPlaceholder}>{app.Job_title[0]}</div>
              <h2 style={styles.jobTitle}>{app.Job_title}</h2>
            </div>
            <div style={styles.cardBody}>
              <p style={styles.jobDescription}>{app.Description}</p>
              <div style={styles.jobDetails}>
                <div>
                  <FaMapMarkerAlt style={styles.icon} />
                  {app.Location}
                </div>
                <div>
                  <FaMoneyBillWave style={styles.icon} />
                  {app.Salary_Range}
                </div>
              </div>
            </div>
            <div style={styles.cardFooter}>
              <motion.button
                style={styles.applyButton}
                onClick={() => ApplyNow(app.post_id, app.Job_title)}
              >
                {loadingPostId === app.post_id ? "Applying..." : "Apply Now"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
    </motion.div>
  );
}

export default UserDashboard;
