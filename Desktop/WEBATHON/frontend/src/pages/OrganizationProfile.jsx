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
import './OrganizationProfile.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function OrganizationProfile() {
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'New York, NY',
      type: 'Full-time',
      applicants: 45,
      status: 'Active',
      posted: '2024-03-01'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'San Francisco, CA',
      type: 'Full-time',
      applicants: 32,
      status: 'Active',
      posted: '2024-03-05'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Contract',
      applicants: 28,
      status: 'Closed',
      posted: '2024-02-15'
    }
  ]);

  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    status: 'Active',
    posted: new Date().toISOString().split('T')[0]
  });

  const handleAddJob = (e) => {
    e.preventDefault();
    const job = {
      ...newJob,
      id: jobPostings.length + 1,
      applicants: 0
    };
    setJobPostings([...jobPostings, job]);
    setNewJob({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      status: 'Active',
      posted: new Date().toISOString().split('T')[0]
    });
  };

  const stats = {
    totalJobs: jobPostings.length,
    activeJobs: jobPostings.filter(job => job.status === 'Active').length,
    totalApplicants: jobPostings.reduce((sum, job) => sum + job.applicants, 0),
    avgApplicants: Math.round(jobPostings.reduce((sum, job) => sum + job.applicants, 0) / jobPostings.length)
  };

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Job Applications Received',
        data: [25, 45, 60, 35, 50, 70],
        borderColor: '#2c3e50',
        tension: 0.4
      },
      {
        label: 'Jobs Posted',
        data: [2, 3, 4, 2, 3, 5],
        borderColor: '#3498db',
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
        text: 'Recruitment Activity'
      }
    }
  };

  return (
    <div className="org-profile-container">
      <div className="org-header">
        <div className="org-info">
          <i className="fas fa-building org-avatar"></i>
          <div className="org-details">
            <h2>Tech Solutions Inc.</h2>
            <p><i className="fas fa-globe"></i> www.techsolutions.com</p>
            <p><i className="fas fa-map-marker-alt"></i> San Francisco, CA</p>
          </div>
        </div>
      </div>

      <div className="org-content">
        <div className="org-stats-container">
          <div className="org-stat-card">
            <i className="fas fa-briefcase"></i>
            <h3>Total Jobs</h3>
            <p>{stats.totalJobs}</p>
          </div>
          <div className="org-stat-card">
            <i className="fas fa-clock"></i>
            <h3>Active Jobs</h3>
            <p>{stats.activeJobs}</p>
          </div>
          <div className="org-stat-card">
            <i className="fas fa-users"></i>
            <h3>Total Applicants</h3>
            <p>{stats.totalApplicants}</p>
          </div>
          <div className="org-stat-card">
            <i className="fas fa-chart-bar"></i>
            <h3>Avg. Applicants per Job</h3>
            <p>{stats.avgApplicants}</p>
          </div>
        </div>

        <div className="org-chart-container">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default OrganizationProfile;