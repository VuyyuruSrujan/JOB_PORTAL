import './EducationTemplate.css';

function EducationTemplate({ data }) {
  return (
    <div className="template education-template">
      <header className="edu-header">
        <h1>{data.fullName}</h1>
        <div className="contact-info">
          <div><i className="fas fa-envelope"></i> {data.email}</div>
          <div><i className="fas fa-phone"></i> {data.phone}</div>
          <div><i className="fas fa-map-marker-alt"></i> {data.address}</div>
        </div>
      </header>

      <section className="objective">
        <h2><i className="fas fa-chalkboard-teacher"></i> Teaching Philosophy</h2>
        <p>{data.summary}</p>
      </section>

      <section className="qualifications">
        <h2><i className="fas fa-graduation-cap"></i> Educational Background</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="qualification-item">
            <div className="edu-details">
              <h3>{edu.degree}</h3>
              <p className="institution">{edu.school}</p>
              <p className="year">{edu.year}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="teaching-experience">
        <h2><i className="fas fa-book-reader"></i> Teaching Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.position}</h3>
            <p className="school-name">{exp.company}</p>
            <p className="duration">{exp.duration}</p>
            <p className="responsibilities">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="skills-certifications">
        <h2><i className="fas fa-certificate"></i> Skills & Certifications</h2>
        <div className="skills-grid">
          {data.skills.split(',').map((skill, index) => (
            <div key={index} className="skill-item">
              <span>{skill.trim()}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default EducationTemplate;