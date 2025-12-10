import { forwardRef } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';
import '../styles/templates.css';

// Helper to check if value should be hidden (NA or empty)
const shouldShow = (value) => {
    if (!value) return false;
    if (typeof value === 'string' && value.toLowerCase() === 'na') return false;
    return true;
};

// Helper to filter out NA items from arrays
const filterNA = (items, fields) => {
    return items.filter((item) => {
        // Keep item if at least one important field has a value
        return fields.some((field) => shouldShow(item[field]));
    });
};

// Contact icon component
const ContactIcon = ({ type }) => {
    const iconClass = "w-3 h-3 flex-shrink-0";
    switch (type) {
        case 'email': return <Mail className={iconClass} />;
        case 'phone': return <Phone className={iconClass} />;
        case 'location': return <MapPin className={iconClass} />;
        case 'website': return <Globe className={iconClass} />;
        case 'linkedin': return <Linkedin className={iconClass} />;
        default: return null;
    }
};

// Modern Blue Template
const ModernBlueTemplate = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;

    const filteredExperience = filterNA(experience || [], ['company', 'position']);
    const filteredEducation = filterNA(education || [], ['institution', 'degree']);
    const filteredSkills = filterNA(skills || [], ['category', 'items']);
    const filteredProjects = filterNA(projects || [], ['name']);
    const filteredCertifications = filterNA(certifications || [], ['name']);
    const filteredLanguages = filterNA(languages || [], ['language']);

    return (
        <div className="template-modern-blue resume-container">
            {/* Header */}
            <header className="resume-header">
                {shouldShow(personalInfo?.fullName) && (
                    <h1 className="resume-name">{personalInfo.fullName}</h1>
                )}
                <div className="resume-contact">
                    {shouldShow(personalInfo?.email) && (
                        <span className="resume-contact-item">
                            <ContactIcon type="email" /> {personalInfo.email}
                        </span>
                    )}
                    {shouldShow(personalInfo?.phone) && (
                        <span className="resume-contact-item">
                            <ContactIcon type="phone" /> {personalInfo.phone}
                        </span>
                    )}
                    {shouldShow(personalInfo?.location) && (
                        <span className="resume-contact-item">
                            <ContactIcon type="location" /> {personalInfo.location}
                        </span>
                    )}
                    {shouldShow(personalInfo?.linkedin) && (
                        <span className="resume-contact-item">
                            <ContactIcon type="linkedin" /> {personalInfo.linkedin}
                        </span>
                    )}
                    {shouldShow(personalInfo?.website) && (
                        <span className="resume-contact-item">
                            <ContactIcon type="website" /> {personalInfo.website}
                        </span>
                    )}
                </div>
            </header>

            {/* Summary */}
            {shouldShow(personalInfo?.summary) && (
                <p className="resume-summary">{personalInfo.summary}</p>
            )}

            {/* Experience */}
            {filteredExperience.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Work Experience</h2>
                    {filteredExperience.map((exp, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">{exp.position}</div>
                                    <div className="resume-item-subtitle">
                                        {exp.company}{shouldShow(exp.location) && ` • ${exp.location}`}
                                    </div>
                                </div>
                                {(shouldShow(exp.startDate) || shouldShow(exp.endDate)) && (
                                    <span className="resume-item-date">
                                        {exp.startDate} - {exp.endDate || 'Present'}
                                    </span>
                                )}
                            </div>
                            {shouldShow(exp.description) && (
                                <p className="resume-item-description">{exp.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {filteredEducation.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Education</h2>
                    {filteredEducation.map((edu, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">
                                        {edu.degree}{shouldShow(edu.field) && ` in ${edu.field}`}
                                    </div>
                                    <div className="resume-item-subtitle">
                                        {edu.institution}{shouldShow(edu.location) && ` • ${edu.location}`}
                                        {shouldShow(edu.gpa) && ` • GPA: ${edu.gpa}`}
                                    </div>
                                </div>
                                {(shouldShow(edu.startDate) || shouldShow(edu.endDate)) && (
                                    <span className="resume-item-date">
                                        {edu.startDate} - {edu.endDate}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {filteredSkills.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Skills</h2>
                    {filteredSkills.map((skill, index) => (
                        <div key={index} style={{ marginBottom: '0.5rem' }}>
                            <strong>{skill.category}:</strong> {skill.items}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Projects</h2>
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">{project.name}</div>
                                    {shouldShow(project.technologies) && (
                                        <div className="resume-item-subtitle">{project.technologies}</div>
                                    )}
                                </div>
                                {shouldShow(project.link) && (
                                    <span className="resume-item-date">{project.link}</span>
                                )}
                            </div>
                            {shouldShow(project.description) && (
                                <p className="resume-item-description">{project.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications */}
            {filteredCertifications.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Certifications</h2>
                    {filteredCertifications.map((cert, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">{cert.name}</div>
                                    {shouldShow(cert.issuer) && (
                                        <div className="resume-item-subtitle">{cert.issuer}</div>
                                    )}
                                </div>
                                {shouldShow(cert.date) && (
                                    <span className="resume-item-date">{cert.date}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Languages */}
            {filteredLanguages.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Languages</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {filteredLanguages.map((lang, index) => (
                            <span key={index}>
                                <strong>{lang.language}</strong>
                                {shouldShow(lang.proficiency) && ` - ${lang.proficiency}`}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

// Minimal Black Template
const MinimalBlackTemplate = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;

    const filteredExperience = filterNA(experience || [], ['company', 'position']);
    const filteredEducation = filterNA(education || [], ['institution', 'degree']);
    const filteredSkills = filterNA(skills || [], ['category', 'items']);
    const filteredProjects = filterNA(projects || [], ['name']);
    const filteredCertifications = filterNA(certifications || [], ['name']);
    const filteredLanguages = filterNA(languages || [], ['language']);

    return (
        <div className="template-minimal-black resume-container">
            {/* Header */}
            <header className="resume-header">
                {shouldShow(personalInfo?.fullName) && (
                    <h1 className="resume-name">{personalInfo.fullName}</h1>
                )}
                <div className="resume-contact">
                    {shouldShow(personalInfo?.email) && <span>{personalInfo.email}</span>}
                    {shouldShow(personalInfo?.phone) && <span>{personalInfo.phone}</span>}
                    {shouldShow(personalInfo?.location) && <span>{personalInfo.location}</span>}
                    {shouldShow(personalInfo?.linkedin) && <span>{personalInfo.linkedin}</span>}
                    {shouldShow(personalInfo?.website) && <span>{personalInfo.website}</span>}
                </div>
            </header>

            {/* Summary */}
            {shouldShow(personalInfo?.summary) && (
                <p className="resume-summary">{personalInfo.summary}</p>
            )}

            {/* Experience */}
            {filteredExperience.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Experience</h2>
                    {filteredExperience.map((exp, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">{exp.position}</div>
                                    <div className="resume-item-subtitle">
                                        {exp.company}{shouldShow(exp.location) && `, ${exp.location}`}
                                    </div>
                                </div>
                                {(shouldShow(exp.startDate) || shouldShow(exp.endDate)) && (
                                    <span className="resume-item-date">
                                        {exp.startDate} — {exp.endDate || 'Present'}
                                    </span>
                                )}
                            </div>
                            {shouldShow(exp.description) && (
                                <p className="resume-item-description">{exp.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {filteredEducation.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Education</h2>
                    {filteredEducation.map((edu, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-header">
                                <div>
                                    <div className="resume-item-title">{edu.institution}</div>
                                    <div className="resume-item-subtitle">
                                        {edu.degree}{shouldShow(edu.field) && `, ${edu.field}`}
                                        {shouldShow(edu.gpa) && ` — GPA: ${edu.gpa}`}
                                    </div>
                                </div>
                                {(shouldShow(edu.startDate) || shouldShow(edu.endDate)) && (
                                    <span className="resume-item-date">{edu.startDate} — {edu.endDate}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {filteredSkills.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Skills</h2>
                    {filteredSkills.map((skill, index) => (
                        <div key={index} style={{ marginBottom: '0.375rem' }}>
                            <span style={{ fontWeight: 500 }}>{skill.category}:</span> {skill.items}
                        </div>
                    ))}
                </section>
            )}

            {/* Projects */}
            {filteredProjects.length > 0 && (
                <section className="resume-section">
                    <h2 className="resume-section-title">Projects</h2>
                    {filteredProjects.map((project, index) => (
                        <div key={index} className="resume-item">
                            <div className="resume-item-title">{project.name}</div>
                            {shouldShow(project.technologies) && (
                                <div className="resume-item-subtitle">{project.technologies}</div>
                            )}
                            {shouldShow(project.description) && (
                                <p className="resume-item-description">{project.description}</p>
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* Certifications & Languages in one row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {filteredCertifications.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Certifications</h2>
                        {filteredCertifications.map((cert, index) => (
                            <div key={index} style={{ marginBottom: '0.375rem' }}>
                                <span style={{ fontWeight: 500 }}>{cert.name}</span>
                                {shouldShow(cert.issuer) && ` — ${cert.issuer}`}
                                {shouldShow(cert.date) && ` (${cert.date})`}
                            </div>
                        ))}
                    </section>
                )}

                {filteredLanguages.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Languages</h2>
                        {filteredLanguages.map((lang, index) => (
                            <div key={index} style={{ marginBottom: '0.375rem' }}>
                                <span style={{ fontWeight: 500 }}>{lang.language}</span>
                                {shouldShow(lang.proficiency) && ` — ${lang.proficiency}`}
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

// Classic Left Template
const ClassicLeftTemplate = ({ resume }) => {
    const { personalInfo, experience, education, skills, projects, certifications, languages } = resume;

    const filteredExperience = filterNA(experience || [], ['company', 'position']);
    const filteredEducation = filterNA(education || [], ['institution', 'degree']);
    const filteredSkills = filterNA(skills || [], ['category', 'items']);
    const filteredProjects = filterNA(projects || [], ['name']);
    const filteredCertifications = filterNA(certifications || [], ['name']);
    const filteredLanguages = filterNA(languages || [], ['language']);

    return (
        <div className="template-classic-left resume-container">
            {/* Sidebar */}
            <aside className="resume-sidebar">
                {shouldShow(personalInfo?.photo) && (
                    <img
                        src={personalInfo.photo}
                        alt={personalInfo.fullName}
                        className="resume-photo"
                    />
                )}

                {shouldShow(personalInfo?.fullName) && (
                    <h1 className="resume-name">{personalInfo.fullName}</h1>
                )}

                {/* Contact */}
                <div className="sidebar-section">
                    <h3 className="sidebar-section-title">Contact</h3>
                    {shouldShow(personalInfo?.email) && (
                        <div className="sidebar-item">
                            <Mail className="w-3 h-3" /> {personalInfo.email}
                        </div>
                    )}
                    {shouldShow(personalInfo?.phone) && (
                        <div className="sidebar-item">
                            <Phone className="w-3 h-3" /> {personalInfo.phone}
                        </div>
                    )}
                    {shouldShow(personalInfo?.location) && (
                        <div className="sidebar-item">
                            <MapPin className="w-3 h-3" /> {personalInfo.location}
                        </div>
                    )}
                    {shouldShow(personalInfo?.linkedin) && (
                        <div className="sidebar-item">
                            <Linkedin className="w-3 h-3" /> {personalInfo.linkedin}
                        </div>
                    )}
                    {shouldShow(personalInfo?.website) && (
                        <div className="sidebar-item">
                            <Globe className="w-3 h-3" /> {personalInfo.website}
                        </div>
                    )}
                </div>

                {/* Skills */}
                {filteredSkills.length > 0 && (
                    <div className="sidebar-section">
                        <h3 className="sidebar-section-title">Skills</h3>
                        {filteredSkills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '0.75rem' }}>
                                <div style={{ fontWeight: 500, fontSize: '9pt', marginBottom: '0.25rem' }}>
                                    {skill.category}
                                </div>
                                <div style={{ fontSize: '8pt', opacity: 0.9 }}>{skill.items}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Languages */}
                {filteredLanguages.length > 0 && (
                    <div className="sidebar-section">
                        <h3 className="sidebar-section-title">Languages</h3>
                        {filteredLanguages.map((lang, index) => (
                            <div key={index} className="sidebar-item" style={{ justifyContent: 'space-between' }}>
                                <span>{lang.language}</span>
                                {shouldShow(lang.proficiency) && (
                                    <span style={{ opacity: 0.8, fontSize: '8pt' }}>{lang.proficiency}</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="resume-main">
                {/* Summary */}
                {shouldShow(personalInfo?.summary) && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Profile</h2>
                        <p style={{ fontSize: '10pt', color: '#4b5563' }}>{personalInfo.summary}</p>
                    </section>
                )}

                {/* Experience */}
                {filteredExperience.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Experience</h2>
                        {filteredExperience.map((exp, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-header">
                                    <div>
                                        <div className="resume-item-title">{exp.position}</div>
                                        <div className="resume-item-subtitle">
                                            {exp.company}{shouldShow(exp.location) && ` | ${exp.location}`}
                                        </div>
                                    </div>
                                    {(shouldShow(exp.startDate) || shouldShow(exp.endDate)) && (
                                        <span className="resume-item-date">
                                            {exp.startDate} - {exp.endDate || 'Present'}
                                        </span>
                                    )}
                                </div>
                                {shouldShow(exp.description) && (
                                    <p className="resume-item-description">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {filteredEducation.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Education</h2>
                        {filteredEducation.map((edu, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-header">
                                    <div>
                                        <div className="resume-item-title">{edu.institution}</div>
                                        <div className="resume-item-subtitle">
                                            {edu.degree}{shouldShow(edu.field) && ` in ${edu.field}`}
                                            {shouldShow(edu.gpa) && ` | GPA: ${edu.gpa}`}
                                        </div>
                                    </div>
                                    {(shouldShow(edu.startDate) || shouldShow(edu.endDate)) && (
                                        <span className="resume-item-date">{edu.startDate} - {edu.endDate}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* Projects */}
                {filteredProjects.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Projects</h2>
                        {filteredProjects.map((project, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-title">{project.name}</div>
                                {shouldShow(project.technologies) && (
                                    <div className="resume-item-subtitle">{project.technologies}</div>
                                )}
                                {shouldShow(project.description) && (
                                    <p className="resume-item-description">{project.description}</p>
                                )}
                            </div>
                        ))}
                    </section>
                )}

                {/* Certifications */}
                {filteredCertifications.length > 0 && (
                    <section className="resume-section">
                        <h2 className="resume-section-title">Certifications</h2>
                        {filteredCertifications.map((cert, index) => (
                            <div key={index} className="resume-item">
                                <div className="resume-item-header">
                                    <div>
                                        <div className="resume-item-title">{cert.name}</div>
                                        {shouldShow(cert.issuer) && (
                                            <div className="resume-item-subtitle">{cert.issuer}</div>
                                        )}
                                    </div>
                                    {shouldShow(cert.date) && (
                                        <span className="resume-item-date">{cert.date}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

// Main LivePreview component
const LivePreview = forwardRef(({ resume }, ref) => {
    const templateId = resume?.templateId || 'modern_blue';

    const renderTemplate = () => {
        switch (templateId) {
            case 'minimal_black':
                return <MinimalBlackTemplate resume={resume} />;
            case 'classic_left':
                return <ClassicLeftTemplate resume={resume} />;
            case 'modern_blue':
            default:
                return <ModernBlueTemplate resume={resume} />;
        }
    };

    return (
        <div className="flex justify-center">
            <div
                ref={ref}
                className="shadow-2xl bg-white overflow-hidden"
                style={{
                    width: '210mm',
                    minHeight: '297mm',
                    transform: 'scale(0.7)',
                    transformOrigin: 'top center',
                }}
            >
                {renderTemplate()}
            </div>
        </div>
    );
});

LivePreview.displayName = 'LivePreview';

export default LivePreview;
