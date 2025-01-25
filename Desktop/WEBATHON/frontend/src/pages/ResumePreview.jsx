import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaLinkedin, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaDownload, FaEdit, FaCode, FaPalette, FaBriefcase, FaUserMd,
  FaGraduationCap, FaTools, FaTrophy
} from 'react-icons/fa';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumePreview.css';

const roleIcons = {
  developer: FaCode,
  designer: FaPalette,
  business: FaBriefcase,
  medical: FaUserMd
};

const ModernTemplate = ({ data, color }) => {
  const RoleIcon = roleIcons[data.personalInfo.role] || FaBriefcase;
  
  return (
    <div className="modern-template" style={{ '--primary-color': color }}>
      <header>
        <div className="header-content">
          <RoleIcon className="role-icon" />
          <h1>{data.personalInfo.name}</h1>
          <p className="role-title">{data.personalInfo.role}</p>
        </div>
        <div className="contact-info">
          <p><FaPhone /> {data.personalInfo.phone}</p>
          <p><FaEnvelope /> {data.personalInfo.email}</p>
          <p><FaMapMarkerAlt /> {data.personalInfo.address}</p>
          <p><FaLinkedin /> {data.personalInfo.linkedin}</p>
          <p><FaGithub /> {data.personalInfo.github}</p>
        </div>
      </header>
      <main>
        <section className="education-section">
          <h2><FaGraduationCap /> Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.school}</h3>
              <p className="degree">{edu.degree}</p>
              <p className="year-gpa">
                <span>{edu.year}</span>
                {edu.gpa && <span>GPA: {edu.gpa}</span>}
              </p>
            </div>
          ))}
        </section>
        
        <section className="experience-section">
          <h2><FaBriefcase /> Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.company}</h3>
              <p className="position">{exp.position}</p>
              <p className="duration">{exp.duration}</p>
              <p className="description">{exp.description}</p>
            </div>
          ))}
        </section>

        <section className="skills-section">
          <h2><FaTools /> Skills</h2>
          <div className="skills-container">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        <section className="projects-section">
          <h2><FaTrophy /> Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="project-item">
              <h3>{project.name}</h3>
              <p className="description">{project.description}</p>
              <p className="technologies">
                <strong>Technologies:</strong> {project.technologies}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

function ResumePreview() {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('resumeData');
    if (data) {
      setResumeData(JSON.parse(data));
    }
  }, []);

  const downloadPDF = async () => {
    const element = document.getElementById('resume-preview');
    
    // Wait for the element to be fully loaded and styles to be applied
    if (element) {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true, // To support loading external resources like fonts or images
        logging: true, // Log to help debug any issues with rendering
        letterRendering: 1, // Ensures text rendering is handled better
      });
  
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`);
    } else {
      console.error('Resume preview element not found');
    }
  };
  

  if (!resumeData) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading your resume...</p>
      </div>
    );
  }

  return (
    <div className="resume-preview-container">
      <div className="preview-actions">
        <button onClick={() => navigate('/')} className="edit-button">
          <FaEdit /> Edit Resume
        </button>
        <button onClick={downloadPDF} className="download-button">
          <FaDownload /> Download PDF
        </button>
      </div>
      <div id="resume-preview" className="resume-preview">
        <ModernTemplate data={resumeData} color={resumeData.color} />
      </div>
    </div>
  );
}

export default ResumePreview;