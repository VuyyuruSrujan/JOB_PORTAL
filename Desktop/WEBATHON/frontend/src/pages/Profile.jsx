import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Profile.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Profile() {
  // const [jobApplications, setJobApplications] = useState([
  //   { company: 'Tech Corp', position: 'Software Engineer', status: 'Applied', date: '2024-03-01' },
  //   { company: 'Digital Solutions', position: 'Frontend Developer', status: 'Interview', date: '2024-03-05' },
  //   { company: 'Innovation Inc', position: 'Full Stack Developer', status: 'Rejected', date: '2024-02-28' },
  // ]);
  const [Details , setDetails] = useState("");
  const [my_totalApplications , setmy_totalApplcations] = useState("")
  const [totalApplications , setTotalpplications] = useState("");
  const [my_applied_jobs , setmy_applied_jobs ] = useState([])
  useEffect(() =>{
    getmyData();
    No_of_applies();
    total_no_applies();
    console.log(my_applied_jobs)
  },[])

  async function getmyData(){
    var mail = localStorage.getItem("mail")
    var answer = await fetch(`http://localhost:5001/mydata/${mail}`)
    var data =await answer.json();
    console.log(data);
    setDetails(data);
  }

  async function No_of_applies() {
    var from = localStorage.getItem("mail");
    const response = await fetch(`http://localhost:5001/get_my_applies/${from}`);
    const data = await response.json();
    console.log("data:",data);
    setmy_applied_jobs(data);
    console.log("data length:",data.length);
    setmy_totalApplcations(data.length);
  };

  async function total_no_applies() {
    try {
      const response = await fetch("http://localhost:5001/get_no_of_applications");
      const data = await response.json();  // Parse the response into JSON
      console.log("Total number of applications:", data); // Access the total count
      setTotalpplications(data.total)
    } catch (error) {
      console.log("Error:", error);
    }
  }
  
  

  const [newApplication, setNewApplication] = useState({
    company: '',
    position: '',
    status: 'Applied',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddApplication = (e) => {
    e.preventDefault();
    setJobApplications([...jobApplications, newApplication]);
    setNewApplication({
      company: '',
      position: '',
      status: 'Applied',
      date: new Date().toISOString().split('T')[0]
    });
  };

  // const applicationStats = {
  //   total: jobApplications.length,
  //   applied: jobApplications.filter(app => app.status === 'Applied').length,
  //   interview: jobApplications.filter(app => app.status === 'Interview').length,
  //   rejected: jobApplications.filter(app => app.status === 'Rejected').length
  // };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Job Applications',
        data: [4, 6, 8, 5, 7, 9],
        borderColor: '#007bff',
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Job Applications Over Time'
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="user-info">
          <i className="fas fa-user-circle profile-avatar"></i>
          <div className="user-details">
            <h2>{Details.name || 'Your Name'}</h2> 
             <p><i className="fas fa-envelope"></i> {Details.mail || 'email@example.com'}</p>
            <p><i className="fas fa-phone"></i> Job Seeker</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-file-alt"></i>
            <h3>Total Applications</h3>
            <p>{totalApplications}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-paper-plane"></i>
            <h3>Applied</h3>
            <p>{my_totalApplications}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-user-tie"></i>
            <h3>Interviews</h3>
            <p>0</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-times-circle"></i>
            <h3>Rejected</h3>
            {/* <p>{applicationStats.rejected}</p> */}
          </div>
        </div>

        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>

        {my_applied_jobs.map((app, index) => (
        <div key={index} className="application-card">
          <div className="application-header">
            <h4>{app.position}</h4>
            <span className={`status ${app.status ? app.status.toLowerCase() : 'unknown'}`}>
              {app.status || 'Unknown'}
            </span>
          </div>
          <p className="company"><i className="fas fa-building"></i> {app.company}</p>
          <p className="date"><i className="fas fa-calendar-alt"></i> {app.date}</p>
        </div>
      ))}
        </div>
      </div>
  );
}

export default Profile;