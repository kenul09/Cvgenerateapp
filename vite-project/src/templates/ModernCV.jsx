// Sosial şəbəkə ikonları üçün SVG komponentləri
const SocialIcons = {
  instagram: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  github: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  linkedin: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  ),
  facebook: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
};

const SOCIAL_LABELS = {
  instagram: "Instagram",
  github: "GitHub",
  linkedin: "LinkedIn",
  facebook: "Facebook",
};

export default function ModernCV({ cv, style }) {
  const skills = (cv.skills || "").split(/[,،]+/).map(s => s.trim()).filter(Boolean);

  const accents = { blue: "#1e4fa8", dark: "#6366f1", clean: "#0f766e", rose: "#be123c" };
  const acc = accents[style] || accents.blue;

  const hasSocials = cv.socials && Object.values(cv.socials).some(v => v?.trim());

  return (
    <div className={`cv-modern t-${style}`}>
      {/* ── LEFT PANEL ── */}
      <div className="cm-left">
        <div className="cm-avatar">
          {cv.image
            ? <img src={cv.image} alt="avatar" />
            : <span>{(cv.name || "?")[0].toUpperCase()}</span>}
        </div>
        <div className="cm-name">{cv.name || "Adınız"}</div>
        <div className="cm-pos">{cv.position || "Vəzifəniz"}</div>

        <div className="cm-sep" />

        <div className="cm-sl">Əlaqə</div>
        {cv.location && <div className="cm-ci"><i>⌖</i><span>{cv.location}</span></div>}
        {cv.email    && <div className="cm-ci"><i>@</i><span>{cv.email}</span></div>}
        {cv.phone    && <div className="cm-ci"><i>✆</i><span>{cv.phone}</span></div>}

        {/* Sosial şəbəkələr — ikonlu */}
        {hasSocials && (
          <>
            <div className="cm-sep" />
            <div className="cm-sl">Sosial</div>
            {Object.entries(cv.socials).map(([key, val]) =>
              val?.trim() ? (
                <div key={key} className="cm-ci cm-social-row">
                  <span className="cm-social-icon">{SocialIcons[key]}</span>
                  <span>{val.trim()}</span>
                </div>
              ) : null
            )}
          </>
        )}

        {skills.length > 0 && (
          <>
            <div className="cm-sep" />
            <div className="cm-sl">Bacarıqlar</div>
            <div className="cm-tags">
              {skills.map((s, i) => <span key={i} className="cm-tag">{s}</span>)}
            </div>
          </>
        )}

        {cv.languages && (
          <>
            <div className="cm-sep" />
            <div className="cm-sl">Dillər</div>
            {cv.languages.split(/[,،]+/).map((l, i) =>
              <div key={i} className="cm-ci"><i>◆</i><span>{l.trim()}</span></div>)}
          </>
        )}
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="cm-right">
        {cv.summary && (
          <div className="cm-section">
            <div className="cm-sh" style={{ color: acc }}>
              <span className="cm-sh-bar" style={{ background: acc }} />Haqqımda
            </div>
            <p className="cm-body">{cv.summary}</p>
          </div>
        )}

        {cv.experience?.some(e => e.company || e.role) && (
          <div className="cm-section">
            <div className="cm-sh" style={{ color: acc }}>
              <span className="cm-sh-bar" style={{ background: acc }} />Təcrübə
            </div>
            {cv.experience.filter(e => e.company || e.role).map(exp => (
              <div key={exp.id} className="cm-card">
                <div className="cm-card-dot" style={{ background: acc }} />
                <div>
                  <div className="cm-card-title">{exp.role}</div>
                  <div className="cm-card-sub" style={{ color: acc }}>{exp.company}</div>
                  {exp.date && <div className="cm-card-date">{exp.date}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {cv.education?.some(e => e.school || e.degree) && (
          <div className="cm-section">
            <div className="cm-sh" style={{ color: acc }}>
              <span className="cm-sh-bar" style={{ background: acc }} />Təhsil
            </div>
            {cv.education.filter(e => e.school || e.degree).map(edu => (
              <div key={edu.id} className="cm-card">
                <div className="cm-card-dot" style={{ background: acc }} />
                <div>
                  <div className="cm-card-title">{edu.degree}</div>
                  <div className="cm-card-sub" style={{ color: acc }}>{edu.school}</div>
                  {edu.year && <div className="cm-card-date">{edu.year}</div>}
                </div>
              </div>
            ))}
          </div>
        )}

        {cv.projects?.some(p => p.name) && (
          <div className="cm-section">
            <div className="cm-sh" style={{ color: acc }}>
              <span className="cm-sh-bar" style={{ background: acc }} />Layihələr
            </div>
            <div className="cm-proj-grid">
              {cv.projects.filter(p => p.name).map(p => (
                <div key={p.id} className="cm-proj" style={{ borderTopColor: acc }}>
                  <div className="cm-proj-name">{p.name}</div>
                  {p.description && <div className="cm-proj-desc">{p.description}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}