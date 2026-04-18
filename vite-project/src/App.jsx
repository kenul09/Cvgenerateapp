import { useState, useRef, useCallback } from "react";
import ModernCV from "./templates/ModernCV";
import MinimalCV from "./templates/MinimalCV";
import "./App.css";

const REQUIRED_FIELDS = {
  name: "Ad Soyad",
  position: "Vəzifə",
  email: "Email",
  phone: "Telefon",
  location: "Şəhər",
  summary: "Haqqımda",
  skills: "Bacarıqlar",
};

const validate = (data) => {
  const errs = {};
  Object.entries(REQUIRED_FIELDS).forEach(([key, label]) => {
    if (!data[key] || !String(data[key]).trim()) errs[key] = `${label} doldurulmalıdır`;
  });
  if (data.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = "Email formatı düzgün deyil";
  return errs;
};

const F = ({ id, placeholder, required, type = "input", value, onChange, errors, submitted }) => {
  const hasErr = submitted && errors[id];
  return (
    <div className={`field-wrap${hasErr ? " has-error" : ""}`}>
      {type === "textarea"
        ? <textarea
            data-field={id}
            placeholder={placeholder + (required ? " *" : "")}
            value={value || ""}
            onChange={(e) => onChange(id, e.target.value)}
          />
        : <input
            data-field={id}
            placeholder={placeholder + (required ? " *" : "")}
            value={value || ""}
            onChange={(e) => onChange(id, e.target.value)}
          />}
      {hasErr && <span className="error-msg">{errors[id]}</span>}
    </div>
  );
};

function App() {
  const cvRef = useRef();
  const fileInputRef = useRef();
  const [template, setTemplate] = useState("modern");
  const [style, setStyle] = useState("blue");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [cv, setCv] = useState(() => ({
    name: "", position: "", location: "", email: "", phone: "",
    summary: "", skills: "", languages: "", image: null,
    socials: { instagram: "", github: "", linkedin: "", facebook: "" },
    education: [{ id: crypto.randomUUID(), school: "", degree: "", year: "" }],
    experience: [{ id: crypto.randomUUID(), company: "", role: "", date: "" }],
    projects: [{ id: crypto.randomUUID(), name: "", description: "" }],
  }));

  const setField = useCallback((field, value) => {
    setCv((prev) => {
      const next = { ...prev, [field]: value };
      if (submitted) setErrors(validate(next));
      return next;
    });
  }, [submitted]);

  const setSocial = useCallback((field, value) => {
    setCv(prev => ({
      ...prev,
      socials: { ...prev.socials, [field]: value }
    }));
  }, []);

  const updateArray = useCallback((key, index, field, value) => {
    setCv((prev) => {
      const arr = [...prev[key]];
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [key]: arr };
    });
  }, []);

  const addItem = useCallback((key, item) =>
    setCv((prev) => ({ ...prev, [key]: [...prev[key], item] })), []);

  const removeItem = useCallback((key, index) =>
    setCv((prev) => {
      if (prev[key].length === 1) return prev;
      return { ...prev, [key]: prev[key].filter((_, i) => i !== index) };
    }), []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setField("image", ev.target.result);
    reader.readAsDataURL(file);
  };

  const downloadPDF = async () => {
    setSubmitted(true);
    const errs = validate(cv);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const el = document.querySelector(`[data-field="${Object.keys(errs)[0]}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(cvRef.current, {
        scale: 1.5, useCORS: true, backgroundColor: "#ffffff", logging: false,
      });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      pdf.addImage(
        canvas.toDataURL("image/png"), "PNG", 0, 0,
        imgWidth, (canvas.height * imgWidth) / canvas.width
      );
      pdf.save(`${cv.name}_CV.pdf`);
    } catch {
      alert("PDF xətası. npm install html2canvas jspdf");
    }
    setLoading(false);
  };

  const fProps = { errors, submitted, onChange: setField };

  return (
    <div className={`container ${style}`}>
      <div className="bg-blobs" aria-hidden>
        <div className="blob b1" /><div className="blob b2" /><div className="blob b3" />
        <div className="blob b4" /><div className="blob b5" /><div className="blob b6" />
        <div className="blob b7" /><div className="blob b8" /><div className="blob b9" />
        <div className="blob b10" /><div className="blob b11" /><div className="blob b12" />
        <div className="blob b13" /><div className="blob b14" /><div className="blob b15" />
      </div>

      <div className="form-card">
        <div className="form-header">
          <h2>CV Builder</h2>
          <p>Bütün * sahələri doldurun</p>
        </div>

        <div className="img-upload-wrap" onClick={() => fileInputRef.current.click()}>
          <div className="img-preview">
            {cv.image
              ? <img src={cv.image} alt="avatar" />
              : <div className="img-ph"><span>📷</span><span>Şəkil yüklə</span></div>}
          </div>
          <div className="img-hint">
            <strong>Profil şəkli</strong>
            <span>JPG, PNG — klikləyin</span>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*"
            style={{ display: "none" }} onChange={handleImageUpload} />
        </div>
        {cv.image && (
          <button className="remove-img-btn" onClick={() => setField("image", null)}>
            Şəkli sil
          </button>
        )}

        <div className="section-label">Şəxsi məlumat</div>
        <F id="name" placeholder="Ad Soyad" required value={cv.name} {...fProps} />
        <F id="position" placeholder="Vəzifə" required value={cv.position} {...fProps} />
        <div className="row-2">
          <F id="location" placeholder="Şəhər" required value={cv.location} {...fProps} />
          <F id="phone" placeholder="Telefon" required value={cv.phone} {...fProps} />
        </div>
        <F id="email" placeholder="Email" required value={cv.email} {...fProps} />

        <div className="section-label">Sosial Şəbəkələr</div>
        <div className="row-2">
          <div className="social-input-wrap">
            <span className="social-icon instagram-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <input placeholder="Instagram" value={cv.socials.instagram}
              onChange={(e) => setSocial("instagram", e.target.value)} />
          </div>
          <div className="social-input-wrap">
            <span className="social-icon github-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </span>
            <input placeholder="GitHub" value={cv.socials.github}
              onChange={(e) => setSocial("github", e.target.value)} />
          </div>
        </div>
        <div className="row-2">
          <div className="social-input-wrap">
            <span className="social-icon linkedin-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </span>
            <input placeholder="LinkedIn" value={cv.socials.linkedin}
              onChange={(e) => setSocial("linkedin", e.target.value)} />
          </div>
          <div className="social-input-wrap">
            <span className="social-icon facebook-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </span>
            <input placeholder="Facebook" value={cv.socials.facebook}
              onChange={(e) => setSocial("facebook", e.target.value)} />
          </div>
        </div>

        <div className="section-label">Haqqımda</div>
        <F id="summary" placeholder="Qısa özünütəqdimetmə" type="textarea" required value={cv.summary} {...fProps} />

        <div className="section-label">Bacarıqlar</div>
        <F id="skills" placeholder="React, Python, Figma (vergüllə ayır)" required value={cv.skills} {...fProps} />

        <div className="section-label">Dillər</div>
        <div className="field-wrap">
          <input placeholder="Azərbaycan, İngilis, Rus" value={cv.languages}
            onChange={(e) => setField("languages", e.target.value)} />
        </div>

        <div className="section-label">Təcrübə</div>
        {cv.experience.map((exp, i) => (
          <div key={exp.id} className="block">
            <input placeholder="Şirkət" value={exp.company}
              onChange={(e) => updateArray("experience", i, "company", e.target.value)} />
            <input placeholder="Vəzifə" value={exp.role}
              onChange={(e) => updateArray("experience", i, "role", e.target.value)} />
            <input placeholder="Tarix (2022–2024)" value={exp.date}
              onChange={(e) => updateArray("experience", i, "date", e.target.value)} />
            <button className="remove-btn" onClick={() => removeItem("experience", i)}>Sil</button>
          </div>
        ))}
        <button className="add-btn" onClick={() =>
          addItem("experience", { id: crypto.randomUUID(), company: "", role: "", date: "" })}>
          + Təcrübə əlavə et
        </button>

        <div className="section-label">Təhsil</div>
        {cv.education.map((edu, i) => (
          <div key={edu.id} className="block">
            <input placeholder="Universitet" value={edu.school}
              onChange={(e) => updateArray("education", i, "school", e.target.value)} />
            <input placeholder="İxtisas" value={edu.degree}
              onChange={(e) => updateArray("education", i, "degree", e.target.value)} />
            <input placeholder="İl" value={edu.year}
              onChange={(e) => updateArray("education", i, "year", e.target.value)} />
            <button className="remove-btn" onClick={() => removeItem("education", i)}>Sil</button>
          </div>
        ))}
        <button className="add-btn" onClick={() =>
          addItem("education", { id: crypto.randomUUID(), school: "", degree: "", year: "" })}>
          + Təhsil əlavə et
        </button>

        <div className="section-label">Layihələr</div>
        {cv.projects.map((p, i) => (
          <div key={p.id} className="block">
            <input placeholder="Layihənin adı" value={p.name}
              onChange={(e) => updateArray("projects", i, "name", e.target.value)} />
            <textarea placeholder="Təsvir" value={p.description}
              onChange={(e) => updateArray("projects", i, "description", e.target.value)} />
            <button className="remove-btn" onClick={() => removeItem("projects", i)}>Sil</button>
          </div>
        ))}
        <button className="add-btn" onClick={() =>
          addItem("projects", { id: crypto.randomUUID(), name: "", description: "" })}>
          + Layihə əlavə et
        </button>

        <div className="section-label">Rəng</div>
        <div className="theme-switch">
          {[["blue","🔵 Mavi"],["dark","⚫ Tünd"],["clean","🟢 Yaşıl"],["rose","🔴 Qırmızı"]].map(([v, l]) => (
            <button key={v} className={`theme-btn${style === v ? " active" : ""}`}
              onClick={() => setStyle(v)}>{l}</button>
          ))}
        </div>

        <div className="section-label">Şablon</div>
        <div className="theme-switch">
          {[["modern","✦ Modern"],["minimal","◈ Executive"]].map(([v, l]) => (
            <button key={v} className={`theme-btn${template === v ? " active" : ""}`}
              onClick={() => setTemplate(v)}>{l}</button>
          ))}
        </div>

        <button className="download-btn" onClick={downloadPDF} disabled={loading}>
          {loading ? "⏳ Hazırlanır..." : "🚀 CV Yüklə (PDF)"}
        </button>
      </div>

      <div className="preview-card">
        <div className="preview-label">Önizləmə</div>
        <div ref={cvRef}>
          {template === "minimal"
            ? <MinimalCV cv={cv} style={style} />
            : <ModernCV cv={cv} style={style} />}
        </div>
      </div>
    </div>
  );
}

export default App;