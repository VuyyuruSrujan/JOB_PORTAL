import { useState } from 'react';
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

function Profile({ formData, selectedTemplate }) {
  const [jobApplications, setJobApplications] = useState([
    { company: 'Tech Corp', position: 'Software Engineer', status: 'Applied', date: '2024-03-01' },
    { company: 'Digital Solutions', position: 'Frontend Developer', status: 'Interview', date: '2024-03-05' },
    { company: 'Innovation Inc', position: 'Full Stack Developer', status: 'Rejected', date: '2024-02-28' },
  ]);

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

  const applicationStats = {
    total: jobApplications.length,
    applied: jobApplications.filter(app => app.status === 'Applied').length,
    interview: jobApplications.filter(app => app.status === 'Interview').length,
    rejected: jobApplications.filter(app => app.status === 'Rejected').length
  };

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
            <h2>{formData.fullName || 'Your Name'}</h2>
            <p><i className="fas fa-envelope"></i> {formData.email || 'email@example.com'}</p>
            <p><i className="fas fa-phone"></i> {formData.phone || 'Phone Number'}</p>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-file-alt"></i>
            <h3>Total Applications</h3>
            <p>{applicationStats.total}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-paper-plane"></i>
            <h3>Applied</h3>
            <p>{applicationStats.applied}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-user-tie"></i>
            <h3>Interviews</h3>
            <p>{applicationStats.interview}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-times-circle"></i>
            <h3>Rejected</h3>
            <p>{applicationStats.rejected}</p>
          </div>
        </div>

        <div className="chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>

        <div className="applications-section">
          <h3>Job Applications</h3>
          <form onSubmit={handleAddApplication} className="add-application-form">
            <input
              type="text"
              placeholder="Company"
              value={newApplication.company}
              onChange={(e) => setNewApplication({...newApplication, company: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Position"
              value={newApplication.position}
              onChange={(e) => setNewApplication({...newApplication, position: e.target.value})}
              required
            />
            <select
              value={newApplication.status}
              onChange={(e) => setNewApplication({...newApplication, status: e.target.value})}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="date"
              value={newApplication.date}
              onChange={(e) => setNewApplication({...newApplication, date: e.target.value})}
              required
            />
            <button type="submit">Add Application</button>
          </form>

          <div className="applications-list">
            {jobApplications.map((app, index) => (
              <div key={index} className="application-card">
                <div className="application-header">
                  <h4>{app.position}</h4>
                  <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span>
                </div>
                <p className="company"><i className="fas fa-building"></i> {app.company}</p>
                <p className="date"><i className="fas fa-calendar-alt"></i> {app.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;