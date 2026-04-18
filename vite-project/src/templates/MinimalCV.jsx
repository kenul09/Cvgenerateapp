// Sosial şəbəkə ikonları
const SocialIcons = {
  instagram: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  github: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  facebook: (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

export default function MinimalCV({ cv, style }) {
  const skills = (cv.skills || "").split(/[,،]+/).map(s => s.trim()).filter(Boolean);

  const accents = { blue: "#1e4fa8", dark: "#312e81", clean: "#0f766e", rose: "#9f1239" };
  const lights  = { blue: "#dbeafe", dark: "#e0e7ff", clean: "#d1fae5", rose: "#ffe4e6" };
  const acc = accents[style] || accents.blue;
  const lt  = lights[style]  || lights.blue;

  const hasSocials = cv.socials && Object.values(cv.socials).some(v => v?.trim());

  return (
    <div className="cv-exec">
      {/* ── TOP HEADER BANNER ── */}
      <div className="ce-header" style={{ background: acc }}>
        <div className="ce-header-left">
          <div className="ce-avatar">
            {cv.image
              ? <img src={cv.image} alt="avatar" />
              : <span>{(cv.name || "?")[0].toUpperCase()}</span>}
          </div>
          <div>
            <div className="ce-name">{cv.name || "Adınız"}</div>
            <div className="ce-pos">{cv.position || "Vəzifəniz"}</div>
          </div>
        </div>
        <div className="ce-header-right">
          {cv.location && <div className="ce-meta">⌖ {cv.location}</div>}
          {cv.email    && <div className="ce-meta">@ {cv.email}</div>}
          {cv.phone    && <div className="ce-meta">✆ {cv.phone}</div>}
          {/* Sosial şəbəkələr header-da ikonlu */}
          {hasSocials && Object.entries(cv.socials).map(([key, val]) =>
            val?.trim() ? (
              <div key={key} className="ce-meta ce-social-meta">
                <span className="ce-social-icon">{SocialIcons[key]}</span>
                <span>{val.trim()}</span>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* ── SKILLS BAR ── */}
      {skills.length > 0 && (
        <div className="ce-skillbar" style={{ background: lt }}>
          <span className="ce-skillbar-label" style={{ color: acc }}>Bacarıqlar</span>
          <div className="ce-skillbar-tags">
            {skills.map((s, i) =>
              <span key={i} className="ce-stag" style={{ background: acc }}>{s}</span>)}
          </div>
        </div>
      )}

      {/* ── BODY: 2 COLUMNS ── */}
      <div className="ce-body">
        {/* LEFT COL */}
        <div className="ce-col-left">
          {cv.summary && (
            <div className="ce-block">
              <div className="ce-block-title" style={{ color: acc }}>
                <span className="ce-dot" style={{ background: acc }} />Haqqımda
              </div>
              <p className="ce-text">{cv.summary}</p>
            </div>
          )}

          {cv.experience?.some(e => e.company || e.role) && (
            <div className="ce-block">
              <div className="ce-block-title" style={{ color: acc }}>
                <span className="ce-dot" style={{ background: acc }} />Təcrübə
              </div>
              {cv.experience.filter(e => e.company || e.role).map(exp => (
                <div key={exp.id} className="ce-timeline-item">
                  <div className="ce-tl-marker">
                    <div className="ce-tl-inner" style={{ borderColor: acc, background: acc }} />
                  </div>
                  <div className="ce-tl-body">
                    {exp.date && <div className="ce-tl-date">{exp.date}</div>}
                    <div className="ce-tl-title">{exp.role}</div>
                    <div className="ce-tl-co" style={{ color: acc }}>{exp.company}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT COL */}
        <div className="ce-col-right">
          {cv.education?.some(e => e.school || e.degree) && (
            <div className="ce-block">
              <div className="ce-block-title" style={{ color: acc }}>
                <span className="ce-dot" style={{ background: acc }} />Təhsil
              </div>
              {cv.education.filter(e => e.school || e.degree).map(edu => (
                <div key={edu.id} className="ce-edu-card" style={{ borderLeftColor: acc }}>
                  <div className="ce-edu-title">{edu.degree}</div>
                  <div className="ce-edu-school">{edu.school}</div>
                  {edu.year && <div className="ce-edu-year" style={{ color: acc }}>{edu.year}</div>}
                </div>
              ))}
            </div>
          )}

          {cv.languages && (
            <div className="ce-block">
              <div className="ce-block-title" style={{ color: acc }}>
                <span className="ce-dot" style={{ background: acc }} />Dillər
              </div>
              {cv.languages.split(/[,،]+/).map((l, i) => (
                <div key={i} className="ce-lang-row">
                  <span className="ce-lang-dot" style={{ background: acc }} />
                  {l.trim()}
                </div>
              ))}
            </div>
          )}

          {cv.projects?.some(p => p.name) && (
            <div className="ce-block">
              <div className="ce-block-title" style={{ color: acc }}>
                <span className="ce-dot" style={{ background: acc }} />Layihələr
              </div>
              {cv.projects.filter(p => p.name).map(p => (
                <div key={p.id} className="ce-proj" style={{ background: lt }}>
                  <div className="ce-proj-name" style={{ color: acc }}>{p.name}</div>
                  {p.description && <div className="ce-proj-desc">{p.description}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}