// import { motion } from 'framer-motion';
// import { useEffect, useState } from 'react';
// import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import './UserDashboard.css';

// function UserDashboard() {
//   const navigate = useNavigate();
//   const [applications , setapplications] = useState([]);

//   useEffect(() =>{
//     var validate = localStorage.getItem("authToken");
//     if(!validate){
//       navigate("/user/login")
//     }
//     getallposts();
//   },[])

//   async function getallposts(){
//     var AllPosts = await fetch("http://localhost:5001/all_job_postings")
//     var answer = await AllPosts.json();
//     console.log("answer",answer);
//     setapplications(answer)
//   }

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'Accepted': return <FaCheckCircle />;
//       case 'Rejected': return <FaTimesCircle />;
//       default: return <FaClock />;
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <h2 style={{ color: '#fff', marginBottom: '2rem' }}>My Applications</h2>
//       <div style={{ marginTop: '2rem' }}>
//         {applications.map((app, index) => (
//           <motion.div
//             key={app.id}
//             className="card"
//             initial={{ x: -20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: index * 0.1 }}
//             whileHover={{ scale: 1.02 }}
//           >
//             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
//               {/* <img src={app.logo} alt={app.company} className="company-logo" /> */}
//               <div style={{ flex: 1 }}>
//                 <h3 style={{ color: '#1a237e' }}>{app.Job_title}</h3>
//                 <p style={{ color: '#666' }}>{app.Requirements}</p>
//                 {/* <p style={{ color: '#888', fontSize: '0.875rem' }}>Applied on: {app.appliedDate}</p> */}
//                 <p>{app.Location}</p>
//                 <p>{app.Salary_Range}</p>
//                 <p>{app.Description}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

// export default UserDashboard;


import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

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

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="dashboard-title">Available Job Postings</h1>
      <div className="cards-container">
        {applications.map((app, index) => (
          <motion.div
            key={index}
            className="job-card"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="card-header">
              <div className="logo-placeholder">{app.Job_title[0]}</div>
              <h2 className="job-title">{app.Job_title}</h2>
            </div>
            <div className="card-body">
              <p className="job-description">{app.Description}</p>
              <div className="job-details">
                <div className="job-location">
                  <FaMapMarkerAlt className="icon" />
                  {app.Location}
                </div>
                <div className="job-salary">
                  <FaMoneyBillWave className="icon" />
                  {app.Salary_Range}
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button className="apply-button">Apply Now</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default UserDashboard;
