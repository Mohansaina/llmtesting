(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const u=document.getElementById("app");function p(o){const e=document.getElementById(o);e&&e.scrollIntoView({behavior:"smooth"})}function l(o){const e=o.split(" ");return e.length>10?`Based on your inquiry about "${e.slice(0,3).join(" ")}", I can confirm that our support team handles these requests efficiently. Our policy ensures that ${e[Math.floor(e.length/2)]||"customer"} concerns are addressed promptly.`:`Thank you for your question about "${o}". Our team specializes in resolving these matters. We guarantee a response within 24 hours for all ${e[0]||"support"} related inquiries.`}function m(o,e){const s=o.toLowerCase().split(/\s+/),n=e.toLowerCase().split(/\s+/),t=new Set(s),r=new Set(n);let i=0;for(const a of t)r.has(a)&&i++;return s.length>0?i/s.length:0}function f(o,e){if(!e.trim())return[];const s=e.split(",").map(t=>t.trim().toLowerCase()),n=o.toLowerCase();return s.filter(t=>!n.includes(t))}function h(o,e){return Math.round((o*.7+e*.3)*100)}function v(o,e,s,n){const t=f(s,n),r=m(e,s),i=n.trim()?(n.split(",").length-t.length)/n.split(",").length:1,a=h(i,r),c=a>=75?"PASS":"FAIL";return{llmAnswer:s,score:a,status:c,missingKeywords:t,remark:c==="PASS"?"PASS: All required keywords present.":`FAIL: Missing keywords: ${t.join(", ")}.`}}async function g(o){o.preventDefault();const e=new FormData(o.target),s=e.get("question"),n=e.get("expectedAnswer"),t=e.get("keywords"),r=e.get("mode");let i;if(r==="openai")try{const c=await fetch("/api/llm-test",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:s,expectedAnswer:n,mustIncludeKeywords:t})}),d=await c.json();c.ok?i=d.answer:(console.warn("OpenAI not configured, falling back to mock:",d.error),i=l(s))}catch(c){console.error("Error calling OpenAI API:",c),i=l(s)}else i=l(s);const a=v(s,n,i,t);w(a)}function w(o){const e=document.getElementById("results-container");e.innerHTML=`
    <div class="results-card">
      <h3>Test Results</h3>
      <div class="result-item">
        <strong>LLM Answer:</strong>
        <p>${o.llmAnswer}</p>
      </div>
      <div class="result-item score">
        <strong>Score:</strong>
        <span class="score-value">${o.score}/100</span>
      </div>
      <div class="result-item status">
        <strong>Status:</strong>
        <span class="status-badge ${o.status.toLowerCase()}">${o.status}</span>
      </div>
      <div class="result-item">
        <strong>Missing Keywords:</strong>
        <p>${o.missingKeywords.length>0?o.missingKeywords.join(", "):"None"}</p>
      </div>
      <div class="result-item">
        <strong>Remark:</strong>
        <p>${o.remark}</p>
      </div>
    </div>
  `}function y(){u.innerHTML=`
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
  `;const o=document.getElementById("test-form");o&&o.addEventListener("submit",g)}document.addEventListener("DOMContentLoaded",()=>{y(),window.scrollToSection=p});
