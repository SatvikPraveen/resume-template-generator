// ==================== TEXT NORMALIZATION ====================
// Clean and normalize PDF text with malformed spacing
function cleanAndNormalizeText(text) {
  if (!text) return "";

  let cleaned = text
    // Replace multiple spaces/tabs with single space
    .replace(/[ \t]+/g, " ")
    // Normalize common dash characters
    .replace(/[-–—]/g, "-")
    // Clean up excessive newlines
    .replace(/\n\s*\n+/g, " ")
    // Remove spaces before common punctuation
    .replace(/\s+([.,;:])/g, "$1")
    .trim();

  return cleaned;
}

// ==================== STATE MANAGEMENT ====================
let STATE = {
  pdfFile: null,
  pdfArrayBuffer: null,
  rawText: "",
  resumeData: null,
  currentTemplate: null,
};

// Demo sample data used to render template previews when no resume is loaded
const SAMPLE_DATA = {
  basics: {
    name: "Jane Doe",
    label: "Product Designer",
    email: "jane.doe@example.com",
    phone: "+1 555-123-4567",
    url: "https://janedoe.design",
    location: "San Francisco, CA",
    summary:
      "Creative product designer with 8+ years building delightful user experiences across web and mobile platforms.",
  },
  work: [
    {
      position: "Senior Product Designer",
      company: "Acme Corp",
      startDate: "Jan 2020",
      endDate: "Present",
      summary:
        "Leading design for core web products. Focused on usability, accessibility, and scalable design systems.",
    },
  ],
  education: [
    {
      institution: "University of Design",
      studyType: "Bachelor's",
      area: "Interaction Design",
      startDate: "2010",
      endDate: "2014",
      location: "Boston, MA",
    },
  ],
  skills: [
    { name: "Design", keywords: ["Figma", "Sketch", "Prototyping"] },
    { name: "Front-end", keywords: ["HTML", "CSS", "JavaScript"] },
  ],
  projects: [
    {
      name: "Design System Revamp",
      keywords: ["Design System", "Accessibility"],
      summary:
        "Led a cross-functional initiative to standardize components and tokens.",
    },
  ],
};

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
  initializeEventListeners();
  renderSamplePreview();
});

function initializeEventListeners() {
  // File upload
  const pdfInput = document.getElementById("pdfInput");
  const uploadBox = document.getElementById("uploadBox");
  const parseBtn = document.getElementById("parseBtn");
  const removeFile = document.getElementById("removeFile");

  pdfInput.addEventListener("change", handleFileSelect);
  parseBtn.addEventListener("click", handleParsePDF);
  removeFile.addEventListener("click", handleRemoveFile);

  // Drag and drop
  uploadBox.addEventListener("dragover", handleDragOver);
  uploadBox.addEventListener("dragleave", handleDragLeave);
  uploadBox.addEventListener("drop", handleDrop);

  // Tabs
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", handleTabSwitch);
  });

  // Template cards
  const templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.addEventListener("click", handleTemplateSelect);
  });

  // Export buttons
  document.getElementById("exportBtn").addEventListener("click", handleExport);
  document
    .getElementById("downloadJsonBtn")
    .addEventListener("click", handleDownloadJSON);
  document.getElementById("printBtn").addEventListener("click", handlePrint);
}

// Show a sample preview on page load so the resume container isn't blank
function renderSamplePreview() {
  const defaultTemplate = "classic";
  STATE.currentTemplate = defaultTemplate;

  // mark the default card active
  const defaultCard = document.querySelector(
    `.template-card[data-template="${defaultTemplate}"]`
  );
  if (defaultCard) defaultCard.classList.add("active");

  // Render sample data into the preview area
  renderCurrentTemplate();
}

// ==================== FILE HANDLING ====================
function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.includes("pdf")) {
    alert("Please upload a PDF file.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert("File size exceeds 10MB. Please upload a smaller file.");
    return;
  }

  STATE.pdfFile = file;

  // Read file as ArrayBuffer
  const reader = new FileReader();
  reader.onload = function (event) {
    STATE.pdfArrayBuffer = event.target.result;
    showFileInfo(file.name);
    document.getElementById("parseBtn").disabled = false;
  };
  reader.readAsArrayBuffer(file);
}

function handleRemoveFile() {
  STATE = {
    pdfFile: null,
    pdfArrayBuffer: null,
    rawText: "",
    resumeData: null,
    currentTemplate: null,
  };

  document.getElementById("pdfInput").value = "";
  document.getElementById("fileInfo").classList.add("is-hidden");
  document.getElementById("parseBtn").disabled = true;

  // Reset UI
  resetDataSection();
  disableTemplates();
  resetPreview();
}

function showFileInfo(fileName) {
  document.getElementById("fileName").textContent = fileName;
  document.getElementById("fileInfo").classList.remove("is-hidden");
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.style.borderColor = "var(--primary)";
  e.currentTarget.style.background = "rgba(59, 130, 246, 0.05)";
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  e.currentTarget.style.borderColor = "var(--border-light)";
  e.currentTarget.style.background = "var(--bg-elevated)";
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();

  const uploadBox = e.currentTarget;
  uploadBox.style.borderColor = "var(--border-light)";
  uploadBox.style.background = "var(--bg-elevated)";

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    document.getElementById("pdfInput").files = files;
    handleFileSelect({ target: { files: files } });
  }
}

// ==================== PDF PARSING ====================
async function handleParsePDF() {
  if (!STATE.pdfArrayBuffer) {
    alert("Please select a PDF file first.");
    return;
  }

  showLoading(true);

  try {
    // Use the PDFTextExtractor module (wrapper around pdf.js)
    if (!window.PDFTextExtractor || !PDFTextExtractor.extractText) {
      throw new Error("PDFTextExtractor module not available");
    }

    const extracted = await PDFTextExtractor.extractText(STATE.pdfArrayBuffer);
    STATE.rawText = extracted || "";

    // Parse text into structured data
    STATE.resumeData = parseResumeText(STATE.rawText);

    // Update UI
    updateDataSection();
    enableTemplates();

    showLoading(false);

    // Auto-select first template
    document.querySelector('.template-card[data-template="classic"]').click();
  } catch (error) {
    console.error("Error parsing PDF:", error);
    alert("Failed to parse PDF. Please try another file.");
    showLoading(false);
  }
}

function showLoading(show) {
  const loading = document.getElementById("loadingIndicator");
  const parseBtn = document.getElementById("parseBtn");

  if (show) {
    loading.classList.remove("is-hidden");
    parseBtn.disabled = true;
  } else {
    loading.classList.add("is-hidden");
    parseBtn.disabled = false;
  }
}

// ==================== TEXT PARSING ====================
function parseResumeText(text) {
  // CRITICAL: Clean text FIRST to handle malformed PDF spacing
  const cleanedText = cleanAndNormalizeText(text);

  console.log("parseResumeText - Raw text length:", text.length);
  console.log("parseResumeText - Cleaned text length:", cleanedText.length);
  console.log(
    "parseResumeText - First 500 chars:",
    cleanedText.substring(0, 500)
  );

  // Fallback: local/robust parsing (primary method)
  const lines = cleanedText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  console.log("parseResumeText - Total lines after split:", lines.length);

  // Extract basic info - handle pipe-separated contact info
  let name = lines[0] || "Resume";
  // Extract name from first line before pipe
  if (name.includes("|")) {
    let namePart = name.split("|")[0].trim();
    // Remove phone/numbers: "Shanmuga Priya Kannan 872 - 330 - 3203" → "Shanmuga Priya Kannan"
    namePart = namePart
      .replace(/\s+\d+\s*[-–—]\s*\d+\s*[-–—]\s*\d+\s*$/, "")
      .trim();
    name = namePart;
  }

  const email = extractEmail(cleanedText);
  const phone = extractPhone(cleanedText);
  const url = extractURL(cleanedText);
  const location = extractLocation(cleanedText);

  // Extract sections
  const sections = identifySections(cleanedText);
  console.log(
    "parseResumeText - Sections found:",
    Object.keys(sections),
    sections
  );

  // Build resume data object
  const resumeData = {
    basics: {
      name: name,
      label: lines[1] || "",
      email: email,
      phone: phone,
      url: url,
      location: location,
      summary: sections.summary || sections.about || "",
    },
    work: parseWorkExperience(sections.experience || sections.work || ""),
    education: parseEducation(sections.education || ""),
    skills: parseSkills(sections.skills || sections["technical skills"] || ""),
    projects: parseProjects(sections.projects || ""),
  };

  console.log("parseResumeText - Final resumeData:", resumeData);

  return resumeData;
}

function extractEmail(text) {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : "";
}

function extractPhone(text) {
  const phoneRegex =
    /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/;
  const match = text.match(phoneRegex);
  return match ? match[0] : "";
}

function extractURL(text) {
  const urlRegex = /(https?:\/\/[^\s]+)|(linkedin\.com\/[^\s]+)/i;
  const match = text.match(urlRegex);
  return match ? match[0] : "";
}

function extractLocation(text) {
  // Look for city, state patterns
  const locationRegex = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2})/;
  const match = text.match(locationRegex);
  return match ? match[0] : "";
}

function identifySections(text) {
  const sections = {};

  // STRATEGY: Find ALL-CAPS section headers only
  // Use case-sensitive matching to avoid matching lowercase words like "experience"
  // in the summary paragraph

  // Map section keyword aliases to canonical names
  const sectionKeywords = {
    education: [
      "EDUCATION",
      "ACADEMIC",
      "QUALIFICATIONS",
      "DEGREES",
      "ACADEMIC BACKGROUND",
      "EDUCATIONAL BACKGROUND",
    ],
    experience: [
      "PROFESSIONAL EXPERIENCE",
      "WORK EXPERIENCE",
      "EMPLOYMENT",
      "CAREER",
      "EXPERIENCE",
      "WORK HISTORY",
      "PROFESSIONAL HISTORY",
    ],
    projects: [
      "PROJECTS",
      "PORTFOLIO",
      "KEY PROJECTS",
      "NOTABLE PROJECTS",
      "PERSONAL PROJECTS",
    ],
    skills: [
      "TECHNICAL SKILLS",
      "CORE COMPETENCIES",
      "TECHNICAL COMPETENCIES",
      "KEY SKILLS",
      "SKILLS",
      "COMPETENCIES",
    ],
    summary: [
      "PROFESSIONAL SUMMARY",
      "SUMMARY",
      "OBJECTIVE",
      "PROFILE",
      "OVERVIEW",
      "ABOUT",
    ],
    certifications: [
      "CERTIFICATIONS",
      "LICENSES",
      "CERTIFICATES",
      "PROFESSIONAL CERTIFICATIONS",
    ],
    languages: ["LANGUAGES", "LANGUAGE"],
  };

  // Find all section header positions in the text
  // CRITICAL: Use case-sensitive matching (no 'i' flag) to only match ALL-CAPS headers
  // This prevents matching lowercase words like "experience" in the summary
  const headerMatches = [];

  for (const [sectionName, keywords] of Object.entries(sectionKeywords)) {
    for (const keyword of keywords) {
      // Match the keyword EXACTLY as ALL-CAPS, with word boundaries, case-sensitive
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      let match;

      while ((match = regex.exec(text)) !== null) {
        headerMatches.push({
          sectionName: sectionName,
          keyword: keyword,
          index: match.index,
        });
      }
    }
  }

  // Sort by position in text
  headerMatches.sort((a, b) => a.index - b.index);

  console.log("=== SECTION IDENTIFICATION DEBUG ===");
  console.log("Total headers found:", headerMatches.length);
  for (const h of headerMatches) {
    console.log(`  - ${h.sectionName}: "${h.keyword}" at index ${h.index}`);
  }

  // Remove overlapping matches: if two keywords from the same section are very close,
  // keep only the longer one (e.g., keep "TECHNICAL SKILLS", discard "SKILLS")
  const uniqueMatches = [];
  for (let i = 0; i < headerMatches.length; i++) {
    const current = headerMatches[i];
    let skipCurrent = false;

    // Check if previous match is same section and within 20 chars (indicating overlap)
    if (i > 0) {
      const prev = headerMatches[i - 1];
      const distance = Math.abs(current.index - prev.index);
      if (current.sectionName === prev.sectionName && distance < 20) {
        // If current keyword is shorter, skip it (use the longer previous one)
        if (current.keyword.length < prev.keyword.length) {
          skipCurrent = true;
        }
      }
    }

    if (!skipCurrent) {
      uniqueMatches.push(current);
    }
  }

  console.log("After deduplication:", uniqueMatches.length);
  for (const h of uniqueMatches) {
    console.log(`  - ${h.sectionName}: "${h.keyword}" at index ${h.index}`);
  }

  // Extract content between consecutive section headers
  for (let i = 0; i < uniqueMatches.length; i++) {
    const currentHeader = uniqueMatches[i];
    const nextHeader = uniqueMatches[i + 1];

    // Content starts after the keyword
    let startIndex = currentHeader.index + currentHeader.keyword.length;
    // Content ends at the start of next keyword (or end of text)
    let endIndex = nextHeader ? nextHeader.index : text.length;

    let content = text.substring(startIndex, endIndex).trim();

    console.log(`\n${currentHeader.sectionName}:`);
    console.log(
      `  Start: ${startIndex}, End: ${endIndex}, Length: ${content.length}`
    );
    console.log(`  Preview: "${content.substring(0, 150)}..."`);

    // Only store the first occurrence of each section type
    // (in case the section header appears multiple times, we keep the earliest)
    if (!sections[currentHeader.sectionName] && content.length > 0) {
      sections[currentHeader.sectionName] = content;
    }
  }

  return sections;
}

function parseWorkExperience(text) {
  if (!text) return [];

  const jobs = [];

  // Strategy: Find date patterns to identify job entries
  // Format is typically: Position Title  Company Name  Date - Date  Description
  // The two dates are the key identifier for separate jobs

  // Find all date patterns like "June 2020 - Aug 2023" or "Sep. 2023 - Present"
  const datePattern =
    /([A-Z][a-z]+\.?\s+\d{4})\s*[-–—]\s*((?:[A-Z][a-z]+\.?\s+\d{4})|Present)/g;

  const dateMatches = [];
  let match;
  while ((match = datePattern.exec(text)) !== null) {
    dateMatches.push({
      startDate: match[1],
      endDate: match[2],
      index: match.index,
      length: match[0].length,
    });
  }

  if (dateMatches.length === 0) return [];

  // Process each date range
  for (let i = 0; i < dateMatches.length; i++) {
    const dateInfo = dateMatches[i];
    const nextDateInfo = dateMatches[i + 1];

    // Everything BEFORE this date is the job header (position/company info)
    let headerStart =
      i === 0 ? 0 : dateMatches[i - 1].index + dateMatches[i - 1].length;
    let headerEnd = dateInfo.index;
    let header = text.substring(headerStart, headerEnd).trim();

    // Everything AFTER this date until the next date is the job description
    let descStart = dateInfo.index + dateInfo.length;
    let descEnd = nextDateInfo ? nextDateInfo.index : text.length;
    let description = text.substring(descStart, descEnd).trim();

    // Parse header: Usually has position on one line, company on another (or same line)
    // Split by newline/bullet, and reverse-engineer position/company
    const headerLines = header
      .split(/[\n•]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.match(/^\s*$/));

    // Typically: first line is position, second is company
    // OR: first line contains "Position Title | Company Name"
    let position = "";
    let company = "";

    if (headerLines.length >= 2) {
      position = headerLines[0];
      company = headerLines[1];
    } else if (headerLines.length === 1) {
      // Single line - might have pipe separator or just one piece of info
      const line = headerLines[0];
      if (line.includes("|")) {
        const parts = line.split("|").map((p) => p.trim());
        position = parts[0] || "";
        company = parts[1] || "";
      } else {
        // Assume it's the position, company will be empty
        position = line;
      }
    }

    // Remove location from description (e.g., "Chennai, India")
    const locationRemoved = description.replace(
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)\b\s*/,
      ""
    );

    jobs.push({
      position: position || "Position",
      company: company || "Company",
      startDate: dateInfo.startDate,
      endDate: dateInfo.endDate,
      summary: locationRemoved.trim(),
    });
  }

  return jobs;
}

function parseEducation(text) {
  if (!text) return [];

  const education = [];

  // Each line of text contains one education entry
  // Format typically: Institution Location Degree Field Year
  // e.g.: "DePaul University Chicago, Illinois Bachelor of Science in Computer Science May 2016"

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && l.length > 10); // Skip tiny lines

  for (const line of lines) {
    // Extract location (City, State or City, Country pattern)
    const locationMatch = line.match(
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z][a-z]+|[A-Z]{2}|[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b/
    );
    const location = locationMatch ? locationMatch[0] : "";

    // Extract year (4-digit starting with 2)
    const yearMatch = line.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : "";

    // Detect degree type
    let studyType = "Degree";
    if (/\bMaster['']?s?\b/i.test(line)) {
      studyType = "Master's";
    } else if (/\bBachelor['']?s?\b/i.test(line)) {
      studyType = "Bachelor's";
    } else if (/\b(PhD|Doctorate)\b/i.test(line)) {
      studyType = "Doctorate";
    }

    // Extract the field of study by looking for "Bachelor/Master [of|in] FIELD"
    let area = "";
    const fieldPattern =
      /(?:Bachelor|Master|PhD)['']?s?(?:\s+(?:of|in))?\s+([^,]+?)(?:\s+(?:in|from|,|\d{4}|May|June|July|August|September|October|November|December))/i;
    const fieldMatch = line.match(fieldPattern);
    if (fieldMatch) {
      area = fieldMatch[1].trim();
    }

    // If no field extracted, try simpler pattern
    if (!area) {
      const simpleFieldPattern =
        /(?:Science|Technology|Engineering|Arts|Business|Medicine|Law)[\w\s]*/i;
      const simpleMatch = line.match(simpleFieldPattern);
      if (simpleMatch) {
        area = simpleMatch[0].trim();
      }
    }

    // Extract institution - everything before the location
    let institution = line;
    if (locationMatch) {
      institution = line.substring(0, locationMatch.index).trim();
    }

    // Clean up institution name - remove degree and field info
    institution = institution.replace(/Bachelor[\w\s]+/i, "");
    institution = institution.replace(/Master[\w\s]+/i, "");
    institution = institution.replace(/of|in|and|,/g, "").trim();

    // If institution is still very long, try to extract just the school name
    if (institution.length > 50) {
      const nameMatch = institution.match(
        /^([A-Z][A-Za-z\s]+?)\s+(?:[A-Z][a-z]+)?(?:\s+[A-Z][a-z]+)?$/
      );
      if (nameMatch) {
        institution = nameMatch[1].trim();
      }
    }

    // Only add if we have meaningful data
    if (institution.length > 3) {
      education.push({
        institution: institution,
        studyType: studyType,
        area: area || "Education",
        startDate: "",
        endDate: year,
        location: location,
      });
    }
  }

  return education;
}

function parseSkills(text) {
  if (!text) return [];

  const skills = [];

  // Split by lines, clean up whitespace
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.match(/^\s*$/));

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Clean up collapsed whitespace - replace excessive spaces with single space
    line = line.replace(/\s+/g, " ").trim();

    // Skip empty lines or lines that are too short
    if (line.length < 3) continue;

    // Check if line has a category (e.g., "Programming Languages: Java, Python")
    const colonIndex = line.indexOf(":");
    if (colonIndex > 0) {
      const name = line.substring(0, colonIndex).trim();
      const keywordsStr = line.substring(colonIndex + 1).trim();

      // Split keywords by comma, semicolon, pipe, or bullet
      const keywords = keywordsStr
        .split(/[,;•|]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.match(/^\s*$/));

      if (keywords.length > 0) {
        skills.push({
          name: name,
          keywords: keywords,
        });
      }
    } else {
      // Just a list of skills without a category header
      const keywords = line
        .split(/[,;•|]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.match(/^\s*$/));

      if (keywords.length > 0) {
        skills.push({
          name: "Skills",
          keywords: keywords,
        });
      }
    }
  }

  return skills;
}

function parseProjects(text) {
  if (!text) return [];

  const projects = [];

  // Strategy: Find all patterns like "Project Name | Technology1, Technology2"
  // A project title is followed by description with bullet points
  // This handles malformed PDF text where everything is on one line

  // Regex to find: [Project Title] | [Technologies]
  // The project title is typically capitalized words
  const projectTitleRegex =
    /([A-Z][A-Za-z0-9\s]+(?:[A-Z][A-Za-z0-9\s]+)*)\s*\|\s*([^•]+?)(?=•|(?:[A-Z][A-Za-z0-9\s]+(?:[A-Z][A-Za-z0-9\s]+)*\s*\|)|$)/g;

  let match;
  const matches = [];

  while ((match = projectTitleRegex.exec(text)) !== null) {
    matches.push({
      title: match[1].trim(),
      tech: match[2].trim(),
      index: match.index,
      length: match[0].length,
    });
  }

  // Extract descriptions between consecutive projects
  for (let i = 0; i < matches.length; i++) {
    const currentMatch = matches[i];
    const nextMatch = matches[i + 1];

    // Description starts right after the current match
    let descStart = currentMatch.index + currentMatch.length;
    // Description ends at the start of next project or end of text
    let descEnd = nextMatch ? nextMatch.index : text.length;

    let description = text.substring(descStart, descEnd).trim();

    // Clean up description: remove bullets and collapse spaces
    description = description
      .replace(/^•\s*/gm, "") // Remove bullet points
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .trim();

    projects.push({
      name: currentMatch.title,
      keywords: currentMatch.tech
        .split(/[,;]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      summary: description,
    });
  }

  return projects;
}

// ==================== UI UPDATES ====================
function updateDataSection() {
  // Update raw text
  document.getElementById("rawOutput").value = STATE.rawText;

  // Update JSON
  document.getElementById("jsonOutput").value = JSON.stringify(
    STATE.resumeData,
    null,
    2
  );

  // Update preview
  updateDataPreview();
}

function updateDataPreview() {
  const preview = document.getElementById("dataPreview");
  const data = STATE.resumeData;

  let html = "";

  // Basics
  html += '<div class="info-group">';
  html += "<h3>Basic Information</h3>";
  html += `<p><strong>Name:</strong> ${data.basics.name}</p>`;
  if (data.basics.label)
    html += `<p><strong>Title:</strong> ${data.basics.label}</p>`;
  if (data.basics.email)
    html += `<p><strong>Email:</strong> ${data.basics.email}</p>`;
  if (data.basics.phone)
    html += `<p><strong>Phone:</strong> ${data.basics.phone}</p>`;
  if (data.basics.location)
    html += `<p><strong>Location:</strong> ${data.basics.location}</p>`;
  html += "</div>";

  // Summary
  if (data.basics.summary) {
    html += '<div class="info-group">';
    html += "<h3>Summary</h3>";
    html += `<p>${data.basics.summary}</p>`;
    html += "</div>";
  }

  // Work
  if (data.work && data.work.length > 0) {
    html += '<div class="info-group">';
    html += "<h3>Experience</h3>";
    html += `<p>${data.work.length} position(s) found</p>`;
    html += "</div>";
  }

  // Education
  if (data.education && data.education.length > 0) {
    html += '<div class="info-group">';
    html += "<h3>Education</h3>";
    html += `<p>${data.education.length} degree(s) found</p>`;
    html += "</div>";
  }

  // Skills
  if (data.skills && data.skills.length > 0) {
    html += '<div class="info-group">';
    html += "<h3>Skills</h3>";
    html += `<p>${data.skills.length} skill category/ies found</p>`;
    html += "</div>";
  }

  // Projects
  if (data.projects && data.projects.length > 0) {
    html += '<div class="info-group">';
    html += "<h3>Projects</h3>";
    html += `<p>${data.projects.length} project(s) found</p>`;
    html += "</div>";
  }

  preview.innerHTML = html;
}

function resetDataSection() {
  document.getElementById("rawOutput").value = "";
  document.getElementById("jsonOutput").value = "";
  document.getElementById("dataPreview").innerHTML =
    '<div class="empty-state"><p>📋 Upload and parse a PDF to see structured data</p></div>';
}

function enableTemplates() {
  const templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.disabled = false;
  });
}

function disableTemplates() {
  const templateCards = document.querySelectorAll(".template-card");
  templateCards.forEach((card) => {
    card.disabled = true;
    card.classList.remove("active");
  });

  document.getElementById("exportBtn").disabled = true;
  document.getElementById("downloadJsonBtn").disabled = true;
  document.getElementById("printBtn").disabled = true;
}

function resetPreview() {
  const container = document.getElementById("resumeContainer");
  container.innerHTML = `
    <div class="empty-state large">
      <div class="empty-icon">📄</div>
      <h3>No Template Applied</h3>
      <p>Upload your PDF resume and select a template to see the preview</p>
    </div>
  `;
}

// ==================== TAB SWITCHING ====================
function handleTabSwitch(e) {
  const targetTab = e.currentTarget.dataset.tab;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  e.currentTarget.classList.add("active");

  // Update tab content
  document.querySelectorAll(".tab-content").forEach((content) => {
    content.classList.remove("active");
  });

  const contentMap = {
    preview: "previewTab",
    json: "jsonTab",
    raw: "rawTab",
  };

  document.getElementById(contentMap[targetTab]).classList.add("active");
}

// ==================== TEMPLATE SELECTION ====================
function handleTemplateSelect(e) {
  const card = e.currentTarget;
  const templateName = card.dataset.template;

  // Allow selecting templates even when no resume is parsed so users can preview styles.

  // Update active state
  document.querySelectorAll(".template-card").forEach((c) => {
    c.classList.remove("active");
  });
  card.classList.add("active");

  // Render template
  STATE.currentTemplate = templateName;
  renderCurrentTemplate();

  // Enable export buttons only if we have parsed resume data
  const hasData = !!STATE.resumeData;
  document.getElementById("exportBtn").disabled = !hasData;
  document.getElementById("downloadJsonBtn").disabled = !hasData;
  document.getElementById("printBtn").disabled = !hasData;
}

function renderCurrentTemplate() {
  const container = document.getElementById("resumeContainer");
  // Use real parsed data when available; otherwise render a friendly sample so the user sees the design
  const dataToRender = STATE.resumeData || SAMPLE_DATA;
  const result = renderTemplate(STATE.currentTemplate, dataToRender);
  // result is { html, css }
  container.innerHTML = result.html || "";
  STATE.lastRender = result;
}

// ==================== EXPORT & PRINT ====================
function handleExport() {
  if (!STATE.resumeData || !STATE.currentTemplate) {
    alert("Please select a template first.");
    return;
  }
  const renderResult = renderTemplate(STATE.currentTemplate, STATE.resumeData);
  const resumeHTML = renderResult.html || "";
  const resumeCSS = renderResult.css || "";

  const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${STATE.resumeData.basics.name} - Resume</title>
  <style>
    body {
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    @media print { body { padding: 0; } }
    ${resumeCSS}
  </style>
</head>
<body>
  ${resumeHTML}
</body>
</html>
  `;

  // Create download
  const blob = new Blob([fullHTML], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${STATE.resumeData.basics.name.replace(/\s+/g, "_")}_${
    STATE.currentTemplate
  }_resume.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function handlePrint() {
  if (!STATE.resumeData || !STATE.currentTemplate) {
    alert("Please select a template first.");
    return;
  }

  window.print();
}

function handleDownloadJSON() {
  if (!STATE.resumeData) {
    alert("No resume data to download. Please parse a resume first.");
    return;
  }

  const content = JSON.stringify(STATE.resumeData, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${STATE.resumeData.basics.name.replace(
    /\s+/g,
    "_"
  )}_resume.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ==================== UTILITY FUNCTIONS ====================
function copyToClipboard(elementId, btn) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Select and copy
  element.select();
  document.execCommand("copy");

  // Visual feedback
  const copyBtn = btn || document.activeElement;
  if (copyBtn && copyBtn.classList && copyBtn.classList.contains("btn-copy")) {
    const originalHTML = copyBtn.innerHTML;
    copyBtn.innerHTML = "<span>✓</span> Copied!";
    copyBtn.style.color = "var(--success)";

    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      copyBtn.style.color = "";
    }, 2000);
  }
}
