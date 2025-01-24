import './ITTemplate.css';

function ITTemplate({ data }) {
  return (
    <div className="template it-template">
      <header>
        <h1>{data.fullName}</h1>
        <div className="contact-info">
          <p><i className="fas fa-envelope"></i> {data.email}</p>
          <p><i className="fas fa-phone"></i> {data.phone}</p>
          <p><i className="fas fa-map-marker-alt"></i> {data.address}</p>
        </div>
      </header>

      <section className="summary">
        <h2><i className="fas fa-user"></i> Professional Summary</h2>
        <p>{data.summary}</p>
      </section>

      <section className="skills">
        <h2><i className="fas fa-code"></i> Technical Skills</h2>
        <div className="skills-list">
          {data.skills.split(',').map((skill, index) => (
            <span key={index} className="skill-tag">{skill.trim()}</span>
          ))}
        </div>
      </section>

      <section className="experience">
        <h2><i className="fas fa-briefcase"></i> Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.position}</h3>
            <p className="company">{exp.company} | {exp.duration}</p>
            <p>{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="education">
        <h2><i className="fas fa-graduation-cap"></i> Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree}</h3>
            <p>{edu.school} | {edu.year}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ITTemplate;