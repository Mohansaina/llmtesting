import './style.css';

// DOM Elements
const app = document.getElementById('app');

// Navigation scroll functionality
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Mock LLM response generator
function generateMockResponse(question) {
  // Simple mock that echoes parts of the question
  const words = question.split(' ');
  if (words.length > 10) {
    return `Based on your inquiry about "${words.slice(0, 3).join(' ')}", I can confirm that our support team handles these requests efficiently. Our policy ensures that ${words[Math.floor(words.length/2)] || 'customer'} concerns are addressed promptly.`;
  } else {
    return `Thank you for your question about "${question}". Our team specializes in resolving these matters. We guarantee a response within 24 hours for all ${words[0] || 'support'} related inquiries.`;
  }
}

// Calculate text overlap score
function calculateTextOverlap(expected, actual) {
  const expectedWords = expected.toLowerCase().split(/\s+/);
  const actualWords = actual.toLowerCase().split(/\s+/);
  
  const expectedSet = new Set(expectedWords);
  const actualSet = new Set(actualWords);
  
  let overlap = 0;
  for (const word of expectedSet) {
    if (actualSet.has(word)) {
      overlap++;
    }
  }
  
  return expectedWords.length > 0 ? overlap / expectedWords.length : 0;
}

// Check missing keywords
function findMissingKeywords(response, keywords) {
  if (!keywords.trim()) return [];
  
  const keywordList = keywords.split(',').map(k => k.trim().toLowerCase());
  const responseLower = response.toLowerCase();
  
  return keywordList.filter(keyword => !responseLower.includes(keyword));
}

// Calculate final score
function calculateScore(keywordCoverage, textOverlap) {
  // 70% keyword coverage, 30% text overlap
  return Math.round((keywordCoverage * 0.7 + textOverlap * 0.3) * 100);
}

// Process test results
function processTestResults(question, expectedAnswer, llmAnswer, keywords) {
  const missingKeywords = findMissingKeywords(llmAnswer, keywords);
  const textOverlap = calculateTextOverlap(expectedAnswer, llmAnswer);
  
  // Keyword coverage: 1 - (missing keywords / total keywords)
  const keywordCoverage = keywords.trim() ? 
    (keywords.split(',').length - missingKeywords.length) / keywords.split(',').length : 
    1;
  
  const score = calculateScore(keywordCoverage, textOverlap);
  const status = score >= 75 ? 'PASS' : 'FAIL';
  
  return {
    llmAnswer,
    score,
    status,
    missingKeywords,
    remark: status === 'PASS' ? 
      'PASS: All required keywords present.' : 
      `FAIL: Missing keywords: ${missingKeywords.join(', ')}.`
  };
}

// Handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const question = formData.get('question');
  const expectedAnswer = formData.get('expectedAnswer');
  const keywords = formData.get('keywords');
  const mode = formData.get('mode');
  
  let llmAnswer;
  
  if (mode === 'openai') {
    try {
      const response = await fetch('/api/llm-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question,
          expectedAnswer,
          mustIncludeKeywords: keywords
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        llmAnswer = data.answer;
      } else {
        // Fallback to mock if OpenAI is not configured
        console.warn('OpenAI not configured, falling back to mock:', data.error);
        llmAnswer = generateMockResponse(question);
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      llmAnswer = generateMockResponse(question);
    }
  } else {
    // Mock mode
    llmAnswer = generateMockResponse(question);
  }
  
  const results = processTestResults(question, expectedAnswer, llmAnswer, keywords);
  displayResults(results);
}

// Display results
function displayResults(results) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = `
    <div class="results-card">
      <h3>Test Results</h3>
      <div class="result-item">
        <strong>LLM Answer:</strong>
        <p>${results.llmAnswer}</p>
      </div>
      <div class="result-item score">
        <strong>Score:</strong>
        <span class="score-value">${results.score}/100</span>
      </div>
      <div class="result-item status">
        <strong>Status:</strong>
        <span class="status-badge ${results.status.toLowerCase()}">${results.status}</span>
      </div>
      <div class="result-item">
        <strong>Missing Keywords:</strong>
        <p>${results.missingKeywords.length > 0 ? results.missingKeywords.join(', ') : 'None'}</p>
      </div>
      <div class="result-item">
        <strong>Remark:</strong>
        <p>${results.remark}</p>
      </div>
    </div>
  `;
}

// Render the application
function renderApp() {
  app.innerHTML = `
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">LLM Debugger</div>
        <ul class="nav-links">
          <li><a href="#" onclick="scrollToSection('home')">Home</a></li>
          <li><a href="#" onclick="scrollToSection('how-it-works')">How It Works</a></li>
          <li><a href="#" onclick="scrollToSection('demo')">Demo</a></li>
          <li><a href="#" onclick="scrollToSection('about')">About</a></li>
          <li><a href="#" onclick="scrollToSection('contact')">Contact</a></li>
        </ul>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container">
        <h1>Debug and Test Your LLM Support Flows</h1>
        <p class="subtitle">A tool that tests LLM responses against expected answers and business rules for customer support.</p>
        <button class="cta-button" onclick="scrollToSection('demo')">Try the Demo</button>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <h2>How It Works</h2>
        <div class="cards">
          <div class="card">
            <div class="icon">📥</div>
            <h3>Input</h3>
            <p>Support questions + expected answers</p>
          </div>
          <div class="card">
            <div class="icon">🤖</div>
            <h3>LLM Response</h3>
            <p>Model answers each question</p>
          </div>
          <div class="card">
            <div class="icon">📊</div>
            <h3>Analysis</h3>
            <p>Scores, missing keywords, pass/fail</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Demo Section -->
    <section id="demo" class="demo">
      <div class="container">
        <h2>Interactive Demo</h2>
        <div class="demo-panel">
          <form id="test-form">
            <div class="form-group">
              <label for="question">Question:</label>
              <textarea id="question" name="question" placeholder="Enter a customer support question..." required>How do I track my order refund?</textarea>
            </div>
            
            <div class="form-group">
              <label for="expectedAnswer">Expected Answer:</label>
              <textarea id="expectedAnswer" name="expectedAnswer" placeholder="Enter the expected answer..." required>To track your order refund, please provide your order number and we will check the status of your refund within 24 hours.</textarea>
            </div>
            
            <div class="form-group">
              <label for="keywords">Must include keywords (comma separated):</label>
              <input type="text" id="keywords" name="keywords" placeholder="e.g., refund, order, tracking" value="refund, order, tracking">
            </div>
            
            <div class="form-group">
              <label for="mode">Mode:</label>
              <select id="mode" name="mode">
                <option value="mock">Mock LLM</option>
                <option value="openai">OpenAI (if configured)</option>
              </select>
            </div>
            
            <button type="submit" class="run-button">Run Test</button>
          </form>
          
          <div id="results-container" class="results-container">
            <!-- Results will appear here -->
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2>About This Project</h2>
        <p>This is a personal project designed to test and debug LLM-based customer support agents. It's inspired by real-world workflows where AI agents must follow strict business rules.</p>
        <div class="tech-list">
          <h3>Tech Used</h3>
          <ul>
            <li>HTML, CSS, JavaScript</li>
            <li>Vite (Frontend Build Tool)</li>
            <li>Node.js + Express (Backend)</li>
            <li>OpenAI API (Optional)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <h2>Contact</h2>
        <p>Built by [Your Name]. Connect with me on:</p>
        <div class="contact-links">
          <a href="#" class="contact-link">LinkedIn</a>
          <a href="#" class="contact-link">Email</a>
          <a href="#" class="contact-link">GitHub</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2023 LLM Customer Support Flow Debugger. All rights reserved.</p>
      </div>
    </footer>
  `;
  
  // Add event listener to form
  const form = document.getElementById('test-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  
  // Make scrollToSection available globally for inline handlers
  window.scrollToSection = scrollToSection;
});