import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaDollarSign, FaArrowRight } from 'react-icons/fa';

function Home() {
  const jobs = [
    {
      id: 1,
      title: 'Software Developer',
      company: 'Tech Corp',
      logo: 'https://picsum.photos/50/50?random=1',
      location: 'Remote',
      salary: '$80k - $120k'
    },
    {
      id: 2,
      title: 'UX Designer',
      company: 'Design Studio',
      logo: 'https://picsum.photos/50/50?random=2',
      location: 'New York',
      salary: '$70k - $90k'
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'Innovation Inc',
      logo: 'https://picsum.photos/50/50?random=3',
      location: 'San Francisco',
      salary: '$100k - $150k'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'AI Solutions',
      logo: 'https://picsum.photos/50/50?random=4',
      location: 'Boston',
      salary: '$90k - $130k'
    }
  ];

  return (
    <div className="home-page">
      <div className="home-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginBottom: '2rem', color: '#fff' }}
          >
            Available Positions
          </motion.h1>
          <div className="job-grid">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="card job-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
                }}
              >
                <img src={job.logo} alt={job.company} className="company-logo" />
                <h3 style={{ color: '#1a237e', marginBottom: '0.5rem' }}>{job.title}</h3>
                <p style={{ color: '#666', marginBottom: '1rem' }}>{job.company}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FaMapMarkerAlt style={{ color: '#666' }} />
                    {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FaDollarSign style={{ color: '#666' }} />
                    {job.salary}
                  </span>
                </div>
                <motion.button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Apply Now
                  <FaArrowRight />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;