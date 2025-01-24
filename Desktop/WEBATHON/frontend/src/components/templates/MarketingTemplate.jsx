import './MarketingTemplate.css';

function MarketingTemplate({ data }) {
  return (
    <div className="template marketing-template">
      <div className="header">
        <div className="name-title">
          <h1>{data.fullName}</h1>
          <div className="contact-bar">
            <span><i className="fas fa-envelope"></i> {data.email}</span>
            <span><i className="fas fa-phone"></i> {data.phone}</span>
            <span><i className="fas fa-map-marker-alt"></i> {data.address}</span>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <section className="profile-section">
          <h2><i className="fas fa-bullhorn"></i> Marketing Profile</h2>
          <p>{data.summary}</p>
        </section>

        <section className="expertise-section">
          <h2><i className="fas fa-star"></i> Areas of Expertise</h2>
          <div className="expertise-grid">
            {data.skills.split(',').map((skill, index) => (
              <div key={index} className="expertise-item">
                <span>{skill.trim()}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <h2><i className="fas fa-briefcase"></i> Marketing Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-card">
              <div className="experience-header">
                <h3>{exp.position}</h3>
                <span className="duration">{exp.duration}</span>
              </div>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="education-section">
          <h2><i className="fas fa-graduation-cap"></i> Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-card">
              <h3>{edu.degree}</h3>
              <p>{edu.school}</p>
              <span>{edu.year}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default MarketingTemplate;