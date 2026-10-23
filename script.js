
// ===========================================
// EMINDFUL_EDUCATION - MAIN JAVASCRIPT
// ===========================================

// FUTURE BACKEND CONFIGURATION
// These are placeholders, not active endpoints.

const CONFIG = {
  apiBaseUrl: "",
  whatsappNumber: "",
  backendEnabled: false
};

// ===========================================
// PROGRAMME DATA
// ===========================================

const programmes = [
  {
    id: "tuition",
    title: "Online Tuition",
    icon: "🎓",
    description:
      "Robotics and AI theory, Python, 10 Tinkercad projects, AI Project Cycle and assignments.",
    fee: "₹2,500/month",
    advance: "₹5,000 advance for 2 months",
    boards: ["ICSE", "CBSE"],
    classes: ["9", "10"],
    section: "tuition"
  },
  {
    id: "crash",
    title: "Crash Course",
    icon: "🚀",
    description:
      "Two-month intensive programme with theory, advanced Python, Tinkercad, AI Project Cycle and assignments.",
    fee: "₹6,000/month",
    advance: "₹12,000 advance",
    boards: ["ICSE", "CBSE"],
    classes: ["9", "10"],
    section: "crash"
  },
  {
    id: "mock",
    title: "Mock Test Programme",
    icon: "📝",
    description:
      "10 individual mock-test slots with planned answer uploads and corrected-script access.",
    fee: "₹1,000/test",
    advance: "Advance payment per test",
    boards: ["ICSE", "CBSE"],
    classes: ["9", "10"],
    section: "tests"
  },
  {
    id: "materials",
    title: "Study Material",
    icon: "📚",
    description:
      "Learning notes, Python practice, robotics resources, AI projects and revision material.",
    fee: "Package pricing pending",
    advance: "Payment-based access",
    boards: ["ICSE", "CBSE"],
    classes: ["9", "10"],
    section: "materials"
  }
];

// ===========================================
// NAVIGATION
// ===========================================

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
  const opened = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.textContent = opened ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// ===========================================
// COURSE FILTERS
// ===========================================

const boardFilter = document.getElementById("boardFilter");
const classFilter = document.getElementById("classFilter");
const programmeGrid = document.getElementById("programmeGrid");

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderProgrammes() {
  const board = boardFilter.value;
  const classLevel = classFilter.value;

  programmeGrid.replaceChildren();

  const filtered = programmes.filter(item => {
    const boardMatch =
      board === "all" || item.boards.includes(board);
    const classMatch =
      classLevel === "all" || item.classes.includes(classLevel);
    return boardMatch && classMatch;
  });

  filtered.forEach(item => {
    const card = makeElement("article", "programme-card");

    const icon = makeElement("div", "programme-icon", item.icon);
    const heading = makeElement("h3", "", item.title);
    const description = makeElement("p", "", item.description);

    const price = makeElement("strong", "", item.fee);
    const advance = makeElement("p", "", item.advance);

    const meta = makeElement("div", "card-meta");
    const boardText =
      board === "all" ? "ICSE & CBSE" : board;
    const classText =
      classLevel === "all"
        ? "Classes 9 & 10"
        : `Class ${classLevel}`;

    meta.append(
      makeElement("span", "", boardText),
      makeElement("span", "", classText)
    );

    const link = makeElement("a", "button primary", "View Details →");
    link.href = `#${item.section}`;

    card.append(icon, heading, description, meta, price, advance, link);
    programmeGrid.appendChild(card);
  });
}

boardFilter.addEventListener("change", renderProgrammes);
classFilter.addEventListener("change", renderProgrammes);

renderProgrammes();

// ===========================================
// MOCK TEST DATA
// ===========================================

// Mock-test titles are placeholders.
// Question papers and corrected scripts will
// be stored securely in the backend later.

const mockTests = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Mock Test ${index + 1}`,
  price: 1000,
  paymentStatus: "not_verified",
  paperAvailable: false,
  submissionAvailable: false,
  correctionAvailable: false
}));

let activeTest = null;

const testGrid = document.getElementById("testGrid");
const selectedTest = document.getElementById("selectedTest");
const testStatus = document.getElementById("testStatus");
const paperButton = document.getElementById("paperButton");
const correctedButton = document.getElementById("correctedButton");
const answerUpload = document.getElementById("answerUpload");

function renderMockTests() {
  testGrid.replaceChildren();

  mockTests.forEach(test => {
    const card = makeElement("article", "test-card");

    card.append(
      makeElement("div", "programme-icon", "📝"),
      makeElement("h3", "", test.title),
      makeElement("p", "", "₹1,000 • Advance payment")
    );

    const button = makeElement("button", "", "View Test");
    button.type = "button";

    button.addEventListener("click", () => {
      selectMockTest(test.id);
    });

    card.appendChild(button);
    testGrid.appendChild(card);
  });
}

function selectMockTest(id) {
  activeTest = mockTests.find(test => test.id === id);

  if (!activeTest) return;

  selectedTest.textContent =
    `${activeTest.title} • Fee: ₹1,000 • Payment required`;

  // Never unlock files using only a front-end flag.
  paperButton.disabled = true;
  correctedButton.disabled = true;
  answerUpload.disabled = true;

  testStatus.textContent =
    "This is a preview. Student login, verified payment, " +
    "question-paper download, answer submission and " +
    "corrected-script download require backend integration.";

  document.getElementById("testWorkspace")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

renderMockTests();

// ===========================================
// STUDY MATERIAL LIBRARY
// ===========================================

const materials = [
  {
    title: "Robotics Theory Notes",
    icon: "🤖",
    description: "Robotics fundamentals, sensors and applications."
  },
  {
    title: "Artificial Intelligence Notes",
    icon: "🧠",
    description: "AI fundamentals, concepts and applications."
  },
  {
    title: "Python Programming",
    icon: "🐍",
    description: "Programming exercises and coding practice."
  },
  {
    title: "Tinkercad Projects",
    icon: "⚙️",
    description: "Project guides and simulation activities."
  },
  {
    title: "AI Project Cycle",
    icon: "🔄",
    description: "Guided project-cycle learning resources."
  },
  {
    title: "Assignments & Revision",
    icon: "📑",
    description: "Practice worksheets and revision resources."
  }
];

const materialGrid = document.getElementById("materialGrid");

function renderMaterials() {
  materialGrid.replaceChildren();

  materials.forEach(material => {
    const card = makeElement("article", "material-card");

    card.append(
      makeElement("div", "material-icon", material.icon),
      makeElement("h3", "", material.title),
      makeElement("p", "", material.description),
      makeElement("span", "tag", "🔒 Paid Resource")
    );

    const note = makeElement(
      "p", "",
      "Available after package purchase and verification."
    );

    card.appendChild(note);
    materialGrid.appendChild(card);
  });
}

renderMaterials();

// ===========================================
// COURSE ENQUIRY BUTTONS
// ===========================================

document.querySelectorAll("[data-enquire]").forEach(button => {
  button.addEventListener("click", () => {
    const programme = button.dataset.enquire;

    document.getElementById("programme").value = programme;

    document.getElementById("contact")
      .scrollIntoView({ behavior: "smooth" });
  });
});

// ===========================================
// ENQUIRY FORM
// ===========================================

const enquiryForm = document.getElementById("enquiryForm");
const enquiryStatus = document.getElementById("enquiryStatus");

enquiryForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!enquiryForm.reportValidity()) return;

  const formData = new FormData(enquiryForm);

  const enquiry = {
    studentName: String(formData.get("studentName")).trim(),
    parentName: String(formData.get("parentName")).trim(),
    email: String(formData.get("email")).trim(),
    phone: String(formData.get("phone")).trim(),
    board: String(formData.get("board")),
    classLevel: String(formData.get("studentClass")),
    programme: String(formData.get("programme")),
    message: String(formData.get("message") || "").trim()
  };

  if (!/^[6-9]\d{9}$/.test(enquiry.phone)) {
    enquiryStatus.textContent =
      "Please enter a valid 10-digit Indian mobile number.";
    return;
  }

  const message = [
    "Hello Emindful_Education,",
    "I would like to enquire about a programme.",
    "",
    `Student: ${enquiry.studentName}`,
    `Parent/Guardian: ${enquiry.parentName}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Board: ${enquiry.board}`,
    `Class: ${enquiry.classLevel}`,
    `Programme: ${enquiry.programme}`,
    `Questions: ${enquiry.message || "None"}`,
    "",
    "Please share the batch and enrolment details."
  ].join("\n");

  // Optional WhatsApp enquiry once a number is provided.
  if (/^[1-9]\d{9,14}$/.test(CONFIG.whatsappNumber)) {
    const url =
      `https://wa.me/${CONFIG.whatsappNumber}?text=` +
      encodeURIComponent(message);

    enquiryStatus.textContent =
      "Opening WhatsApp. Please review and send your enquiry.";

    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  // No backend and no WhatsApp configured.
  // Allow the visitor to copy the enquiry.
  // No personal information is stored in the browser.

  enquiryStatus.replaceChildren();

  const text = makeElement(
    "p", "",
    "Online submission is not active yet. " +
    "You can copy your enquiry below."
  );

  const copyButton = makeElement(
    "button", "button secondary", "Copy Enquiry"
  );
  copyButton.type = "button";

  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(message);
      copyButton.textContent = "Copied!";
    } catch {
      enquiryStatus.appendChild(
        makeElement(
          "p", "",
          "Clipboard unavailable. Please use the form details " +
          "to contact us when contact information is published."
        )
      );
    }
  });

  enquiryStatus.append(text, copyButton);
});

// ===========================================
// FOOTER
// ===========================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// ===========================================
// FUTURE BACKEND INTEGRATION PLAN
// ===========================================

// Later, connect the frontend to secure API routes:
//
// POST /api/enquiries
// POST /api/payments/create-order
// POST /api/payments/verify
// GET  /api/student/courses
// GET  /api/student/tests
// GET  /api/tests/:id/download
// POST /api/tests/:id/submissions
// GET  /api/tests/:id/correction
// GET  /api/materials/:id/download
//
// Authentication and payment verification must
// happen on the server.
//
// Never store payment secret keys in this file.
// Never rely on JavaScript alone to protect files.
//
// n8n can automate enquiry notifications,
// enrolment follow-ups, teacher notifications,
// and correction-ready notifications.
