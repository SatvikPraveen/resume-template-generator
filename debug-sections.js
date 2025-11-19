// Debug: Test section extraction with actual resume text

const simulatedText = `Shanmuga Priya Kannan 872-330-3203 shanmugapriyakannan019@gmail.com https://www.linkedin.com/in/shanmuga-priya-k-95400a194 Computer Science graduate student with 3+ years of experience as a ServiceNow Developer specializing in ITSM, integrations, and workflow automation. Skilled in Java, Python, cloud platforms, and data analytics with hands-on project experience in machine learning and market analysis. EDUCATION DePaul University Sep. 2023 - June 2025 Master's in Computer Science Chicago, USA Velammal Engineering College June. 2016 - April 2020 Bachelor of Technology in Information Technology Chennai, India EXPERIENCE Senior Service-now Developer (Autodesk, Fortive) June 2020 - Aug 2023 Cognizant Technology Solutions (Associate) Chennai, India Senior ServiceNow Developer with 3+ years of ITSM experience, specializing in CMDB and Event Management for clients like Autodesk and Fortive Developed REST APIs and created 30+ custom workflows and catalog items to automate incident, request, and change processes in ServiceNow Integrated third-party tools such as SAP, QlikView, and Azure, improving platform interoperability and automating cross-system data flows Resolved over 600 incidents and service requests by collaborating with clients to understand requirements and deliver tailored solutions Managed development tasks using Jira and contributed to agile delivery cycles through hands-on design, debugging, testing, and deployment of 60+ client-facing features PROJECTS Shopping System | Java, Eclipse Developed user authentication and product catalog features to enhance security and streamline shopping. Outcome: Reduced login issues and browsing delays, improving system usability.. Market Analysis of Google Play Store Apps | Excel, Tableau, R Analyzed app store data to identify trends and provide insights for developers and marketers. Outcome: Identified top-performing app categories, helping guide feature focus and marketing strategies. Real Estate Price Trend Analysis | Excel, R Performed regression and time-series analysis on Connecticut housing data to forecast pricing. Outcome: Improved price prediction accuracy and helped isolate location-based impact on pricing. Lung Cancer Risk Prediction Using ML | Python, Jupyter Notebook, Excel Built and evaluated Naive Bayes, Random Forest, and KNN classifiers on a 220K+ record dataset. Outcome: Boosted high-risk detection by 25% using oversampling and feature selection. NYC Taxi Fare Prediction Pipeline | PySpark, AWS EMR, Athena Built a distributed ML pipeline to process 12M+ trip records and predict fares using Spark MLlib. Outcome: Achieved RMSE of ~10.2; automated visualization and reporting via Matplotlib and S3. TECHNICAL SKILLS Programming Languages: C/C++, Java, Python, R, and SQL Web Development: HTML/CSS, JavaScript, Node.js Tools & Platforms: Git, Docker, AWS (EMR, S3, Athena, SageMaker), GCP, VS Code, Eclipse, JIRA, Step Functions, SNS Data & Analytics: Pandas, NumPy, Matplotlib, Seaborn, Excel, Tableau, Power BI, RStudio, Regression, Exploratory Data Analysis (EDA), Time Series Analysis ML & Big Data: Machine Learning, Spark (PySpark, MLlib), Hadoop, Distributed, Model Evaluation, Algorithms ServiceNow: ITSM, CMDB, Service Catalog, REST APIs, JSON, XML, Flow Design, Integration`;

// OLD regex patterns (FAILING)
const oldRegexes = {
  education:
    /(?:education|academic|qualifications|degrees|academic\s+background|educational\s+background)[\s\S]*?(?=(?:experience|employment|career|projects|skills|technical|certifications|languages|$))/i,
  experience:
    /(?:professional\s+experience|work\s+experience|employment|career|experience|work\s+history|professional\s+history)[\s\S]*?(?=(?:projects|skills|technical|certifications|languages|education|$))/i,
  projects:
    /(?:projects|portfolio|key\s+projects|notable\s+projects|personal\s+projects)[\s\S]*?(?=(?:skills|technical|certifications|languages|experience|education|$))/i,
  skills:
    /(?:skills|competencies|technical\s+skills|core\s+competencies|technical\s+competencies|key\s+skills)[\s\S]*?(?=(?:experience|employment|career|certifications|languages|projects|education|$))/i,
};

console.log("===== TESTING OLD REGEX PATTERNS =====\n");

// Test EDUCATION with old regex
console.log("--- OLD: EDUCATION ---");
let match = simulatedText.match(oldRegexes.education);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Start: ${match[0].substring(0, 100)}...`);
  console.log(`Contains "EXPERIENCE": ${match[0].includes("EXPERIENCE")}`);
  console.log(`Contains "PROJECTS": ${match[0].includes("PROJECTS")}`);
  console.log(`Contains "SKILLS": ${match[0].includes("SKILLS")}`);
  console.log(`End: ...${match[0].substring(match[0].length - 100)}`);
} else {
  console.log("NO MATCH");
}

// Test EXPERIENCE with old regex
console.log("\n--- OLD: EXPERIENCE ---");
match = simulatedText.match(oldRegexes.experience);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Start: ${match[0].substring(0, 100)}...`);
  console.log(`Contains "PROJECTS": ${match[0].includes("PROJECTS")}`);
  console.log(`Contains "SKILLS": ${match[0].includes("SKILLS")}`);
  console.log(`End: ...${match[0].substring(match[0].length - 100)}`);
} else {
  console.log("NO MATCH");
}

// Test PROJECTS with old regex
console.log("\n--- OLD: PROJECTS ---");
match = simulatedText.match(oldRegexes.projects);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Start: ${match[0].substring(0, 100)}...`);
  console.log(`Contains "SKILLS": ${match[0].includes("SKILLS")}`);
  console.log(`End: ...${match[0].substring(match[0].length - 100)}`);
} else {
  console.log("NO MATCH");
}

// Test SKILLS with old regex
console.log("\n--- OLD: SKILLS ---");
match = simulatedText.match(oldRegexes.skills);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Start: ${match[0].substring(0, 100)}...`);
  console.log(`End: ...${match[0].substring(match[0].length - 100)}`);
} else {
  console.log("NO MATCH");
}

// ===== NEW IMPROVED REGEX PATTERNS =====
// Key fix: Process sections in ORDER (top-down) and use ORDERED lookaheads
// This prevents earlier sections from capturing content meant for later sections

const newRegexes = {
  summary:
    /(?:^|^.*?)(professional\s+summary|summary|objective|profile|overview|about me)[\s\S]*?(?=(?:education|academic|qualifications|experience|employment|career|projects|portfolio|skills|technical|certifications|languages)(?:\s|$|[^a-z]))/i,

  education:
    /(?:^|.*?)(education|academic|qualifications|degrees|academic\s+background|educational\s+background)[\s\S]*?(?=(?:experience|employment|career|projects|portfolio|skills|technical|certifications|languages)(?:\s|$|[^a-z]))/i,

  experience:
    /(?:^|.*?)(professional\s+experience|work\s+experience|employment|career|experience|work\s+history|professional\s+history)[\s\S]*?(?=(?:projects|portfolio|skills|technical|certifications|languages)(?:\s|$|[^a-z]))/i,

  projects:
    /(?:^|.*?)(projects|portfolio|key\s+projects|notable\s+projects|personal\s+projects)[\s\S]*?(?=(?:skills|technical|certifications|languages)(?:\s|$|[^a-z]))/i,

  skills:
    /(?:^|.*?)(technical\s+skills|skills|competencies|core\s+competencies|technical\s+competencies|key\s+skills)[\s\S]*?(?=(?:certifications|languages|$))/i,

  certifications:
    /(?:^|.*?)(certifications|licenses|certificates|professional\s+certifications)[\s\S]*?(?=(?:languages|$))/i,

  languages: /(?:^|.*?)(languages|language)[\s\S]*?$/i,
};

console.log("\n\n===== TESTING NEW REGEX PATTERNS =====\n");

// Test EDUCATION with new regex
console.log("--- NEW: EDUCATION ---");
match = simulatedText.match(newRegexes.education);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Full match:\n${match[0]}`);
  console.log(`Contains "EXPERIENCE": ${match[0].includes("EXPERIENCE")}`);
  console.log(`Contains "PROJECTS": ${match[0].includes("PROJECTS")}`);
} else {
  console.log("NO MATCH");
}

// Test EXPERIENCE with new regex
console.log("\n--- NEW: EXPERIENCE ---");
match = simulatedText.match(newRegexes.experience);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Full match:\n${match[0]}`);
  console.log(`Contains "PROJECTS": ${match[0].includes("PROJECTS")}`);
  console.log(`Contains "SKILLS": ${match[0].includes("SKILLS")}`);
} else {
  console.log("NO MATCH");
}

// Test PROJECTS with new regex
console.log("\n--- NEW: PROJECTS ---");
match = simulatedText.match(newRegexes.projects);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Full match:\n${match[0]}`);
  console.log(`Contains "SKILLS": ${match[0].includes("SKILLS")}`);
} else {
  console.log("NO MATCH");
}

// Test SKILLS with new regex
console.log("\n--- NEW: SKILLS ---");
match = simulatedText.match(newRegexes.skills);
if (match) {
  console.log(`Length: ${match[0].length}`);
  console.log(`Full match:\n${match[0]}`);
} else {
  console.log("NO MATCH");
}
