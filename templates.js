const TEMPLATES = {
  classic: {
    name: "Classic",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content">
          <header class="resume-header">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <p class="job-title">${data.basics?.label || "Professional"}</p>
            <div class="contact-info">
              ${data.basics?.email ? `<span>${data.basics.email}</span>` : ""}
              ${data.basics?.phone ? `<span>${data.basics.phone}</span>` : ""}
              ${
                data.basics?.location
                  ? `<span>${data.basics.location}</span>`
                  : ""
              }
            </div>
            ${
              data.basics?.summary
                ? `<p class="summary">${data.basics.summary}</p>`
                : ""
            }
          </header>

          ${
            data.work && data.work.length
              ? `
            <section class="resume-section">
              <h2>Experience</h2>
              ${data.work
                .map(
                  (job) => `
                <div class="entry">
                  <div class="entry-header">
                    <h3>${job.position || "Position"}</h3>
                    <span class="date">${formatDate(
                      job.startDate,
                      job.endDate
                    )}</span>
                  </div>
                  <p class="company">${job.name || "Company"}</p>
                  ${job.summary ? `<p>${job.summary}</p>` : ""}
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          ${
            data.education && data.education.length
              ? `
            <section class="resume-section">
              <h2>Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="entry">
                  <div class="entry-header">
                    <h3>${edu.studyType || "Degree"} in ${
                    edu.area || "Field"
                  }</h3>
                    <span class="date">${formatDate(
                      edu.startDate,
                      edu.endDate
                    )}</span>
                  </div>
                  <p class="institution">${edu.institution || "Institution"}</p>
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          ${
            data.skills && data.skills.length
              ? `
            <section class="resume-section">
              <h2>Skills</h2>
              <div class="skills-grid">
                ${data.skills
                  .map(
                    (skill) => `
                  <div class="skill-item">
                    <strong>${skill.name || "Skill"}</strong>
                    <p>${
                      Array.isArray(skill.keywords)
                        ? skill.keywords.join(", ")
                        : skill.keywords || ""
                    }</p>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </section>
          `
              : ""
          }

          ${
            data.projects && data.projects.length
              ? `
            <section class="resume-section">
              <h2>Projects</h2>
              ${data.projects
                .map(
                  (proj) => `
                <div class="entry">
                  <h3>${proj.name || "Project"}</h3>
                  ${proj.description ? `<p>${proj.description}</p>` : ""}
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .resume-header {
          border-bottom: 3px solid #2c3e50;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .resume-header h1 {
          font-size: 28px;
          margin: 0 0 5px 0;
          font-weight: 700;
        }
        .job-title {
          font-size: 14px;
          color: #666;
          margin: 0 0 10px 0;
        }
        .contact-info {
          display: flex;
          gap: 15px;
          font-size: 12px;
          color: #555;
          flex-wrap: wrap;
        }
        .contact-info span {
          border-right: 1px solid #ccc;
          padding-right: 15px;
        }
        .contact-info span:last-child {
          border-right: none;
        }
        .summary {
          font-size: 13px;
          margin-top: 10px;
          line-height: 1.5;
        }
        .resume-section {
          margin-bottom: 25px;
        }
        .resume-section h2 {
          font-size: 16px;
          font-weight: 700;
          border-bottom: 2px solid #2c3e50;
          padding-bottom: 8px;
          margin-bottom: 15px;
        }
        .entry {
          margin-bottom: 15px;
        }
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 10px;
        }
        .entry h3 {
          font-size: 14px;
          margin: 0;
          font-weight: 700;
        }
        .date {
          font-size: 12px;
          color: #888;
          flex-shrink: 0;
        }
        .company, .institution {
          font-size: 13px;
          color: #555;
          margin: 3px 0 8px 0;
          font-style: italic;
        }
        .entry p {
          font-size: 12px;
          margin: 5px 0;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .skill-item {
          padding: 8px;
          background: #f5f5f5;
          border-radius: 4px;
        }
        .skill-item strong {
          font-size: 12px;
          display: block;
        }
        .skill-item p {
          font-size: 11px;
          margin: 3px 0 0 0;
          color: #666;
        }
      `;

      return { html, css };
    },
  },

  modern: {
    name: "Modern",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content modern">
          <div class="sidebar">
            <div class="profile-section">
              <h1>${data.basics?.name || "Your Name"}</h1>
              <p class="subtitle">${data.basics?.label || "Professional"}</p>
              ${
                data.basics?.summary
                  ? `<p class="bio">${data.basics.summary}</p>`
                  : ""
              }
            </div>

            ${
              data.basics?.email || data.basics?.phone || data.basics?.location
                ? `
              <div class="contact-box">
                <h3>Contact</h3>
                ${
                  data.basics?.email
                    ? `<p><strong>Email:</strong> ${data.basics.email}</p>`
                    : ""
                }
                ${
                  data.basics?.phone
                    ? `<p><strong>Phone:</strong> ${data.basics.phone}</p>`
                    : ""
                }
                ${
                  data.basics?.location
                    ? `<p><strong>Location:</strong> ${data.basics.location}</p>`
                    : ""
                }
              </div>
            `
                : ""
            }

            ${
              data.skills && data.skills.length
                ? `
              <div class="skills-box">
                <h3>Skills</h3>
                ${data.skills
                  .map(
                    (skill) => `
                  <div class="skill-tag">
                    <strong>${skill.name || "Skill"}</strong>
                    ${
                      Array.isArray(skill.keywords)
                        ? skill.keywords.slice(0, 2).join(", ")
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>

          <div class="main-content">
            ${
              data.work && data.work.length
                ? `
              <section class="content-section">
                <h2>Experience</h2>
                ${data.work
                  .map(
                    (job) => `
                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>${job.position || "Position"}</h3>
                      <p class="company-name">${job.name || "Company"}</p>
                      <span class="date">${formatDate(
                        job.startDate,
                        job.endDate
                      )}</span>
                      ${
                        job.summary
                          ? `<p class="description">${job.summary}</p>`
                          : ""
                      }
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.education && data.education.length
                ? `
              <section class="content-section">
                <h2>Education</h2>
                ${data.education
                  .map(
                    (edu) => `
                  <div class="timeline-item">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                      <h3>${edu.studyType || "Degree"} in ${
                      edu.area || "Field"
                    }</h3>
                      <p class="institution-name">${
                        edu.institution || "Institution"
                      }</p>
                      <span class="date">${formatDate(
                        edu.startDate,
                        edu.endDate
                      )}</span>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.projects && data.projects.length
                ? `
              <section class="content-section">
                <h2>Projects</h2>
                ${data.projects
                  .map(
                    (proj) => `
                  <div class="project-item">
                    <h3>${proj.name || "Project"}</h3>
                    ${proj.description ? `<p>${proj.description}</p>` : ""}
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.modern {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 40px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .sidebar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
        }
        .profile-section h1 {
          font-size: 24px;
          margin: 0 0 5px 0;
          font-weight: 700;
        }
        .subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin: 0 0 15px 0;
        }
        .bio {
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 20px;
          opacity: 0.95;
        }
        .contact-box, .skills-box {
          background: rgba(255,255,255,0.1);
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
        }
        .contact-box h3, .skills-box h3 {
          font-size: 12px;
          margin: 0 0 10px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .contact-box p {
          font-size: 11px;
          margin: 5px 0;
        }
        .skill-tag {
          background: rgba(255,255,255,0.2);
          padding: 6px 10px;
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 11px;
        }
        .skill-tag strong {
          display: block;
          font-size: 12px;
          margin-bottom: 2px;
        }
        .main-content {
          padding-right: 20px;
        }
        .content-section {
          margin-bottom: 35px;
        }
        .content-section h2 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 20px 0;
          color: #333;
          position: relative;
          padding-bottom: 10px;
        }
        .content-section h2:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: #667eea;
        }
        .timeline-item {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          position: relative;
        }
        .timeline-marker {
          width: 12px;
          height: 12px;
          background: #667eea;
          border-radius: 50%;
          margin-top: 5px;
          flex-shrink: 0;
        }
        .timeline-content h3 {
          font-size: 14px;
          margin: 0 0 3px 0;
          font-weight: 700;
        }
        .company-name, .institution-name {
          font-size: 12px;
          color: #666;
          margin: 0 0 5px 0;
        }
        .date {
          font-size: 11px;
          color: #999;
        }
        .description {
          font-size: 12px;
          margin: 8px 0 0 0;
          line-height: 1.5;
        }
        .project-item {
          margin-bottom: 15px;
        }
        .project-item h3 {
          font-size: 13px;
          margin: 0 0 5px 0;
          font-weight: 700;
        }
        .project-item p {
          font-size: 12px;
          margin: 0;
        }
      `;

      return { html, css };
    },
  },

  creative: {
    name: "Creative",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content creative">
          <div class="hero-section">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <p class="tagline">${
              data.basics?.label || "Creative Professional"
            }</p>
            <div class="accent-bar"></div>
          </div>

          <div class="creative-grid">
            <div class="left-column">
              ${
                data.basics?.summary
                  ? `
                <section class="creative-section about-section">
                  <h2>About</h2>
                  <p>${data.basics.summary}</p>
                </section>
              `
                  : ""
              }

              ${
                data.skills && data.skills.length
                  ? `
                <section class="creative-section">
                  <h2>Expertise</h2>
                  ${data.skills
                    .map(
                      (skill) => `
                    <div class="expertise-item">
                      <h3>${skill.name || "Skill"}</h3>
                      <div class="keywords">${
                        Array.isArray(skill.keywords)
                          ? skill.keywords.join(" • ")
                          : skill.keywords || ""
                      }</div>
                    </div>
                  `
                    )
                    .join("")}
                </section>
              `
                  : ""
              }
            </div>

            <div class="right-column">
              ${
                data.work && data.work.length
                  ? `
                <section class="creative-section">
                  <h2>Experience</h2>
                  ${data.work
                    .map(
                      (job) => `
                    <div class="creative-entry">
                      <div class="entry-title">
                        <h3>${job.position || "Position"}</h3>
                        <span class="entry-date">${formatDate(
                          job.startDate,
                          job.endDate
                        )}</span>
                      </div>
                      <p class="entry-company">${job.name || "Company"}</p>
                      ${
                        job.summary
                          ? `<p class="entry-summary">${job.summary}</p>`
                          : ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </section>
              `
                  : ""
              }

              ${
                data.education && data.education.length
                  ? `
                <section class="creative-section">
                  <h2>Education</h2>
                  ${data.education
                    .map(
                      (edu) => `
                    <div class="creative-entry">
                      <div class="entry-title">
                        <h3>${edu.studyType || "Degree"} in ${
                        edu.area || "Field"
                      }</h3>
                        <span class="entry-date">${formatDate(
                          edu.startDate,
                          edu.endDate
                        )}</span>
                      </div>
                      <p class="entry-institution">${
                        edu.institution || "Institution"
                      }</p>
                    </div>
                  `
                    )
                    .join("")}
                </section>
              `
                  : ""
              }

              ${
                data.projects && data.projects.length
                  ? `
                <section class="creative-section">
                  <h2>Projects</h2>
                  ${data.projects
                    .map(
                      (proj) => `
                    <div class="creative-entry">
                      <h3>${proj.name || "Project"}</h3>
                      ${proj.description ? `<p>${proj.description}</p>` : ""}
                    </div>
                  `
                    )
                    .join("")}
                </section>
              `
                  : ""
              }
            </div>
          </div>

          ${
            data.basics?.email || data.basics?.phone
              ? `
            <div class="footer-info">
              ${data.basics?.email ? `<span>${data.basics.email}</span>` : ""}
              ${data.basics?.phone ? `<span>${data.basics.phone}</span>` : ""}
              ${
                data.basics?.location
                  ? `<span>${data.basics.location}</span>`
                  : ""
              }
            </div>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content.creative {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .hero-section {
          margin-bottom: 40px;
          position: relative;
        }
        .hero-section h1 {
          font-size: 32px;
          margin: 0 0 10px 0;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .tagline {
          font-size: 14px;
          color: #666;
          margin: 0 0 15px 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .accent-bar {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #f59e0b, #ec4899);
          margin-bottom: 20px;
        }
        .creative-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 30px;
        }
        .creative-section {
          margin-bottom: 25px;
        }
        .creative-section h2 {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 15px 0;
          padding-bottom: 0;
          border: none;
        }
        .expertise-item {
          margin-bottom: 12px;
        }
        .expertise-item h3 {
          font-size: 12px;
          margin: 0;
          font-weight: 700;
        }
        .keywords {
          font-size: 11px;
          color: #888;
          margin-top: 3px;
        }
        .about-section p {
          font-size: 12px;
          line-height: 1.6;
          color: #555;
        }
        .creative-entry {
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        .creative-entry:last-child {
          border-bottom: none;
        }
        .entry-title {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 5px;
        }
        .creative-entry h3 {
          font-size: 13px;
          margin: 0;
          font-weight: 700;
        }
        .entry-date {
          font-size: 11px;
          color: #999;
          flex-shrink: 0;
        }
        .entry-company, .entry-institution {
          font-size: 12px;
          color: #888;
          margin: 3px 0;
        }
        .entry-summary {
          font-size: 11px;
          line-height: 1.5;
          margin-top: 5px;
          color: #666;
        }
        .footer-info {
          display: flex;
          gap: 20px;
          font-size: 11px;
          color: #999;
          padding-top: 20px;
          border-top: 2px solid #eee;
        }
      `;

      return { html, css };
    },
  },

  tech: {
    name: "Tech",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content tech">
          <div class="tech-header">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <code class="title-code">${data.basics?.label || "Developer"}</code>
          </div>

          <div class="tech-container">
            <div class="code-block">
              <div class="code-header">const profile = {</div>
              <div class="code-content">
                ${
                  data.basics?.email
                    ? `<div class="code-line"><span class="key">email:</span> <span class="value">"${data.basics.email}"</span>,</div>`
                    : ""
                }
                ${
                  data.basics?.phone
                    ? `<div class="code-line"><span class="key">phone:</span> <span class="value">"${data.basics.phone}"</span>,</div>`
                    : ""
                }
                ${
                  data.basics?.location
                    ? `<div class="code-line"><span class="key">location:</span> <span class="value">"${data.basics.location}"</span>,</div>`
                    : ""
                }
              </div>
              <div class="code-footer">}</div>
            </div>

            ${
              data.skills && data.skills.length
                ? `
              <div class="code-block">
                <div class="code-header">const skills = [</div>
                <div class="code-content">
                  ${data.skills
                    .map(
                      (skill) => `
                    <div class="code-line">
                      <span class="code-obj">{</span>
                      <span class="key">name:</span> <span class="value">"${
                        skill.name
                      }"</span>,
                      <span class="key">technologies:</span> [<span class="value">${
                        Array.isArray(skill.keywords)
                          ? skill.keywords
                              .slice(0, 3)
                              .map((k) => `"${k}"`)
                              .join(", ")
                          : ""
                      }</span>]
                      <span class="code-obj">},</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <div class="code-footer">]</div>
              </div>
            `
                : ""
            }

            ${
              data.work && data.work.length
                ? `
              <div class="code-block">
                <div class="code-header">const experience = [</div>
                <div class="code-content">
                  ${data.work
                    .map(
                      (job) => `
                    <div class="code-line">
                      <span class="code-obj">{</span>
                      <span class="key">position:</span> <span class="value">"${
                        job.position
                      }"</span>,
                      <span class="key">company:</span> <span class="value">"${
                        job.name
                      }"</span>,
                      <span class="key">duration:</span> <span class="value">"${formatDate(
                        job.startDate,
                        job.endDate
                      )}"</span>
                      <span class="code-obj">},</span>
                    </div>
                  `
                    )
                    .join("")}
                </div>
                <div class="code-footer">]</div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.tech {
          font-family: 'Courier New', monospace;
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 30px;
          border-radius: 8px;
        }
        .tech-header {
          margin-bottom: 30px;
          border-bottom: 2px solid #0ea5e9;
          padding-bottom: 20px;
        }
        .tech-header h1 {
          font-size: 28px;
          margin: 0 0 10px 0;
          color: #0ea5e9;
          font-weight: 700;
        }
        .title-code {
          font-size: 12px;
          color: #a0aec0;
          background: rgba(14, 165, 233, 0.1);
          padding: 4px 8px;
          border-radius: 3px;
          display: inline-block;
        }
        .code-block {
          background: #252526;
          border-left: 3px solid #0ea5e9;
          margin-bottom: 20px;
          border-radius: 4px;
          overflow: hidden;
        }
        .code-header {
          background: #1e1e1e;
          padding: 10px 15px;
          font-size: 12px;
          color: #ce9178;
          font-weight: 700;
        }
        .code-content {
          padding: 15px;
          font-size: 11px;
          line-height: 1.8;
        }
        .code-line {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }
        .key {
          color: #9cdcfe;
        }
        .value {
          color: #ce9178;
        }
        .code-obj {
          color: #d4d4d4;
        }
        .code-footer {
          padding: 10px 15px;
          background: #1e1e1e;
          font-size: 12px;
          color: #ce9178;
          font-weight: 700;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
      `;

      return { html, css };
    },
  },

  executive: {
    name: "Executive",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content executive">
          <div class="exec-header">
            <div class="header-left">
              <h1>${data.basics?.name || "Your Name"}</h1>
              <p class="exec-title">${data.basics?.label || "Executive"}</p>
            </div>
            <div class="header-right">
              ${
                data.basics?.email
                  ? `<p><strong>Email:</strong> ${data.basics.email}</p>`
                  : ""
              }
              ${
                data.basics?.phone
                  ? `<p><strong>Phone:</strong> ${data.basics.phone}</p>`
                  : ""
              }
              ${
                data.basics?.location
                  ? `<p><strong>Location:</strong> ${data.basics.location}</p>`
                  : ""
              }
            </div>
          </div>

          ${
            data.basics?.summary
              ? `
            <section class="exec-section">
              <h2>Executive Summary</h2>
              <p>${data.basics.summary}</p>
            </section>
          `
              : ""
          }

          ${
            data.work && data.work.length
              ? `
            <section class="exec-section">
              <h2>Professional Experience</h2>
              ${data.work
                .map(
                  (job) => `
                <div class="exec-entry">
                  <div class="exec-entry-title">
                    <h3>${job.position || "Position"}</h3>
                    <span>${job.name || "Company"}</span>
                  </div>
                  <p class="exec-entry-date">${formatDate(
                    job.startDate,
                    job.endDate
                  )}</p>
                  ${job.summary ? `<p>${job.summary}</p>` : ""}
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          <div class="exec-two-col">
            ${
              data.education && data.education.length
                ? `
              <section class="exec-section">
                <h2>Education</h2>
                ${data.education
                  .map(
                    (edu) => `
                  <div class="exec-entry compact">
                    <h3>${edu.studyType || "Degree"}</h3>
                    <p>${edu.area || "Field"} • ${
                      edu.institution || "Institution"
                    }</p>
                    <p class="exec-entry-date">${formatDate(
                      edu.startDate,
                      edu.endDate
                    )}</p>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.skills && data.skills.length
                ? `
              <section class="exec-section">
                <h2>Core Competencies</h2>
                ${data.skills
                  .slice(0, 5)
                  .map(
                    (skill) => `
                  <div class="exec-entry compact">
                    <h3>${skill.name || "Skill"}</h3>
                    <p>${
                      Array.isArray(skill.keywords)
                        ? skill.keywords.slice(0, 2).join(", ")
                        : ""
                    }</p>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.executive {
          font-family: 'Georgia', serif;
          color: #1f2937;
        }
        .exec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 3px solid #1e40af;
          padding-bottom: 25px;
          margin-bottom: 30px;
        }
        .header-left h1 {
          font-size: 32px;
          margin: 0;
          font-weight: 700;
          color: #0d1b2a;
        }
        .exec-title {
          font-size: 13px;
          color: #1e40af;
          margin: 5px 0 0 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .header-right {
          text-align: right;
          font-size: 12px;
        }
        .header-right p {
          margin: 3px 0;
        }
        .exec-section {
          margin-bottom: 25px;
        }
        .exec-section h2 {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin: 0 0 15px 0;
          padding-bottom: 0;
          border: none;
        }
        .exec-section > p {
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }
        .exec-entry {
          margin-bottom: 12px;
        }
        .exec-entry.compact {
          margin-bottom: 8px;
        }
        .exec-entry-title {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 15px;
        }
        .exec-entry h3 {
          font-size: 12px;
          margin: 0;
          font-weight: 700;
        }
        .exec-entry-title span {
          font-size: 11px;
          color: #1e40af;
          flex-shrink: 0;
        }
        .exec-entry-date {
          font-size: 11px;
          color: #666;
          margin: 2px 0 5px 0;
        }
        .exec-entry p {
          font-size: 11px;
          margin: 3px 0;
          line-height: 1.5;
        }
        .exec-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
      `;

      return { html, css };
    },
  },

  compact: {
    name: "Compact",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content compact">
          <div class="compact-header">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <div class="compact-meta">
              <span>${data.basics?.label || "Professional"}</span>
              ${data.basics?.email ? `<span>${data.basics.email}</span>` : ""}
              ${data.basics?.phone ? `<span>${data.basics.phone}</span>` : ""}
            </div>
          </div>

          <div class="compact-body">
            ${
              data.work && data.work.length
                ? `
              <div class="compact-section">
                <div class="section-title">EXPERIENCE</div>
                ${data.work
                  .map(
                    (job) => `
                  <div class="compact-item">
                    <div class="item-header">
                      <strong>${job.position || "Position"}</strong>
                      <span>${formatDate(job.startDate, job.endDate)}</span>
                    </div>
                    <div class="item-detail">${job.name || "Company"}</div>
                    ${
                      job.summary
                        ? `<div class="item-desc">${job.summary}</div>`
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            ${
              data.education && data.education.length
                ? `
              <div class="compact-section">
                <div class="section-title">EDUCATION</div>
                ${data.education
                  .map(
                    (edu) => `
                  <div class="compact-item">
                    <div class="item-header">
                      <strong>${edu.studyType || "Degree"}</strong>
                      <span>${formatDate(edu.startDate, edu.endDate)}</span>
                    </div>
                    <div class="item-detail">${edu.area || "Field"} • ${
                      edu.institution || "Institution"
                    }</div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }

            ${
              data.skills && data.skills.length
                ? `
              <div class="compact-section">
                <div class="section-title">SKILLS</div>
                <div class="compact-skills">
                  ${data.skills
                    .map(
                      (skill) => `
                    <div class="compact-skill">
                      <strong>${skill.name}</strong>: ${
                        Array.isArray(skill.keywords)
                          ? skill.keywords.join(", ")
                          : skill.keywords || ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </div>
              </div>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.compact {
          font-family: 'Arial', sans-serif;
          color: #333;
        }
        .compact-header {
          margin-bottom: 20px;
        }
        .compact-header h1 {
          font-size: 22px;
          margin: 0 0 8px 0;
          font-weight: 700;
        }
        .compact-meta {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          font-size: 11px;
          color: #666;
        }
        .compact-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .compact-section {
          border-left: 3px solid #333;
          padding-left: 12px;
        }
        .section-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          margin-bottom: 8px;
          text-transform: uppercase;
        }
        .compact-item {
          margin-bottom: 8px;
          font-size: 11px;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .item-header strong {
          font-weight: 700;
        }
        .item-header span {
          color: #999;
          flex-shrink: 0;
        }
        .item-detail {
          color: #666;
          font-size: 10px;
          margin-top: 1px;
        }
        .item-desc {
          font-size: 10px;
          margin-top: 3px;
          line-height: 1.4;
        }
        .compact-skills {
          display: grid;
          gap: 5px;
        }
        .compact-skill {
          font-size: 10px;
        }
        .compact-skill strong {
          font-weight: 700;
        }
      `;

      return { html, css };
    },
  },

  minimal: {
    name: "Minimal",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content minimal">
          <h1>${data.basics?.name || "Your Name"}</h1>
          <p class="title">${data.basics?.label || "Professional"}</p>
          ${
            data.basics?.summary
              ? `<p class="intro">${data.basics.summary}</p>`
              : ""
          }

          <div class="contact">${[
            data.basics?.email,
            data.basics?.phone,
            data.basics?.location,
          ]
            .filter(Boolean)
            .join(" • ")}</div>

          ${
            data.work && data.work.length
              ? `
            <div class="section">
              <h2>Experience</h2>
              ${data.work
                .map(
                  (job) => `
                <div class="item">
                  <strong>${job.position || "Position"}</strong> at <em>${
                    job.name || "Company"
                  }</em>
                  <div class="meta">${formatDate(
                    job.startDate,
                    job.endDate
                  )}</div>
                  ${job.summary ? `<p>${job.summary}</p>` : ""}
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.education && data.education.length
              ? `
            <div class="section">
              <h2>Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="item">
                  <strong>${edu.studyType || "Degree"} in ${
                    edu.area || "Field"
                  }</strong> — ${edu.institution || "Institution"}
                  <div class="meta">${formatDate(
                    edu.startDate,
                    edu.endDate
                  )}</div>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.skills && data.skills.length
              ? `
            <div class="section">
              <h2>Skills</h2>
              <p>${data.skills
                .map(
                  (s) =>
                    `${s.name}${
                      Array.isArray(s.keywords) && s.keywords.length
                        ? ` (${s.keywords.slice(0, 2).join(", ")})`
                        : ""
                    }`
                )
                .join(" • ")}</p>
            </div>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content.minimal {
          font-family: 'Helvetica Neue', sans-serif;
          max-width: 800px;
          color: #222;
          line-height: 1.5;
        }
        .resume-content.minimal h1 {
          font-size: 20px;
          margin: 0 0 5px 0;
          font-weight: 700;
        }
        .resume-content.minimal h2 {
          font-size: 12px;
          margin: 15px 0 10px 0;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
        }
        .title {
          font-size: 12px;
          color: #666;
          margin: 0 0 10px 0;
        }
        .intro {
          font-size: 11px;
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .contact {
          font-size: 10px;
          color: #888;
          margin-bottom: 15px;
        }
        .section {
          margin-bottom: 15px;
        }
        .item {
          margin-bottom: 10px;
          font-size: 11px;
        }
        .item strong {
          font-weight: 700;
        }
        .meta {
          font-size: 10px;
          color: #999;
          margin: 2px 0;
        }
        .item p {
          margin: 5px 0 0 0;
          font-size: 10px;
          line-height: 1.4;
        }
      `;

      return { html, css };
    },
  },

  colorful: {
    name: "Colorful",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };
      const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"];

      const html = `
        <div class="resume-content colorful">
          <div class="header-colorful">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <p>${data.basics?.label || "Professional"}</p>
          </div>

          ${
            data.basics?.summary
              ? `<div class="summary-box">${data.basics.summary}</div>`
              : ""
          }

          <div class="colorful-grid">
            ${
              data.work && data.work.length
                ? `
              <section class="colorful-section" style="border-top: 4px solid ${
                colors[0]
              }">
                <h2>Experience</h2>
                ${data.work
                  .map(
                    (job, idx) => `
                  <div class="colorful-item" style="border-left: 3px solid ${
                    colors[idx % colors.length]
                  }">
                    <h3>${job.position || "Position"}</h3>
                    <p class="company">${job.name || "Company"}</p>
                    <p class="date">${formatDate(
                      job.startDate,
                      job.endDate
                    )}</p>
                    ${job.summary ? `<p>${job.summary}</p>` : ""}
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.education && data.education.length
                ? `
              <section class="colorful-section" style="border-top: 4px solid ${
                colors[1]
              }">
                <h2>Education</h2>
                ${data.education
                  .map(
                    (edu, idx) => `
                  <div class="colorful-item" style="border-left: 3px solid ${
                    colors[(idx + 2) % colors.length]
                  }">
                    <h3>${edu.studyType || "Degree"} in ${
                      edu.area || "Field"
                    }</h3>
                    <p class="company">${edu.institution || "Institution"}</p>
                    <p class="date">${formatDate(
                      edu.startDate,
                      edu.endDate
                    )}</p>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.skills && data.skills.length
                ? `
              <section class="colorful-section" style="border-top: 4px solid ${
                colors[2]
              }">
                <h2>Skills</h2>
                <div class="skill-badges">
                  ${data.skills
                    .map(
                      (skill, idx) => `
                    <span class="badge" style="background: ${
                      colors[idx % colors.length]
                    }">${skill.name}</span>
                  `
                    )
                    .join("")}
                </div>
              </section>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.colorful {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .header-colorful {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 25px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .header-colorful h1 {
          font-size: 26px;
          margin: 0 0 5px 0;
          font-weight: 700;
        }
        .header-colorful p {
          margin: 0;
          font-size: 13px;
          opacity: 0.95;
        }
        .summary-box {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 20px;
          font-size: 12px;
          line-height: 1.5;
        }
        .colorful-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .colorful-section h2 {
          font-size: 14px;
          font-weight: 700;
          margin: 0 0 15px 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .colorful-item {
          padding: 12px;
          padding-left: 15px;
          background: #fafafa;
          margin-bottom: 12px;
          border-radius: 4px;
        }
        .colorful-item h3 {
          font-size: 13px;
          margin: 0 0 3px 0;
          font-weight: 700;
        }
        .company {
          font-size: 11px;
          color: #666;
          margin: 0 0 3px 0;
        }
        .date {
          font-size: 10px;
          color: #999;
          margin: 0 0 8px 0;
        }
        .colorful-item p:not(.company):not(.date) {
          font-size: 11px;
          margin: 5px 0 0 0;
          line-height: 1.4;
        }
        .skill-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .badge {
          display: inline-block;
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
        }
      `;

      return { html, css };
    },
  },

  dark: {
    name: "Dark",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content dark">
          <div class="dark-header">
            <h1>${data.basics?.name || "Your Name"}</h1>
            <p class="tagline">${data.basics?.label || "Professional"}</p>
            ${[data.basics?.email, data.basics?.phone, data.basics?.location]
              .filter(Boolean)
              .map((item) => `<p class="contact-item">${item}</p>`)
              .join("")}
          </div>

          ${
            data.basics?.summary
              ? `<div class="dark-summary">${data.basics.summary}</div>`
              : ""
          }

          ${
            data.work && data.work.length
              ? `
            <section class="dark-section">
              <h2>Experience</h2>
              ${data.work
                .map(
                  (job) => `
                <div class="dark-entry">
                  <div class="entry-head">
                    <h3>${job.position || "Position"}</h3>
                    <span>${formatDate(job.startDate, job.endDate)}</span>
                  </div>
                  <p class="dark-company">${job.name || "Company"}</p>
                  ${job.summary ? `<p>${job.summary}</p>` : ""}
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          ${
            data.education && data.education.length
              ? `
            <section class="dark-section">
              <h2>Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="dark-entry">
                  <div class="entry-head">
                    <h3>${edu.studyType || "Degree"} in ${
                    edu.area || "Field"
                  }</h3>
                    <span>${formatDate(edu.startDate, edu.endDate)}</span>
                  </div>
                  <p class="dark-institution">${
                    edu.institution || "Institution"
                  }</p>
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }

          ${
            data.skills && data.skills.length
              ? `
            <section class="dark-section">
              <h2>Skills</h2>
              ${data.skills
                .map(
                  (skill) => `
                <div class="skill-row">
                  <strong>${skill.name}</strong>
                  <span>${
                    Array.isArray(skill.keywords)
                      ? skill.keywords.join(", ")
                      : skill.keywords || ""
                  }</span>
                </div>
              `
                )
                .join("")}
            </section>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content.dark {
          background: #1a1a1a;
          color: #e0e0e0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 30px;
          border-radius: 8px;
        }
        .dark-header {
          margin-bottom: 30px;
          border-bottom: 2px solid #00bcd4;
          padding-bottom: 20px;
        }
        .dark-header h1 {
          font-size: 28px;
          margin: 0 0 8px 0;
          color: #00bcd4;
          font-weight: 700;
        }
        .tagline {
          font-size: 13px;
          color: #b0bec5;
          margin: 0 0 8px 0;
        }
        .contact-item {
          font-size: 11px;
          color: #90caf9;
          margin: 3px 0;
        }
        .dark-summary {
          background: rgba(0, 188, 212, 0.1);
          border-left: 3px solid #00bcd4;
          padding: 15px;
          margin-bottom: 20px;
          font-size: 12px;
          line-height: 1.5;
        }
        .dark-section {
          margin-bottom: 25px;
        }
        .dark-section h2 {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 15px 0;
          color: #00bcd4;
        }
        .dark-entry {
          margin-bottom: 15px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .dark-entry:last-child {
          border-bottom: none;
        }
        .entry-head {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 5px;
        }
        .dark-entry h3 {
          font-size: 12px;
          margin: 0;
          font-weight: 700;
          color: #fff;
        }
        .entry-head span {
          font-size: 11px;
          color: #90caf9;
          flex-shrink: 0;
        }
        .dark-company, .dark-institution {
          font-size: 11px;
          color: #80deea;
          margin: 3px 0 5px 0;
        }
        .dark-entry p:not(.dark-company):not(.dark-institution) {
          font-size: 11px;
          margin: 5px 0 0 0;
          line-height: 1.4;
        }
        .skill-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 11px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .skill-row strong {
          font-weight: 700;
          color: #fff;
        }
        .skill-row span {
          color: #b0bec5;
        }
      `;

      return { html, css };
    },
  },

  ats: {
    name: "ATS-Friendly",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content ats">
          <h1>${data.basics?.name || "Your Name"}</h1>
          <p class="title">${data.basics?.label || "Professional"}</p>
          <p class="contact">${[
            data.basics?.email,
            data.basics?.phone,
            data.basics?.location,
          ]
            .filter(Boolean)
            .join(" | ")}</p>

          ${
            data.basics?.summary
              ? `
            <h2>PROFESSIONAL SUMMARY</h2>
            <p>${data.basics.summary}</p>
          `
              : ""
          }

          ${
            data.work && data.work.length
              ? `
            <h2>PROFESSIONAL EXPERIENCE</h2>
            ${data.work
              .map(
                (job) => `
              <h3>${job.position || "Position"}</h3>
              <p>${job.name || "Company"} | ${formatDate(
                  job.startDate,
                  job.endDate
                )}</p>
              ${job.summary ? `<p>${job.summary}</p>` : ""}
            `
              )
              .join("")}
          `
              : ""
          }

          ${
            data.education && data.education.length
              ? `
            <h2>EDUCATION</h2>
            ${data.education
              .map(
                (edu) => `
              <h3>${edu.studyType || "Degree"} in ${edu.area || "Field"}</h3>
              <p>${edu.institution || "Institution"} | ${formatDate(
                  edu.startDate,
                  edu.endDate
                )}</p>
            `
              )
              .join("")}
          `
              : ""
          }

          ${
            data.skills && data.skills.length
              ? `
            <h2>SKILLS</h2>
            <p>${data.skills
              .map(
                (s) =>
                  `${s.name}${
                    Array.isArray(s.keywords) && s.keywords.length
                      ? `: ${s.keywords.join(", ")}`
                      : ""
                  }`
              )
              .join(" | ")}</p>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content.ats {
          font-family: 'Times New Roman', serif;
          color: #000;
          line-height: 1.5;
          font-size: 12px;
        }
        .resume-content.ats h1 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 5px 0;
        }
        .resume-content.ats h2 {
          font-size: 12px;
          font-weight: 700;
          margin: 12px 0 6px 0;
          text-transform: uppercase;
        }
        .resume-content.ats h3 {
          font-size: 11px;
          font-weight: 700;
          margin: 8px 0 2px 0;
        }
        .resume-content.ats p {
          margin: 2px 0;
          font-size: 11px;
        }
        .title {
          font-size: 11px;
          margin: 0;
        }
        .contact {
          font-size: 10px;
          margin-bottom: 10px;
        }
      `;

      return { html, css };
    },
  },

  academic: {
    name: "Academic",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content academic">
          <h1 class="name">${data.basics?.name || "Your Name"}</h1>
          <p class="academic-title">${data.basics?.label || "Scholar"}</p>

          ${
            data.basics?.summary
              ? `<div class="academic-section"><p>${data.basics.summary}</p></div>`
              : ""
          }

          ${
            data.education && data.education.length
              ? `
            <div class="academic-section">
              <h2>Education</h2>
              ${data.education
                .map(
                  (edu) => `
                <div class="academic-entry">
                  <p class="entry-title"><strong>${
                    edu.studyType || "Degree"
                  }</strong> in ${edu.area || "Field"}</p>
                  <p class="entry-institution">${
                    edu.institution || "Institution"
                  }</p>
                  <p class="entry-date">${formatDate(
                    edu.startDate,
                    edu.endDate
                  )}</p>
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.work && data.work.length
              ? `
            <div class="academic-section">
              <h2>Academic & Professional Experience</h2>
              ${data.work
                .map(
                  (job) => `
                <div class="academic-entry">
                  <p class="entry-title"><strong>${
                    job.position || "Position"
                  }</strong></p>
                  <p class="entry-institution">${job.name || "Organization"}</p>
                  <p class="entry-date">${formatDate(
                    job.startDate,
                    job.endDate
                  )}</p>
                  ${
                    job.summary
                      ? `<p class="entry-desc">${job.summary}</p>`
                      : ""
                  }
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }

          ${
            data.skills && data.skills.length
              ? `
            <div class="academic-section">
              <h2>Research Areas & Competencies</h2>
              <ul class="academic-list">
                ${data.skills
                  .map(
                    (skill) => `
                  <li>${skill.name}${
                      Array.isArray(skill.keywords) && skill.keywords.length
                        ? `: ${skill.keywords.slice(0, 3).join(", ")}`
                        : ""
                    }</li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          `
              : ""
          }

          ${
            data.basics?.email || data.basics?.phone
              ? `
            <div class="academic-footer">
              <p>${[
                data.basics?.email,
                data.basics?.phone,
                data.basics?.location,
              ]
                .filter(Boolean)
                .join(" • ")}</p>
            </div>
          `
              : ""
          }
        </div>
      `;

      const css = `
        .resume-content.academic {
          font-family: 'Georgia', serif;
          color: #2c3e50;
          line-height: 1.6;
        }
        .name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 5px 0;
          text-align: center;
        }
        .academic-title {
          text-align: center;
          font-size: 13px;
          color: #7f8c8d;
          margin: 0 0 15px 0;
          font-style: italic;
        }
        .academic-section {
          margin-bottom: 20px;
        }
        .academic-section h2 {
          font-size: 13px;
          font-weight: 700;
          margin: 15px 0 10px 0;
          border-bottom: 2px solid #2c3e50;
          padding-bottom: 5px;
        }
        .academic-entry {
          margin-bottom: 12px;
          padding-left: 10px;
        }
        .entry-title {
          font-size: 12px;
          margin: 0 0 3px 0;
          font-weight: 700;
        }
        .entry-institution {
          font-size: 11px;
          color: #555;
          margin: 0 0 2px 0;
          font-style: italic;
        }
        .entry-date {
          font-size: 10px;
          color: #999;
          margin: 0 0 5px 0;
        }
        .entry-desc {
          font-size: 11px;
          margin: 5px 0 0 0;
          line-height: 1.4;
        }
        .academic-list {
          margin: 0;
          padding-left: 20px;
          font-size: 11px;
        }
        .academic-list li {
          margin-bottom: 5px;
        }
        .academic-footer {
          margin-top: 20px;
          padding-top: 10px;
          border-top: 1px solid #bdc3c7;
          text-align: center;
          font-size: 10px;
          color: #7f8c8d;
        }
      `;

      return { html, css };
    },
  },

  corporate: {
    name: "Corporate",
    render: (data) => {
      const formatDate = (start, end) => {
        if (!end)
          return start
            ? new Date(start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
            : "";
        return `${new Date(start).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })} - ${new Date(end).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })}`;
      };

      const html = `
        <div class="resume-content corporate">
          <div class="corp-sidebar">
            <div class="corp-header">
              <h1>${data.basics?.name || "Your Name"}</h1>
              <p>${data.basics?.label || "Professional"}</p>
            </div>

            ${
              [
                data.basics?.email,
                data.basics?.phone,
                data.basics?.location,
              ].filter(Boolean).length
                ? `
              <div class="corp-contact">
                <h3>Contact</h3>
                ${data.basics?.email ? `<p>${data.basics.email}</p>` : ""}
                ${data.basics?.phone ? `<p>${data.basics.phone}</p>` : ""}
                ${data.basics?.location ? `<p>${data.basics.location}</p>` : ""}
              </div>
            `
                : ""
            }

            ${
              data.skills && data.skills.length
                ? `
              <div class="corp-skills">
                <h3>Core Competencies</h3>
                ${data.skills
                  .slice(0, 6)
                  .map(
                    (skill) => `
                  <div class="corp-skill">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-bar"></div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            `
                : ""
            }
          </div>

          <div class="corp-main">
            ${
              data.basics?.summary
                ? `
              <section class="corp-section">
                <h2>Executive Profile</h2>
                <p>${data.basics.summary}</p>
              </section>
            `
                : ""
            }

            ${
              data.work && data.work.length
                ? `
              <section class="corp-section">
                <h2>Professional Experience</h2>
                ${data.work
                  .map(
                    (job) => `
                  <div class="corp-job">
                    <div class="job-header">
                      <h3>${job.position || "Position"}</h3>
                      <span>${formatDate(job.startDate, job.endDate)}</span>
                    </div>
                    <p class="job-company">${job.name || "Company"}</p>
                    ${
                      job.summary
                        ? `<p class="job-desc">${job.summary}</p>`
                        : ""
                    }
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }

            ${
              data.education && data.education.length
                ? `
              <section class="corp-section">
                <h2>Education & Certifications</h2>
                ${data.education
                  .map(
                    (edu) => `
                  <div class="corp-edu">
                    <p><strong>${edu.studyType || "Degree"}</strong> in ${
                      edu.area || "Field"
                    }</p>
                    <p>${edu.institution || "Institution"} • ${formatDate(
                      edu.startDate,
                      edu.endDate
                    )}</p>
                  </div>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }
          </div>
        </div>
      `;

      const css = `
        .resume-content.corporate {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .corp-sidebar {
          background: #f8f9fa;
          padding: 20px;
          border-right: 3px solid #003366;
        }
        .corp-header {
          margin-bottom: 20px;
          border-bottom: 2px solid #003366;
          padding-bottom: 15px;
        }
        .corp-header h1 {
          font-size: 20px;
          margin: 0 0 5px 0;
          color: #003366;
          font-weight: 700;
        }
        .corp-header p {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        .corp-contact {
          margin-bottom: 20px;
        }
        .corp-contact h3, .corp-skills h3 {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          color: #003366;
          margin: 0 0 8px 0;
        }
        .corp-contact p {
          font-size: 10px;
          margin: 3px 0;
          color: #555;
        }
        .corp-skills {
          margin-bottom: 20px;
        }
        .corp-skill {
          margin-bottom: 8px;
        }
        .skill-name {
          font-size: 10px;
          font-weight: 600;
          margin-bottom: 3px;
        }
        .skill-bar {
          height: 6px;
          background: linear-gradient(90deg, #003366 60%, #ddd 60%);
          border-radius: 3px;
        }
        .corp-main {
          padding: 10px;
        }
        .corp-section {
          margin-bottom: 20px;
        }
        .corp-section h2 {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #003366;
          margin: 0 0 10px 0;
          border-bottom: 2px solid #003366;
          padding-bottom: 5px;
        }
        .corp-section > p {
          font-size: 11px;
          line-height: 1.5;
          margin: 0;
        }
        .corp-job {
          margin-bottom: 12px;
        }
        .job-header {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .corp-job h3 {
          font-size: 12px;
          margin: 0;
          font-weight: 700;
        }
        .job-header span {
          font-size: 10px;
          color: #999;
          flex-shrink: 0;
        }
        .job-company {
          font-size: 11px;
          color: #666;
          margin: 2px 0 5px 0;
          font-weight: 600;
        }
        .job-desc {
          font-size: 10px;
          line-height: 1.4;
          margin: 5px 0 0 0;
        }
        .corp-edu {
          margin-bottom: 8px;
        }
        .corp-edu p {
          font-size: 10px;
          margin: 2px 0;
        }
        .corp-edu p strong {
          font-weight: 700;
        }
      `;

      return { html, css };
    },
  },
};

function renderTemplate(templateName, resumeData) {
  const template = TEMPLATES[templateName];
  if (!template) {
    console.error(`Template "${templateName}" not found`);
    return { html: "<p>Template not found</p>", css: "" };
  }
  return template.render(resumeData);
}
