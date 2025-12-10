import { useState } from 'react';
import {
    User,
    Briefcase,
    GraduationCap,
    Wrench,
    FolderOpen,
    Award,
    Languages,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    Upload,
    HelpCircle,
} from 'lucide-react';

// Input component with NA support
function FormInput({ label, value, onChange, placeholder, type = 'text', hint }) {
    const isNA = value?.toLowerCase() === 'na';

    return (
        <div className="relative">
            <label className="input-label flex items-center gap-2">
                {label}
                {hint && (
                    <span className="group relative">
                        <HelpCircle className="w-3.5 h-3.5 text-dark-500 cursor-help" />
                        <span className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-dark-800 text-xs text-dark-300 rounded hidden group-hover:block whitespace-nowrap z-10">
                            {hint}
                        </span>
                    </span>
                )}
            </label>
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={`input-field ${isNA ? 'opacity-50 line-through' : ''}`}
            />
            {isNA && (
                <span className="absolute right-3 top-9 text-xs text-amber-500">Will be hidden</span>
            )}
        </div>
    );
}

// Textarea component
function FormTextArea({ label, value, onChange, placeholder, rows = 3, hint }) {
    const isNA = value?.toLowerCase() === 'na';

    return (
        <div className="relative">
            <label className="input-label flex items-center gap-2">
                {label}
                {hint && (
                    <span className="group relative">
                        <HelpCircle className="w-3.5 h-3.5 text-dark-500 cursor-help" />
                        <span className="absolute bottom-full left-0 mb-1 px-2 py-1 bg-dark-800 text-xs text-dark-300 rounded hidden group-hover:block whitespace-nowrap z-10">
                            {hint}
                        </span>
                    </span>
                )}
            </label>
            <textarea
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={`input-field resize-none ${isNA ? 'opacity-50 line-through' : ''}`}
            />
            {isNA && (
                <span className="absolute right-3 top-9 text-xs text-amber-500">Will be hidden</span>
            )}
        </div>
    );
}

// Section wrapper with collapsible functionality
function Section({ title, icon: Icon, children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="glass-card p-6 animate-slide-up">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between mb-4"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                </div>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-dark-400" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-dark-400" />
                )}
            </button>
            {isOpen && <div className="space-y-4">{children}</div>}
        </div>
    );
}

// Array item card with delete
function ArrayItemCard({ children, onDelete, title }) {
    return (
        <div className="glass-card-light p-4 relative">
            <button
                onClick={onDelete}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
            {title && <h4 className="font-medium mb-3 pr-8">{title}</h4>}
            <div className="grid gap-4">{children}</div>
        </div>
    );
}

function ResumeForm({ resume, onChange, onPhotoUpload }) {
    // Helper to update personal info
    const updatePersonalInfo = (field, value) => {
        onChange('personalInfo', {
            ...resume.personalInfo,
            [field]: value,
        });
    };

    // Helper to update array items
    const updateArrayItem = (section, index, field, value) => {
        const items = [...resume[section]];
        items[index] = { ...items[index], [field]: value };
        onChange(section, items);
    };

    // Helper to add new array item
    const addArrayItem = (section, template) => {
        onChange(section, [...resume[section], template]);
    };

    // Helper to remove array item
    const removeArrayItem = (section, index) => {
        const items = resume[section].filter((_, i) => i !== index);
        onChange(section, items);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                return;
            }
            onPhotoUpload(file);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Hint Banner */}
            <div className="glass-card-light p-4 flex items-start gap-3 text-sm">
                <HelpCircle className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-dark-400">
                    <strong className="text-dark-300">Tip:</strong> Enter "NA" in any field to exclude it from your final resume.
                    This helps keep your resume clean and focused on what matters.
                </p>
            </div>

            {/* Personal Info */}
            <Section title="Personal Information" icon={User} defaultOpen={true}>
                {/* Photo Upload */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-dark-700 flex items-center justify-center">
                            {resume.personalInfo.photo ? (
                                <img
                                    src={resume.personalInfo.photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-8 h-8 text-dark-500" />
                            )}
                        </div>
                        <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-600 transition-colors">
                            <Upload className="w-4 h-4" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <div className="text-sm text-dark-400">
                        <p>Upload a professional photo</p>
                        <p className="text-xs">Max 5MB, JPG/PNG/WebP</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                        label="Full Name"
                        value={resume.personalInfo.fullName}
                        onChange={(v) => updatePersonalInfo('fullName', v)}
                        placeholder="John Doe"
                    />
                    <FormInput
                        label="Email"
                        type="email"
                        value={resume.personalInfo.email}
                        onChange={(v) => updatePersonalInfo('email', v)}
                        placeholder="john@example.com"
                    />
                    <FormInput
                        label="Phone"
                        value={resume.personalInfo.phone}
                        onChange={(v) => updatePersonalInfo('phone', v)}
                        placeholder="+1 (555) 123-4567"
                    />
                    <FormInput
                        label="Location"
                        value={resume.personalInfo.location}
                        onChange={(v) => updatePersonalInfo('location', v)}
                        placeholder="New York, NY"
                    />
                    <FormInput
                        label="LinkedIn"
                        value={resume.personalInfo.linkedin}
                        onChange={(v) => updatePersonalInfo('linkedin', v)}
                        placeholder="linkedin.com/in/johndoe"
                        hint="Enter NA to hide"
                    />
                    <FormInput
                        label="Website/Portfolio"
                        value={resume.personalInfo.website}
                        onChange={(v) => updatePersonalInfo('website', v)}
                        placeholder="johndoe.com"
                        hint="Enter NA to hide"
                    />
                </div>
                <FormTextArea
                    label="Professional Summary"
                    value={resume.personalInfo.summary}
                    onChange={(v) => updatePersonalInfo('summary', v)}
                    placeholder="Brief summary of your professional background and career objectives..."
                    rows={4}
                    hint="Enter NA to hide this section"
                />
            </Section>

            {/* Experience */}
            <Section title="Work Experience" icon={Briefcase}>
                {resume.experience.map((exp, index) => (
                    <ArrayItemCard
                        key={index}
                        title={exp.position || exp.company || `Experience ${index + 1}`}
                        onDelete={() => removeArrayItem('experience', index)}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormInput
                                label="Company"
                                value={exp.company}
                                onChange={(v) => updateArrayItem('experience', index, 'company', v)}
                                placeholder="Company Name"
                            />
                            <FormInput
                                label="Position"
                                value={exp.position}
                                onChange={(v) => updateArrayItem('experience', index, 'position', v)}
                                placeholder="Software Engineer"
                            />
                            <FormInput
                                label="Location"
                                value={exp.location}
                                onChange={(v) => updateArrayItem('experience', index, 'location', v)}
                                placeholder="City, Country"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormInput
                                    label="Start Date"
                                    value={exp.startDate}
                                    onChange={(v) => updateArrayItem('experience', index, 'startDate', v)}
                                    placeholder="Jan 2020"
                                />
                                <FormInput
                                    label="End Date"
                                    value={exp.endDate}
                                    onChange={(v) => updateArrayItem('experience', index, 'endDate', v)}
                                    placeholder="Present"
                                />
                            </div>
                        </div>
                        <FormTextArea
                            label="Description"
                            value={exp.description}
                            onChange={(v) => updateArrayItem('experience', index, 'description', v)}
                            placeholder="Describe your responsibilities and achievements..."
                            rows={3}
                        />
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() =>
                        addArrayItem('experience', {
                            company: '',
                            position: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            description: '',
                        })
                    }
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Experience
                </button>
            </Section>

            {/* Education */}
            <Section title="Education" icon={GraduationCap}>
                {resume.education.map((edu, index) => (
                    <ArrayItemCard
                        key={index}
                        title={edu.institution || `Education ${index + 1}`}
                        onDelete={() => removeArrayItem('education', index)}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormInput
                                label="Institution"
                                value={edu.institution}
                                onChange={(v) => updateArrayItem('education', index, 'institution', v)}
                                placeholder="University Name"
                            />
                            <FormInput
                                label="Degree"
                                value={edu.degree}
                                onChange={(v) => updateArrayItem('education', index, 'degree', v)}
                                placeholder="Bachelor of Science"
                            />
                            <FormInput
                                label="Field of Study"
                                value={edu.field}
                                onChange={(v) => updateArrayItem('education', index, 'field', v)}
                                placeholder="Computer Science"
                            />
                            <FormInput
                                label="Location"
                                value={edu.location}
                                onChange={(v) => updateArrayItem('education', index, 'location', v)}
                                placeholder="City, Country"
                            />
                            <div className="grid grid-cols-2 gap-2">
                                <FormInput
                                    label="Start Year"
                                    value={edu.startDate}
                                    onChange={(v) => updateArrayItem('education', index, 'startDate', v)}
                                    placeholder="2016"
                                />
                                <FormInput
                                    label="End Year"
                                    value={edu.endDate}
                                    onChange={(v) => updateArrayItem('education', index, 'endDate', v)}
                                    placeholder="2020"
                                />
                            </div>
                            <FormInput
                                label="GPA"
                                value={edu.gpa}
                                onChange={(v) => updateArrayItem('education', index, 'gpa', v)}
                                placeholder="3.8/4.0"
                                hint="Enter NA to hide"
                            />
                        </div>
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() =>
                        addArrayItem('education', {
                            institution: '',
                            degree: '',
                            field: '',
                            location: '',
                            startDate: '',
                            endDate: '',
                            gpa: '',
                        })
                    }
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Education
                </button>
            </Section>

            {/* Skills */}
            <Section title="Skills" icon={Wrench}>
                {resume.skills.map((skill, index) => (
                    <ArrayItemCard
                        key={index}
                        title={skill.category || `Skill Category ${index + 1}`}
                        onDelete={() => removeArrayItem('skills', index)}
                    >
                        <div className="grid gap-4">
                            <FormInput
                                label="Category"
                                value={skill.category}
                                onChange={(v) => updateArrayItem('skills', index, 'category', v)}
                                placeholder="Programming Languages"
                            />
                            <FormInput
                                label="Skills (comma-separated)"
                                value={skill.items}
                                onChange={(v) => updateArrayItem('skills', index, 'items', v)}
                                placeholder="JavaScript, Python, React, Node.js"
                            />
                        </div>
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() => addArrayItem('skills', { category: '', items: '' })}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Skill Category
                </button>
            </Section>

            {/* Projects */}
            <Section title="Projects" icon={FolderOpen} defaultOpen={false}>
                {resume.projects.map((project, index) => (
                    <ArrayItemCard
                        key={index}
                        title={project.name || `Project ${index + 1}`}
                        onDelete={() => removeArrayItem('projects', index)}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormInput
                                label="Project Name"
                                value={project.name}
                                onChange={(v) => updateArrayItem('projects', index, 'name', v)}
                                placeholder="Project Name"
                            />
                            <FormInput
                                label="Link"
                                value={project.link}
                                onChange={(v) => updateArrayItem('projects', index, 'link', v)}
                                placeholder="github.com/username/project"
                                hint="Enter NA to hide"
                            />
                            <div className="md:col-span-2">
                                <FormInput
                                    label="Technologies"
                                    value={project.technologies}
                                    onChange={(v) => updateArrayItem('projects', index, 'technologies', v)}
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                        </div>
                        <FormTextArea
                            label="Description"
                            value={project.description}
                            onChange={(v) => updateArrayItem('projects', index, 'description', v)}
                            placeholder="Brief description of the project..."
                            rows={2}
                        />
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() =>
                        addArrayItem('projects', {
                            name: '',
                            description: '',
                            technologies: '',
                            link: '',
                        })
                    }
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </Section>

            {/* Certifications */}
            <Section title="Certifications" icon={Award} defaultOpen={false}>
                {resume.certifications.map((cert, index) => (
                    <ArrayItemCard
                        key={index}
                        title={cert.name || `Certification ${index + 1}`}
                        onDelete={() => removeArrayItem('certifications', index)}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormInput
                                label="Certification Name"
                                value={cert.name}
                                onChange={(v) => updateArrayItem('certifications', index, 'name', v)}
                                placeholder="AWS Certified Developer"
                            />
                            <FormInput
                                label="Issuing Organization"
                                value={cert.issuer}
                                onChange={(v) => updateArrayItem('certifications', index, 'issuer', v)}
                                placeholder="Amazon Web Services"
                            />
                            <FormInput
                                label="Date"
                                value={cert.date}
                                onChange={(v) => updateArrayItem('certifications', index, 'date', v)}
                                placeholder="Dec 2023"
                            />
                            <FormInput
                                label="Credential Link"
                                value={cert.link}
                                onChange={(v) => updateArrayItem('certifications', index, 'link', v)}
                                placeholder="credential.url"
                                hint="Enter NA to hide"
                            />
                        </div>
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() =>
                        addArrayItem('certifications', {
                            name: '',
                            issuer: '',
                            date: '',
                            link: '',
                        })
                    }
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Certification
                </button>
            </Section>

            {/* Languages */}
            <Section title="Languages" icon={Languages} defaultOpen={false}>
                {resume.languages.map((lang, index) => (
                    <ArrayItemCard
                        key={index}
                        title={lang.language || `Language ${index + 1}`}
                        onDelete={() => removeArrayItem('languages', index)}
                    >
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormInput
                                label="Language"
                                value={lang.language}
                                onChange={(v) => updateArrayItem('languages', index, 'language', v)}
                                placeholder="English"
                            />
                            <FormInput
                                label="Proficiency"
                                value={lang.proficiency}
                                onChange={(v) => updateArrayItem('languages', index, 'proficiency', v)}
                                placeholder="Native / Fluent / Intermediate"
                            />
                        </div>
                    </ArrayItemCard>
                ))}
                <button
                    onClick={() => addArrayItem('languages', { language: '', proficiency: '' })}
                    className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Language
                </button>
            </Section>
        </div>
    );
}

export default ResumeForm;
