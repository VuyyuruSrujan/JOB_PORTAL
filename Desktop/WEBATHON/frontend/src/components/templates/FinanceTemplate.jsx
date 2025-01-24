import './FinanceTemplate.css';

function FinanceTemplate({ data }) {
  return (
    <div className="template finance-template">
      <div className="header-section">
        <h1>{data.fullName}</h1>
        <div className="contact-details">
          <span><i className="fas fa-envelope"></i> {data.email}</span>
          <span><i className="fas fa-phone"></i> {data.phone}</span>
          <span><i className="fas fa-map-marker-alt"></i> {data.address}</span>
        </div>
      </div>

      <div className="main-content">
        <div className="left-column">
          <section className="professional-summary">
            <h2><i className="fas fa-chart-line"></i> Professional Summary</h2>
            <p>{data.summary}</p>
          </section>

          <section className="experience">
            <h2><i className="fas fa-briefcase"></i> Work Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <h3>{exp.position}</h3>
                  <span className="duration">{exp.duration}</span>
                </div>
                <p className="company">{exp.company}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </section>
        </div>

        <div className="right-column">
          <section className="skills">
            <h2><i className="fas fa-tasks"></i> Core Competencies</h2>
            <ul className="skills-list">
              {data.skills.split(',').map((skill, index) => (
                <li key={index}>{skill.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="education">
            <h2><i className="fas fa-university"></i> Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <p>{edu.school}</p>
                <p className="year">{edu.year}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default FinanceTemplate;