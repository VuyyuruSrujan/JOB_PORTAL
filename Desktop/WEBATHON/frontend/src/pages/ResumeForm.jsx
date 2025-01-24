import { useState } from 'react';
import './ResumeForm.css';

function ResumeForm({ data, onFormChange }) {
  const [formData, setFormData] = useState(data);

  const handleChange = (e, field) => {
    const updatedData = { ...formData, [field]: e.target.value };
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  const handleArrayChange = (index, field, subField, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = { ...updatedArray[index], [subField]: value };
    const updatedData = { ...formData, [field]: updatedArray };
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  const addArrayItem = (field) => {
    const updatedData = {
      ...formData,
      [field]: [...formData[field], field === 'education' ? {
        degree: '',
        school: '',
        year: ''
      } : {
        position: '',
        company: '',
        duration: '',
        description: ''
      }]
    };
    setFormData(updatedData);
    onFormChange(updatedData);
  };

  return (
    <div className="resume-form">
      <h2>Personal Information</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => handleChange(e, 'fullName')}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => handleChange(e, 'email')}
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => handleChange(e, 'phone')}
      />
      <input
        type="text"
        placeholder="Address"
        value={formData.address}
        onChange={(e) => handleChange(e, 'address')}
      />
      <textarea
        placeholder="Professional Summary"
        value={formData.summary}
        onChange={(e) => handleChange(e, 'summary')}
      />

      <h2>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="array-item">
          <input
            type="text"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleArrayChange(index, 'education', 'degree', e.target.value)}
          />
          <input
            type="text"
            placeholder="School"
            value={edu.school}
            onChange={(e) => handleArrayChange(index, 'education', 'school', e.target.value)}
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => handleArrayChange(index, 'education', 'year', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('education')}>
        Add Education
      </button>

      <h2>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index} className="array-item">
          <input
            type="text"
            placeholder="Position"
            value={exp.position}
            onChange={(e) => handleArrayChange(index, 'experience', 'position', e.target.value)}
          />
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleArrayChange(index, 'experience', 'company', e.target.value)}
          />
          <input
            type="text"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => handleArrayChange(index, 'experience', 'duration', e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => handleArrayChange(index, 'experience', 'description', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('experience')}>
        Add Experience
      </button>

      <h2>Skills</h2>
      <textarea
        placeholder="Skills (comma separated)"
        value={formData.skills}
        onChange={(e) => handleChange(e, 'skills')}
      />
    </div>
  );
}

export default ResumeForm;