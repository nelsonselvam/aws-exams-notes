// ─── THEME TOGGLE ───────────────────────────────────────────
window.toggleTheme = function() {
  const isLight = document.documentElement.classList.toggle('light');
  const toglbl = document.getElementById('toglbl');
  if (toglbl) toglbl.textContent = isLight ? '🌙 Dark' : '☀ Light';
  localStorage.setItem('saa-theme', isLight ? 'light' : 'dark');
};

(function() {
  if (localStorage.getItem('saa-theme') !== 'dark') {
    document.documentElement.classList.add('light');
    document.addEventListener('DOMContentLoaded', function() {
      const l = document.getElementById('toglbl');
      if (l) l.textContent = '🌙 Dark';
    });
  }
})();

// ─── CARD TOGGLE ────────────────────────────────────────────
window.tog = function(hdr) {
  hdr.closest('.card').classList.toggle('open');
};

// ─── DOMAIN SWITCHING ───────────────────────────────────────
const DOMAINS = [
  { id:'d0', pct:'25%', tasks:[
    {id:'t11',lbl:'1.1 — IAM & Access'},
    {id:'t12',lbl:'1.2 — Secure Workloads'},
    {id:'t13',lbl:'1.3 — Data Security'}
  ]},
  { id:'d1', pct:'51%', tasks:[
    {id:'t21',lbl:'2.1 — Scalable & Loosely Coupled'},
    {id:'t22',lbl:'2.2 — Highly Available & Fault-Tolerant'}
  ]},
  { id:'d2', pct:'75%', tasks:[
    {id:'t31',lbl:'3.1 — Storage'},
    {id:'t32',lbl:'3.2 — Compute'},
    {id:'t33',lbl:'3.3 — Databases'},
    {id:'t34',lbl:'3.4 — Networking'},
    {id:'t35',lbl:'3.5 — Data Ingestion'}
  ]},
  { id:'d3', pct:'100%', tasks:[
    {id:'t41',lbl:'4.1 — Storage'},
    {id:'t42',lbl:'4.2 — Compute'},
    {id:'t43',lbl:'4.3 — Databases'},
    {id:'t44',lbl:'4.4 — Networking'}
  ]}
];

let currentDomain = 0;

window.showDomain = function(idx) {
  // hide all domain sections
  document.querySelectorAll('.domain-section').forEach(s => s.classList.remove('active'));
  const targetDomain = document.getElementById(DOMAINS[idx].id);
  if (targetDomain) targetDomain.classList.add('active');
  
  // toggle domain tasks visibility
  document.querySelectorAll('.dtasks').forEach((s, i) => s.classList.toggle('active', i === idx));

  // update tabs
  document.querySelectorAll('.dtab').forEach((t,i) => t.classList.toggle('active', i === idx));
  
  // update progress bar
  const prog = document.getElementById('prog');
  if (prog) prog.style.width = DOMAINS[idx].pct;

  currentDomain = idx;
  window.scrollTo({top:0, behavior:'smooth'});
};

// nav task click → smooth scroll within current domain
window.navTask = function(navId) {
  const el = document.getElementById(navId);
  if (!el) return;
  const target = el.dataset.target;
  if (!target) return;
  const sec = document.getElementById(target);
  if (sec) sec.scrollIntoView({behavior:'smooth'});
};

// init
document.addEventListener('DOMContentLoaded', function() {
  window.showDomain(0);
  // open first card in each task section
  document.querySelectorAll('.task-section').forEach(sec => {
    const first = sec.querySelector('.card');
    if (first) first.classList.add('open');
  });
});

// smooth scroll for any in-page anchors (skip bare "#" hrefs)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// ─── MCQ RENDERING ───────────────────────────────────────────
window.renderMCQs = function() {
  if (!window.mcqData) return;
  const sections = document.querySelectorAll('.mcq-section-dynamic');
  sections.forEach(sec => {
    const taskId = sec.dataset.task;
    const questions = window.mcqData[taskId];
    if (!questions || !questions.length) return;
    
    const container = sec.querySelector('.mcq-dynamic-container');
    if (!container) return;
    
    let html = '';
    questions.forEach((q, i) => {
      let optionsHtml = '';
      q.options.forEach(opt => {
        optionsHtml += `<li><strong>${opt.letter}.</strong> ${opt.text}</li>`;
      });
      
      html += `
      <div class="mcq-container">
        <h4>Question ${i + 1} of ${questions.length}</h4>
        <div class="mcq-question">${q.question}</div>
        <ul class="mcq-options">
          ${optionsHtml}
        </ul>
        <details class="mcq-answer">
          <summary>Show Answer &amp; Explanation</summary>
          <p><strong>Correct Answer: ${q.answer}</strong></p>
          <p><strong>Explanation:</strong> ${q.explanation}</p>
        </details>
      </div>`;
    });
    container.innerHTML = html;
  });
};

document.addEventListener('DOMContentLoaded', function() {
  window.renderMCQs();
});

// ─── TOC & SCROLLSPY ─────────────────────────────────────────
window.buildTOC = function() {
  const activeDomain = document.querySelector('.domain-section.active');
  if (!activeDomain) return;
  
  const tocList = document.getElementById('toc-list');
  if (!tocList) return;
  tocList.innerHTML = '';
  
  const cards = activeDomain.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    const title = card.querySelector('.card-title');
    if (!title) return;
    
    // Assign ID to card if it doesn't have one
    if (!card.id) card.id = 'card-' + currentDomain + '-' + idx;
    
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + card.id;
    a.textContent = title.textContent;
    a.className = 'toc-link';
    
    // Smooth scroll
    a.addEventListener('click', (e) => {
      e.preventDefault();
      card.scrollIntoView({behavior: 'smooth', block: 'start'});
      // Open the card if closed
      card.classList.add('open');
    });
    
    li.appendChild(a);
    tocList.appendChild(li);
  });
};

window.addEventListener('scroll', () => {
  const links = document.querySelectorAll('.toc-link');
  let currentId = '';
  
  const cards = document.querySelectorAll('.domain-section.active .card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top <= 150) {
      currentId = card.id;
    }
  });
  
  links.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + currentId) {
      l.classList.add('active');
    }
  });
});

// Hook into showDomain
const originalShowDomain = window.showDomain;
window.showDomain = function(idx) {
  originalShowDomain(idx);
  setTimeout(window.buildTOC, 100);
  setTimeout(window.updateProgressBar, 150);
};

// ─── SEARCH & EXPAND ─────────────────────────────────────────
let allExpanded = false;
window.toggleAllCards = function() {
  const btn = document.getElementById('toggleAllCardsBtn');
  allExpanded = !allExpanded;
  btn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
  
  const cards = document.querySelectorAll('.domain-section.active .card');
  cards.forEach(card => {
    if (allExpanded) card.classList.add('open');
    else card.classList.remove('open');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('globalSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const activeDomain = document.querySelector('.domain-section.active');
      if (!activeDomain) return;
      
      const cards = activeDomain.querySelectorAll('.card');
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(term)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
      // Also update TOC visibility
      window.buildTOC(); 
      // Filter TOC links
      const tocLinks = document.querySelectorAll('.toc-link');
      tocLinks.forEach(link => {
        const card = document.getElementById(link.getAttribute('href').substring(1));
        if (card && card.style.display === 'none') {
          link.parentElement.style.display = 'none';
        } else {
          link.parentElement.style.display = '';
        }
      });
    });
    
    // Ctrl+K shortcut
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
});

// ─── QUIZ MODE ───────────────────────────────────────────────
window.toggleQuizMode = function() {
  const isQuiz = document.body.classList.toggle('quiz-mode');
  const btn = document.getElementById('quizModeBtn');
  if(btn) btn.textContent = isQuiz ? 'Exit Quiz Mode' : 'Quiz Mode';
  window.scrollTo({top:0, behavior:'smooth'});
};

// ─── GAMIFICATION & PROGRESS TRACKING ────────────────────────
let completedCards = JSON.parse(localStorage.getItem('saa-completed') || '[]');

window.updateProgressBar = function() {
  const activeDomain = document.querySelector('.domain-section.active');
  if (!activeDomain) return;
  const cards = activeDomain.querySelectorAll('.card');
  if (cards.length === 0) return;
  
  let checked = 0;
  cards.forEach(c => {
    if (completedCards.includes(c.id)) checked++;
  });
  
  const pct = Math.round((checked / cards.length) * 100);
  const prog = document.getElementById('prog');
  if (prog) prog.style.width = pct + '%';
};

window.initProgressTracking = function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    // Ensure card has ID
    if (!card.id) card.id = 'card-global-' + idx;
    
    // Inject checkbox if not already there
    const hdr = card.querySelector('.card-hdr');
    if (hdr && !hdr.querySelector('.progress-check')) {
      const label = document.createElement('label');
      label.className = 'progress-check';
      
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = completedCards.includes(card.id);
      
      const span = document.createElement('span');
      
      label.appendChild(input);
      label.appendChild(span);
      
      // Stop card toggle when clicking checkbox
      label.addEventListener('click', (e) => e.stopPropagation());
      
      input.addEventListener('change', (e) => {
        if (e.target.checked) {
          if (!completedCards.includes(card.id)) completedCards.push(card.id);
        } else {
          completedCards = completedCards.filter(id => id !== card.id);
        }
        localStorage.setItem('saa-completed', JSON.stringify(completedCards));
        window.updateProgressBar();
      });
      
      hdr.insertBefore(label, hdr.firstChild);
    }
  });
  window.updateProgressBar();
};

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(window.initProgressTracking, 200);
});

// ─── SCROLL TO TOP ───────────────────────────────────────────
window.addEventListener('scroll', () => {
  const btn = document.getElementById('scrollTopBtn');
  if (btn) {
    const scrolled = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrolled > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }
});