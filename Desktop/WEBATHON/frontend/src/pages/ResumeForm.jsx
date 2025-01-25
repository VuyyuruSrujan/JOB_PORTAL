import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaGraduationCap, FaLaptopCode, FaPalette, FaChartLine, FaUserMd } from 'react-icons/fa';
import './ResumeForm.css';

const roleTemplates = {
  developer: {
    icon: <FaLaptopCode />,
    color: '#4b6eff',
    sections: ['Technical Skills', 'Projects', 'Work Experience', 'Education'],
    template: 'modern'
  },
  designer: {
    icon: <FaPalette />,
    color: '#ff4b82',
    sections: ['Design Skills', 'Portfolio', 'Work Experience', 'Education'],
    template: 'creative'
  },
  business: {
    icon: <FaChartLine />,
    color: '#2ecc71',
    sections: ['Professional Summary', 'Work Experience', 'Skills', 'Education'],
    template: 'professional'
  },
  medical: {
    icon: <FaUserMd />,
    color: '#3498db',
    sections: ['Clinical Experience', 'Certifications', 'Education', 'Skills'],
    template: 'classic'
  }
};

function ResumeForm() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      github: '',
      role: ''
    },
    education: [{
      school: '',
      degree: '',
      year: '',
      gpa: ''
    }],
    experience: [{
      company: '',
      position: '',
      duration: '',
      description: ''
    }],
    skills: [''],
    projects: [{
      name: '',
      description: '',
      technologies: ''
    }],
    template: 'modern',
    color: '#4b6eff',
  });

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, role },
      template: roleTemplates[role].template,
      color: roleTemplates[role].color
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('resumeData', JSON.stringify(formData));
    navigate('/preview');
  };

  const handleChange = (section, index, field, value) => {
    const newFormData = { ...formData };
    if (Array.isArray(newFormData[section])) {
      newFormData[section][index][field] = value;
    } else if (section === 'personalInfo') {
      newFormData.personalInfo[field] = value;
    } else {
      newFormData[section] = value;
    }
    setFormData(newFormData);
  };

  const addField = (section) => {
    const newFormData = { ...formData };
    if (section === 'education') {
      newFormData.education.push({ school: '', degree: '', year: '', gpa: '' });
    } else if (section === 'experience') {
      newFormData.experience.push({ company: '', position: '', duration: '', description: '' });
    } else if (section === 'skills') {
      newFormData.skills.push('');
    } else if (section === 'projects') {
      newFormData.projects.push({ name: '', description: '', technologies: '' });
    }
    setFormData(newFormData);
  };

  return (
    <div className="resume-form">
      <h1>Resume Builder</h1>
      
      <div className="role-selector">
        <h2><FaBriefcase /> Select Your Role</h2>
        <div className="role-buttons">
          {Object.entries(roleTemplates).map(([role, { icon, color }]) => (
            <button
              key={role}
              className={`role-button ${selectedRole === role ? 'selected' : ''}`}
              style={{ '--role-color': color }}
              onClick={() => handleRoleChange(role)}
            >
              {icon}
              <span>{role.charAt(0).toUpperCase() + role.slice(1)}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2><FaGraduationCap /> Personal Information</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.personalInfo.name}
            onChange={(e) => handleChange('personalInfo', 0, 'name', e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.personalInfo.email}
            onChange={(e) => handleChange('personalInfo', 0, 'email', e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.personalInfo.phone}
            onChange={(e) => handleChange('personalInfo', 0, 'phone', e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.personalInfo.address}
            onChange={(e) => handleChange('personalInfo', 0, 'address', e.target.value)}
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.personalInfo.linkedin}
            onChange={(e) => handleChange('personalInfo', 0, 'linkedin', e.target.value)}
          />
          <input
            type="text"
            placeholder="GitHub URL"
            value={formData.personalInfo.github}
            onChange={(e) => handleChange('personalInfo', 0, 'github', e.target.value)}
          />
        </div>

        <div className="form-section">
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="School/University"
                value={edu.school}
                onChange={(e) => handleChange('education', index, 'school', e.target.value)}
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleChange('education', index, 'degree', e.target.value)}
              />
              <input
                type="text"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleChange('education', index, 'year', e.target.value)}
              />
              <input
                type="text"
                placeholder="GPA"
                value={edu.gpa}
                onChange={(e) => handleChange('education', index, 'gpa', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addField('education')}>Add Education</button>
        </div>

        <div className="form-section">
          <h2>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="Company"
                value={exp.company}
                onChange={(e) => handleChange('experience', index, 'company', e.target.value)}
              />
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleChange('experience', index, 'position', e.target.value)}
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleChange('experience', index, 'duration', e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleChange('experience', index, 'description', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addField('experience')}>Add Experience</button>
        </div>

        <div className="form-section">
          <h2>Skills</h2>
          {formData.skills.map((skill, index) => (
            <input
              key={index}
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => {
                const newSkills = [...formData.skills];
                newSkills[index] = e.target.value;
                setFormData({ ...formData, skills: newSkills });
              }}
            />
          ))}
          <button type="button" onClick={() => addField('skills')}>Add Skill</button>
        </div>

        <div className="form-section">
          <h2>Projects</h2>
          {formData.projects.map((project, index) => (
            <div key={index} className="form-group">
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => handleChange('projects', index, 'name', e.target.value)}
              />
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleChange('projects', index, 'description', e.target.value)}
              />
              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => handleChange('projects', index, 'technologies', e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addField('projects')}>Add Project</button>
        </div>

        <div className="form-section">
          <h2>Template & Color</h2>
          <select
            value={formData.template}
            onChange={(e) => handleChange('template', 0, '', e.target.value)}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
            <option value="creative">Creative</option>
          </select>
          <input
            type="color"
            value={formData.color}
            onChange={(e) => handleChange('color', 0, '', e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">Preview Resume</button>
      </form>
    </div>
  );
}

export default ResumeForm;