/* ═══════════════════════════════════════════════════════════════
   SAA SHARED NAMESPACE  v5.0.0
   v1: storage helpers, utilities, page metadata, data-attribute init.
   v2: scroll progress bar, back-to-top, domain tooltips.
   v3: active task highlighting, card state persistence, review buttons,
       first-load hints, knowledge/skills split.
   v4: MCQ answer tracking, score headers, MCQ badges, quiz mode.
   v5: search modal (Ctrl+K), progress dashboard, reading time,
       skip link, page-stats persistence, print styles.
═══════════════════════════════════════════════════════════════ */
;(function (global) {
  'use strict';

  const SAA = {

    version: '5.0.0',

    // ─── 2. STORAGE ──────────────────────────────────────────────────────────
    storage: {
      _prefix: 'saa-',
      _key(key) { return this._prefix + key; },
      get(key, fallback = null) {
        try {
          const raw = localStorage.getItem(this._key(key));
          if (raw === null) return fallback;
          return JSON.parse(raw);
        } catch { return fallback; }
      },
      set(key, value) {
        try { localStorage.setItem(this._key(key), JSON.stringify(value)); } catch { /* quota */ }
      },
      remove(key) {
        try { localStorage.removeItem(this._key(key)); } catch { /* ignore */ }
      },
      clear(subNS) {
        try {
          const prefix = this._prefix + (subNS ? subNS + '-' : '');
          Object.keys(localStorage).filter(k => k.startsWith(prefix))
            .forEach(k => localStorage.removeItem(k));
        } catch { /* ignore */ }
      }
    },

    // ─── 3. UTILITIES ─────────────────────────────────────────────────────────
    utils: {
      debounce(fn, delay) {
        let timer;
        return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); };
      },
      throttle(fn, limit) {
        let last = 0;
        return function (...args) {
          const now = Date.now();
          if (now - last >= limit) { last = now; return fn.apply(this, args); }
        };
      },
      slugify(str) {
        return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '').substring(0, 60);
      }
    },

    // ─── 4. PAGE HELPERS ──────────────────────────────────────────────────────
    getPageId() { return document.body.dataset.pageId || 'unknown'; },
    getDomain()  { return parseInt(document.body.dataset.domain || '0', 10); },
    setDomain(idx) {
      document.body.dataset.domain = String(idx);
      const bar = document.getElementById('saa-scroll-bar');
      if (bar) bar.style.background = SAA._getDomainColor(idx);
      document.querySelectorAll('.tlink.active-task').forEach(l => l.classList.remove('active-task'));
    },

    // ─── 5. DATA-ATTRIBUTE INITIALISER ───────────────────────────────────────
    _initDataAttributes() {
      const pageId = this.getPageId();
      document.querySelectorAll('.task-section').forEach(section => {
        const taskId = section.id || '';
        if (!taskId) return;
        if (!section.dataset.taskId) section.dataset.taskId = taskId;
        if (!section.dataset.taskLabel) {
          const tlink = document.querySelector('.tlink[href="#' + taskId + '"]');
          section.dataset.taskLabel = tlink ? tlink.textContent.trim() : taskId;
        }
        if (!section.dataset.mcqCount) {
          const count = window.mcqData && window.mcqData[taskId] ? window.mcqData[taskId].length : 0;
          section.dataset.mcqCount = count;
        }
        if (!section.dataset.cardCount) section.dataset.cardCount = section.querySelectorAll('.card').length;
        section.querySelectorAll('.card').forEach((card, idx) => {
          if (!card.dataset.cardId) {
            const titleEl = card.querySelector('.card-title');
            const slug = titleEl ? SAA.utils.slugify(titleEl.textContent) : 'card-' + idx;
            card.dataset.cardId = pageId + '-' + taskId + '-' + slug;
          }
          if (!card.id) card.id = card.dataset.cardId;
        });
      });
      document.querySelectorAll('.mcq-container').forEach((el, idx) => {
        if (!el.id) el.id = pageId + '-mcq-' + idx;
      });
    },

    // ─── 6. DOMAIN-SWITCH HOOK ────────────────────────────────────────────────
    _onDomainChange(idx) { SAA.setDomain(idx); },

    // ─── 7. PHASE 2 ───────────────────────────────────────────────────────────
    _domainColors: {
      'saa-c03':          ['#ef4444','#3b82f6','#8b5cf6','#22c55e'],
      'dva-c02':          ['#ef4444','#3b82f6','#8b5cf6','#22c55e'],
      'well-architected': ['#f59e0b','#ef4444','#3b82f6','#8b5cf6','#10b981','#06b6d4']
    },
    _getDomainColor(idx) {
      const palette = this._domainColors[this.getPageId()] || this._domainColors['saa-c03'];
      return palette[(idx !== undefined ? idx : this.getDomain())] || palette[0];
    },
    _injectScrollProgressBar() {
      const bar = document.createElement('div');
      bar.id = 'saa-scroll-bar';
      bar.setAttribute('role', 'progressbar');
      bar.setAttribute('aria-valuenow', '0');
      bar.setAttribute('aria-valuemin', '0');
      bar.setAttribute('aria-valuemax', '100');
      bar.setAttribute('aria-label', 'Page scroll progress');
      bar.style.background = SAA._getDomainColor(SAA.getDomain());
      document.body.prepend(bar);
      const update = SAA.utils.throttle(function () {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        bar.style.width = pct.toFixed(2) + '%';
        bar.setAttribute('aria-valuenow', Math.round(pct));
      }, 16);
      window.addEventListener('scroll', update, { passive: true });
    },
    _injectBackToTop() {
      const existing = document.getElementById('scrollTopBtn');
      if (existing) existing.remove();
      const btn = document.createElement('button');
      btn.id = 'scrollTopBtn';
      btn.className = 'saa-focusable';
      btn.setAttribute('aria-label', 'Back to top');
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
      document.body.appendChild(btn);
    },
    _initDomainTooltips() {
      const tabs = document.querySelectorAll('.nav-domains .dtab');
      const groups = document.querySelectorAll('.dtasks');
      tabs.forEach(function (tab, idx) {
        const dtasksEl = groups[idx];
        if (!dtasksEl) return;
        const taskLinks = dtasksEl.querySelectorAll('.tlink');
        let cardCount = 0, mcqCount = 0;
        taskLinks.forEach(function (link) {
          const id = (link.getAttribute('href') || '').replace('#', '');
          const sec = id ? document.getElementById(id) : null;
          if (!sec) return;
          cardCount += parseInt(sec.dataset.cardCount || '0', 10);
          mcqCount  += parseInt(sec.dataset.mcqCount  || '0', 10);
        });
        const tip = document.createElement('div');
        tip.className = 'saa-tab-tooltip';
        tip.setAttribute('role', 'tooltip');
        tip.innerHTML =
          '<div class="saa-tt-row"><span>Tasks</span><strong>' + taskLinks.length + '</strong></div>' +
          '<div class="saa-tt-row"><span>Cards</span><strong>' + cardCount + '</strong></div>' +
          '<div class="saa-tt-row"><span>MCQs</span><strong>' + mcqCount + '</strong></div>';
        document.body.appendChild(tip);
        let _t = null;
        const show = function () {
          const r = tab.getBoundingClientRect();
          tip.style.top  = (r.bottom + 8) + 'px';
          tip.style.left = r.left + 'px';
          tip.classList.add('visible');
        };
        const hide = function () { clearTimeout(_t); _t = null; tip.classList.remove('visible'); };
        tab.addEventListener('mouseenter', function () { _t = setTimeout(show, 400); });
        tab.addEventListener('mouseleave', hide);
        tab.addEventListener('focus',      function () { _t = setTimeout(show, 400); });
        tab.addEventListener('blur',       hide);
      });
    },
    _initPhase2() {
      SAA._injectScrollProgressBar();
      SAA._injectBackToTop();
      SAA._initDomainTooltips();
    },

    // ─── 8. PHASE 3 ───────────────────────────────────────────────────────────
    _initActiveTaskHighlight() {
      if (!('IntersectionObserver' in window)) return;
      const inView = new Set();
      let currentId = null;
      const update = SAA.utils.throttle(function () {
        let best = null, bestDist = Infinity;
        inView.forEach(function (s) {
          if (!s.closest('.domain-section.active')) return;
          const d = Math.abs(s.getBoundingClientRect().top);
          if (d < bestDist) { bestDist = d; best = s; }
        });
        if (!best || best.id === currentId) return;
        currentId = best.id;
        document.querySelectorAll('.tlink.active-task').forEach(l => l.classList.remove('active-task'));
        const link = document.querySelector('.tlink[href="#' + best.id + '"]');
        if (link) { link.classList.add('active-task'); link.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' }); }
      }, 100);
      const obs = new IntersectionObserver(function (entries) {
        entries.forEach(e => e.isIntersecting ? inView.add(e.target) : inView.delete(e.target));
        update();
      }, { rootMargin: '0px 0px -40% 0px', threshold: 0 });
      document.querySelectorAll('.task-section').forEach(s => obs.observe(s));
    },
    _initCardStatePersistence() {
      const stateKey = 'card-state-' + SAA.getPageId();
      const saved = SAA.storage.get(stateKey, {});
      document.querySelectorAll('.card').forEach(card => {
        const id = card.dataset.cardId || card.id;
        if (!id || !(id in saved)) return;
        saved[id] ? card.classList.add('open') : card.classList.remove('open');
      });
      const origTog = window.tog;
      window.tog = function (hdr) {
        origTog(hdr);
        const card = hdr.closest('.card');
        const id   = card && (card.dataset.cardId || card.id);
        if (!id) return;
        const state = SAA.storage.get(stateKey, {});
        state[id] = card.classList.contains('open');
        SAA.storage.set(stateKey, state);
      };
      if (window.toggleAllCards) {
        const origAll = window.toggleAllCards;
        window.toggleAllCards = function () {
          origAll();
          const state = SAA.storage.get(stateKey, {});
          document.querySelectorAll('.card').forEach(card => {
            const id = card.dataset.cardId || card.id;
            if (id) state[id] = card.classList.contains('open');
          });
          SAA.storage.set(stateKey, state);
        };
      }
    },
    _initCardReviewButtons() {
      const reviewKey = 'reviewed-' + SAA.getPageId();
      const reviewed  = SAA.storage.get(reviewKey, {});
      document.querySelectorAll('.card').forEach(card => {
        const cardId   = card.dataset.cardId || card.id;
        const cardBody = card.querySelector('.card-body');
        const cardHdr  = card.querySelector('.card-hdr');
        if (!cardId || !cardBody || !cardHdr) return;
        const isReviewed = !!reviewed[cardId];
        if (isReviewed) card.dataset.reviewed = 'true';
        const indicator = document.createElement('span');
        indicator.className = 'saa-reviewed-indicator';
        indicator.textContent = '✓';
        indicator.setAttribute('aria-hidden', 'true');
        cardHdr.appendChild(indicator);
        const footer = document.createElement('div');
        footer.className = 'saa-card-review-footer';
        const btn = document.createElement('button');
        btn.className = 'saa-review-btn saa-focusable';
        btn.setAttribute('aria-pressed', String(isReviewed));
        btn.textContent = isReviewed ? '✓ Reviewed' : 'Mark as reviewed';
        if (isReviewed) btn.classList.add('reviewed');
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          const now = !btn.classList.contains('reviewed');
          btn.classList.toggle('reviewed', now);
          btn.textContent = now ? '✓ Reviewed' : 'Mark as reviewed';
          btn.setAttribute('aria-pressed', String(now));
          card.dataset.reviewed = now ? 'true' : 'false';
          const state = SAA.storage.get(reviewKey, {});
          state[cardId] = now;
          SAA.storage.set(reviewKey, state);
          SAA._updateTaskReviewBadge(card);
        });
        footer.appendChild(btn);
        cardBody.appendChild(footer);
      });
      document.querySelectorAll('.task-section').forEach(sec => SAA._renderTaskReviewBadge(sec));
    },
    _updateTaskReviewBadge(card) {
      const section = card.closest('.task-section');
      if (!section) return;
      SAA._renderTaskReviewBadge(section);
      SAA._updateMCQBadge(section);
    },
    _renderTaskReviewBadge(section) {
      const link = document.querySelector('.tlink[href="#' + section.id + '"]');
      if (!link) return;
      let badge = link.querySelector('.saa-review-badge');
      if (!badge) { badge = document.createElement('span'); badge.className = 'saa-review-badge'; link.appendChild(badge); }
      const total = section.querySelectorAll('.card').length;
      const done  = section.querySelectorAll('.card[data-reviewed="true"]').length;
      badge.textContent = done + '/' + total;
      badge.classList.toggle('complete', total > 0 && done === total);
    },
    _initFirstLoadHints() {
      const hintKey = 'hint-shown-' + SAA.getPageId();
      if (SAA.storage.get(hintKey)) return;
      setTimeout(function () {
        const active = document.querySelector('.domain-section.active');
        if (!active) return;
        active.querySelectorAll('.task-section').forEach(function (sec) {
          const first = sec.querySelector('.card:not(.open)');
          if (!first) return;
          first.classList.add('saa-hint-pulse');
          const hdr = first.querySelector('.card-hdr');
          if (!hdr) return;
          const hint = document.createElement('span');
          hint.className = 'saa-hint-label';
          hint.textContent = 'Click to expand';
          hdr.appendChild(hint);
          setTimeout(function () { hint.classList.add('fading'); }, 2000);
          setTimeout(function () { hint.remove(); first.classList.remove('saa-hint-pulse'); }, 3000);
        });
        SAA.storage.set(hintKey, true);
      }, 250);
    },
    _initKnowledgeSkillsSplit() {
      document.querySelectorAll('.task-details').forEach(function (details) {
        let hasKS = false;
        details.querySelectorAll('strong').forEach(function (label) {
          const text = label.textContent.trim().toLowerCase();
          if (text.startsWith('knowledge of')) { label.classList.add('saa-lbl-knowledge'); label.prepend('📚 '); hasKS = true; }
          else if (text.startsWith('skills in')) { label.classList.add('saa-lbl-skills');    label.prepend('🛠️ '); hasKS = true; }
        });
        if (hasKS) {
          const legend = document.createElement('div');
          legend.className = 'saa-ks-legend';
          legend.setAttribute('aria-hidden', 'true');
          legend.innerHTML = '<span><span class="saa-lbl-knowledge">📚 Knowledge of</span> — concepts to understand</span>' +
                             '<span><span class="saa-lbl-skills">🛠️ Skills in</span> — tasks you must perform</span>';
          details.prepend(legend);
        }
      });
    },
    _initPhase3() {
      SAA._initActiveTaskHighlight();
      SAA._initCardStatePersistence();
      SAA._initCardReviewButtons();
      SAA._initFirstLoadHints();
      SAA._initKnowledgeSkillsSplit();
    },

    // ─── 9. PHASE 4 ───────────────────────────────────────────────────────────
    _patchRenderMCQs() {
      const orig = window.renderMCQs;
      if (typeof orig !== 'function') return;
      window.renderMCQs = function () {
        orig();
        SAA._initDataAttributes();
        SAA._setupMCQInteractions();
        SAA._injectScoreHeaders();
        SAA._initMCQBadges();
        SAA._storePageStats(); // update MCQ totals with actual container count
        SAA._searchIndex = null; // invalidate search index so it rebuilds with new cards
      };
    },
    _setupMCQInteractions() {
      const answersKey   = 'mcq-answers-' + SAA.getPageId();
      const savedAnswers = SAA.storage.get(answersKey, {});
      document.querySelectorAll('.mcq-container').forEach(function (container) {
        if (container.dataset.mcqSetup) return;
        container.dataset.mcqSetup = 'true';
        const mcqSection = container.closest('.mcq-section-dynamic');
        if (!mcqSection) return;
        const taskId = mcqSection.dataset.task;
        if (!taskId) return;
        const all  = Array.from(mcqSection.querySelectorAll('.mcq-container'));
        const qIdx = all.indexOf(container);
        if (qIdx < 0) return;
        const correctLetter = SAA._getCorrectLetter(container);
        const optionsEl = container.querySelector('.mcq-options');
        if (optionsEl && !container.querySelector('.saa-show-options-btn')) {
          const showBtn = document.createElement('button');
          showBtn.className = 'saa-show-options-btn saa-focusable';
          showBtn.textContent = 'Show Options';
          showBtn.setAttribute('aria-expanded', 'false');
          showBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            optionsEl.classList.add('saa-opts-revealed');
            showBtn.classList.add('saa-used');
            showBtn.setAttribute('aria-expanded', 'true');
          });
          container.insertBefore(showBtn, optionsEl);
        }
        container.querySelectorAll('.mcq-options li').forEach(function (li) {
          if (li.dataset.optionLetter) return;
          const letterEl = li.querySelector('strong');
          const letter = letterEl ? letterEl.textContent.replace('.', '').trim() : '';
          if (!letter) return;
          li.dataset.optionLetter = letter;
          li.classList.add('saa-mcq-option');
          li.setAttribute('role', 'button');
          li.setAttribute('tabindex', '0');
          li.setAttribute('aria-label', 'Option ' + letter);
          function _onSelect() {
            if (container.dataset.answered) return;
            const answers = SAA.storage.get(answersKey, {});
            const isCorrect = letter === correctLetter;
            container.dataset.answered = 'true';
            answers[taskId + '-' + qIdx] = { answer: letter, correct: isCorrect };
            SAA.storage.set(answersKey, answers);
            SAA._applyMCQAnswerState(container, letter, correctLetter);
            const ad = container.querySelector('.mcq-answer');
            if (ad && !ad.open) ad.open = true;
            SAA._updateScoreHeader(taskId);
            const ts = document.getElementById(taskId);
            if (ts) SAA._updateMCQBadge(ts);
          }
          li.addEventListener('click', _onSelect);
          li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); _onSelect(); } });
        });
        const saved = savedAnswers[taskId + '-' + qIdx];
        if (saved) { container.dataset.answered = 'true'; SAA._applyMCQAnswerState(container, saved.answer, correctLetter); }
      });
    },
    _getCorrectLetter(container) {
      const el = container.querySelector('.mcq-answer p strong');
      if (!el) return '';
      const m = el.textContent.match(/Correct Answer:\s*([A-Za-z])/i);
      return m ? m[1].toUpperCase() : '';
    },
    _applyMCQAnswerState(container, selectedLetter, correctLetter) {
      container.querySelectorAll('.mcq-options li').forEach(function (li) {
        const l = li.dataset.optionLetter;
        if (!l) return;
        li.classList.remove('saa-opt-correct', 'saa-opt-wrong', 'saa-opt-selected');
        if (l === correctLetter)                              li.classList.add('saa-opt-correct');
        if (l === selectedLetter && l !== correctLetter)     li.classList.add('saa-opt-wrong');
        if (l === selectedLetter)                            li.classList.add('saa-opt-selected');
      });
      const opts = container.querySelector('.mcq-options');
      if (opts) opts.classList.add('saa-opts-revealed');
      const btn = container.querySelector('.saa-show-options-btn');
      if (btn) btn.classList.add('saa-used');
    },
    _injectScoreHeaders() {
      document.querySelectorAll('.mcq-section-dynamic').forEach(function (section) {
        if (section.querySelector('.saa-score-header')) return;
        const taskId = section.dataset.task;
        if (!taskId) return;
        const header = document.createElement('div');
        header.className = 'saa-score-header';
        header.dataset.taskId = taskId;
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'saa-score-value';
        const resetBtn = document.createElement('button');
        resetBtn.className = 'saa-score-reset saa-focusable';
        resetBtn.textContent = 'Reset';
        resetBtn.setAttribute('aria-label', 'Reset MCQ answers for this section');
        resetBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          if (!confirm('Reset all MCQ answers for this section?')) return;
          SAA._resetMCQSection(taskId);
        });
        header.appendChild(scoreSpan);
        header.appendChild(resetBtn);
        section.prepend(header);
        SAA._updateScoreHeader(taskId);
      });
    },
    _updateScoreHeader(taskId) {
      const section = document.querySelector('.mcq-section-dynamic[data-task="' + taskId + '"]');
      if (!section) return;
      const header = section.querySelector('.saa-score-header');
      if (!header) return;
      const scoreSpan = header.querySelector('.saa-score-value');
      if (!scoreSpan) return;
      const total = section.querySelectorAll('.mcq-container').length;
      if (total === 0) { scoreSpan.textContent = 'No questions'; scoreSpan.className = 'saa-score-value'; return; }
      const saved   = SAA.storage.get('mcq-answers-' + SAA.getPageId(), {});
      let correct = 0, answered = 0;
      for (let i = 0; i < total; i++) {
        const e = saved[taskId + '-' + i];
        if (e) { answered++; if (e.correct) correct++; }
      }
      if (answered === 0) {
        scoreSpan.textContent = total + ' question' + (total !== 1 ? 's' : '');
        scoreSpan.className = 'saa-score-value';
      } else {
        const pct = Math.round((correct / total) * 100);
        scoreSpan.textContent = correct + ' / ' + total + ' correct (' + pct + '%)';
        scoreSpan.className = 'saa-score-value' + (pct >= 70 ? ' saa-score-good' : ' saa-score-poor');
      }
    },
    _resetMCQSection(taskId) {
      const key  = 'mcq-answers-' + SAA.getPageId();
      const data = SAA.storage.get(key, {});
      Object.keys(data).forEach(function (k) { if (k.startsWith(taskId + '-')) delete data[k]; });
      SAA.storage.set(key, data);
      const section = document.querySelector('.mcq-section-dynamic[data-task="' + taskId + '"]');
      if (section) {
        section.querySelectorAll('.mcq-container').forEach(function (c) {
          delete c.dataset.answered;
          c.querySelectorAll('.mcq-options li').forEach(li => li.classList.remove('saa-opt-correct', 'saa-opt-wrong', 'saa-opt-selected'));
          const opts = c.querySelector('.mcq-options');
          if (opts) opts.classList.remove('saa-opts-revealed');
          const showBtn = c.querySelector('.saa-show-options-btn');
          if (showBtn) showBtn.classList.remove('saa-used');
          const ad = c.querySelector('.mcq-answer');
          if (ad) ad.open = false;
        });
      }
      SAA._updateScoreHeader(taskId);
      const ts = document.getElementById(taskId);
      if (ts) SAA._updateMCQBadge(ts);
    },
    _initMCQBadges() {
      document.querySelectorAll('.task-section').forEach(function (sec) { SAA._updateMCQBadge(sec); });
    },
    _updateMCQBadge(section) {
      const taskId = section.id;
      const link   = document.querySelector('.tlink[href="#' + taskId + '"]');
      if (!link) return;
      const mcqSec = document.querySelector('.mcq-section-dynamic[data-task="' + taskId + '"]');
      const total  = mcqSec ? mcqSec.querySelectorAll('.mcq-container').length : 0;
      if (total === 0) { const ex = link.querySelector('.saa-mcq-badge'); if (ex) ex.remove(); return; }
      const saved = SAA.storage.get('mcq-answers-' + SAA.getPageId(), {});
      let correct = 0, answered = 0;
      for (let i = 0; i < total; i++) { const e = saved[taskId + '-' + i]; if (e) { answered++; if (e.correct) correct++; } }
      const totalCards  = section.querySelectorAll('.card').length;
      const reviewedCards = section.querySelectorAll('.card[data-reviewed="true"]').length;
      const allReviewed = totalCards > 0 && reviewedCards === totalCards;
      const pct = answered > 0 ? Math.round((correct / total) * 100) : 0;
      const isComplete = answered === total && pct >= 70 && allReviewed;
      const inProgress = answered > 0 && !isComplete;
      let badge = link.querySelector('.saa-mcq-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'saa-mcq-badge';
        const rb = link.querySelector('.saa-review-badge');
        if (rb) link.insertBefore(badge, rb); else link.appendChild(badge);
      }
      badge.textContent = answered > 0 ? correct + '/' + total : '—/' + total;
      badge.setAttribute('title', answered > 0 ? correct + ' correct of ' + answered + ' answered (' + total + ' total)' : total + ' MCQ questions');
      badge.classList.toggle('complete',    isComplete);
      badge.classList.toggle('in-progress', inProgress);
    },
    _initQuizMode() {
      if (SAA.storage.get('quiz-mode', false)) {
        document.body.classList.add('quiz-mode');
        const btn = document.getElementById('quizModeBtn');
        if (btn) btn.textContent = 'Exit Quiz Mode';
      }
      const orig = window.toggleQuizMode;
      if (typeof orig === 'function') {
        window.toggleQuizMode = function () {
          orig();
          const isQuiz = document.body.classList.contains('quiz-mode');
          SAA.storage.set('quiz-mode', isQuiz);
          if (!isQuiz) {
            document.querySelectorAll('.mcq-options.saa-opts-revealed').forEach(function (opts) {
              if (!opts.closest('.mcq-container[data-answered]')) opts.classList.remove('saa-opts-revealed');
            });
            document.querySelectorAll('.saa-show-options-btn.saa-used').forEach(function (b) {
              if (!b.closest('.mcq-container[data-answered]')) { b.classList.remove('saa-used'); b.setAttribute('aria-expanded', 'false'); }
            });
          }
        };
      }
    },
    _initPhase4() {
      SAA._patchRenderMCQs();
      SAA._initQuizMode();
    },

    // ─── 10. PHASE 5 — SEARCH MODAL ──────────────────────────────────────────
    _searchIndex: null,
    _searchSelectedIdx: -1,
    _prevFocus: null,

    _buildSearchIndex() {
      const idx = [];
      document.querySelectorAll('.domain-section').forEach(function (domain) {
        const num = parseInt(domain.id.replace(/\D/g, ''), 10);
        if (isNaN(num)) return;
        const dtab = document.querySelectorAll('.dtab')[num];
        let domainLabel = '';
        if (dtab) { dtab.childNodes.forEach(function (n) { if (n.nodeType === 3) domainLabel += n.textContent; }); domainLabel = domainLabel.trim(); }
        domain.querySelectorAll('.card').forEach(function (card) {
          const titleEl = card.querySelector('.card-title');
          const title = titleEl ? titleEl.textContent.trim() : '';
          if (!title) return;
          const section = card.closest('.task-section');
          const taskId  = section ? section.id : '';
          let taskLabel = '';
          if (taskId) {
            const tlink = document.querySelector('.tlink[href="#' + taskId + '"]');
            if (tlink) { tlink.childNodes.forEach(function (n) { if (n.nodeType === 3) taskLabel += n.textContent; }); taskLabel = taskLabel.trim(); }
          }
          const tags = Array.from(card.querySelectorAll('.tag')).map(t => t.textContent.trim()).join(' ');
          let excerpt = '';
          const bodyEl = card.querySelector('.card-body');
          if (bodyEl) {
            const nodes = bodyEl.querySelectorAll('p, li');
            for (let i = 0; i < nodes.length; i++) { const t = nodes[i].textContent.trim(); if (t.length > 30) { excerpt = t.substring(0, 130); break; } }
          }
          idx.push({ cardId: card.dataset.cardId || card.id || '', title, domainIdx: num, domainLabel, taskId, taskLabel, tags, excerpt });
        });
      });
      SAA._searchIndex = idx;
      return idx;
    },

    _esc(s)  { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); },
    _hl(text, term) {
      if (!term) return SAA._esc(text);
      let result = SAA._esc(text);
      term.trim().split(/\s+/).filter(Boolean).forEach(function (word) {
        const re = new RegExp('(' + word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + ')', 'gi');
        result = result.replace(re, '<mark class="saa-hl">$1</mark>');
      });
      return result;
    },

    _injectSearchModal() {
      if (document.getElementById('saa-search-modal')) return;
      const modal = document.createElement('div');
      modal.id = 'saa-search-modal';
      modal.className = 'saa-search-overlay';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Search cards');
      modal.innerHTML =
        '<div class="saa-search-box">' +
          '<div class="saa-search-input-row">' +
            '<svg class="saa-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
            '<input id="saa-search-input" type="text" autocomplete="off" spellcheck="false" placeholder="Search cards, concepts, services…" aria-autocomplete="list" aria-controls="saa-search-results" />' +
            '<kbd class="saa-search-esc-hint">Esc</kbd>' +
          '</div>' +
          '<ul id="saa-search-results" class="saa-search-results" role="listbox" aria-label="Search results"></ul>' +
          '<div class="saa-search-footer" aria-hidden="true">' +
            '<span><kbd>↑↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>Esc</kbd> close</span>' +
          '</div>' +
        '</div>';
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) { if (e.target === modal) SAA._closeSearchModal(); });

      const input = document.getElementById('saa-search-input');
      input.addEventListener('input', SAA.utils.debounce(function () {
        const term = input.value.trim();
        const results = term.length >= 1 ? SAA._runSearch(term) : [];
        SAA._renderSearchResults(results, term);
        SAA._searchSelectedIdx = results.length > 0 ? 0 : -1;
        SAA._highlightSelectedResult();
        if (term) history.replaceState({}, '', '?q=' + encodeURIComponent(term));
        else history.replaceState({}, '', window.location.pathname);
      }, 120));

      input.addEventListener('keydown', function (e) {
        const items = document.querySelectorAll('.saa-search-result');
        if (e.key === 'ArrowDown')  { e.preventDefault(); SAA._searchSelectedIdx = Math.min(SAA._searchSelectedIdx + 1, items.length - 1); SAA._highlightSelectedResult(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); SAA._searchSelectedIdx = Math.max(SAA._searchSelectedIdx - 1, 0); SAA._highlightSelectedResult(); }
        else if (e.key === 'Enter') { e.preventDefault(); const sel = document.querySelector('.saa-search-result.saa-sr-selected'); if (sel) sel.click(); }
        else if (e.key === 'Escape') SAA._closeSearchModal();
      });
    },

    _openSearchModal(preQuery) {
      const modal = document.getElementById('saa-search-modal');
      if (!modal) return;
      SAA._prevFocus = document.activeElement;
      modal.classList.add('open');
      document.body.classList.add('saa-search-open');
      const input = document.getElementById('saa-search-input');
      if (!input) return;
      if (preQuery != null) {
        input.value = preQuery;
        const results = SAA._runSearch(preQuery);
        SAA._renderSearchResults(results, preQuery);
        SAA._searchSelectedIdx = results.length > 0 ? 0 : -1;
        SAA._highlightSelectedResult();
      } else {
        input.select();
      }
      input.focus();
    },

    _closeSearchModal() {
      const modal = document.getElementById('saa-search-modal');
      if (!modal) return;
      modal.classList.remove('open');
      document.body.classList.remove('saa-search-open');
      history.replaceState({}, '', window.location.pathname);
      if (SAA._prevFocus) { SAA._prevFocus.focus(); SAA._prevFocus = null; }
    },

    _runSearch(term) {
      const index = SAA._searchIndex || SAA._buildSearchIndex();
      const words = term.toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.length) return [];
      return index.map(function (item) {
        let score = 0;
        const t = item.title.toLowerCase(), g = item.tags.toLowerCase(), e = item.excerpt.toLowerCase();
        words.forEach(function (w) { if (t.includes(w)) score += 3; if (g.includes(w)) score += 2; if (e.includes(w)) score += 1; });
        return { item, score };
      }).filter(r => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8).map(r => r.item);
    },

    _renderSearchResults(results, term) {
      const list = document.getElementById('saa-search-results');
      if (!list) return;
      if (!results.length) {
        list.innerHTML = term ? '<li class="saa-search-empty">No results for <strong>' + SAA._esc(term) + '</strong></li>' : '';
        return;
      }
      list.innerHTML = results.map(function (r, i) {
        const meta = [r.domainLabel, r.taskLabel].filter(Boolean).join(' · ');
        return '<li class="saa-search-result" role="option" aria-selected="false" data-result-idx="' + i + '">' +
          '<div class="saa-sr-main">' +
          '<span class="saa-sr-title">' + SAA._hl(r.title, term) + '</span>' +
          (meta ? '<span class="saa-sr-meta">' + SAA._esc(meta) + '</span>' : '') +
          '</div>' +
          (r.excerpt ? '<span class="saa-sr-excerpt">' + SAA._hl(r.excerpt, term) + '…</span>' : '') +
          '</li>';
      }).join('');
      list.querySelectorAll('.saa-search-result').forEach(function (li) {
        li.addEventListener('click', function () {
          SAA._navigateToResult(results[parseInt(li.dataset.resultIdx, 10)]);
        });
      });
    },

    _highlightSelectedResult() {
      document.querySelectorAll('.saa-search-result').forEach(function (li, i) {
        const sel = i === SAA._searchSelectedIdx;
        li.classList.toggle('saa-sr-selected', sel);
        li.setAttribute('aria-selected', String(sel));
        if (sel) li.scrollIntoView({ block: 'nearest' });
      });
    },

    _navigateToResult(result) {
      SAA._closeSearchModal();
      const switchDomain = result.domainIdx !== SAA.getDomain();
      if (switchDomain && window.showDomain) window.showDomain(result.domainIdx);
      setTimeout(function () {
        const card = document.getElementById(result.cardId) ||
                     document.querySelector('[data-card-id="' + result.cardId + '"]');
        if (!card) return;
        card.classList.add('open');
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, switchDomain ? 150 : 0);
    },

    _initPhase5() {
      SAA._injectSearchModal();
      // Use capture phase so this fires before any bubble-phase listeners (including script.js)
      document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.key === 'k') {
          e.preventDefault();
          e.stopImmediatePropagation();
          SAA._openSearchModal();
        }
      }, true);
      // Update placeholder to reflect the filter-only nature of the inline input
      const gs = document.getElementById('globalSearch');
      if (gs) gs.placeholder = 'Filter current domain…';
      // Pre-open if URL has ?q=
      const qParam = new URLSearchParams(window.location.search).get('q');
      if (qParam) setTimeout(function () { SAA._openSearchModal(qParam); }, 400);
    },

    // ─── 11. PHASE 6 — PROGRESS DASHBOARD ────────────────────────────────────
    _knownPages: [
      { id: 'saa-c03',          short: 'SAA-C03', label: 'Solutions Architect Associate', color: '#3b82f6' },
      { id: 'dva-c02',          short: 'DVA-C02', label: 'Developer Associate',           color: '#8b5cf6' },
      { id: 'well-architected', short: 'WAF',     label: 'Well-Architected Framework',    color: '#f59e0b' }
    ],

    _storePageStats() {
      const pageId = SAA.getPageId();
      let totalCards = 0, totalMCQs = 0, totalSections = 0;
      document.querySelectorAll('.task-section').forEach(function (s) {
        totalSections++;
        totalCards += parseInt(s.dataset.cardCount || '0', 10);
        totalMCQs  += parseInt(s.dataset.mcqCount  || '0', 10);
      });
      const actual = document.querySelectorAll('.mcq-container').length;
      if (actual > 0) totalMCQs = actual;
      SAA.storage.set('page-stats-' + pageId, {
        pageId, pageTitle: document.body.dataset.pageTitle || pageId,
        totalCards, totalMCQs, totalSections, lastVisit: Date.now()
      });
    },

    _injectDashboardBtn() {
      const toolbar = document.querySelector('.content-toolbar');
      if (!toolbar || document.getElementById('saa-dashboard-btn')) return;
      const btn = document.createElement('button');
      btn.id = 'saa-dashboard-btn';
      btn.className = 'saa-focusable';
      btn.textContent = 'Progress';
      btn.setAttribute('aria-label', 'Open study progress dashboard');
      btn.addEventListener('click', SAA._openDashboard);
      toolbar.appendChild(btn);
    },

    _injectDashboardPanel() {
      if (document.getElementById('saa-dashboard')) return;
      const panel = document.createElement('div');
      panel.id = 'saa-dashboard';
      panel.className = 'saa-dashboard-overlay';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-label', 'Study progress dashboard');
      panel.innerHTML =
        '<div class="saa-db-panel">' +
          '<div class="saa-db-hdr">' +
            '<span class="saa-db-title">Study Progress</span>' +
            '<button class="saa-db-close saa-focusable" id="saa-db-close" aria-label="Close dashboard">✕</button>' +
          '</div>' +
          '<div class="saa-db-body" id="saa-db-body"></div>' +
        '</div>';
      document.body.appendChild(panel);
      panel.addEventListener('click', function (e) { if (e.target === panel) SAA._closeDashboard(); });
      document.getElementById('saa-db-close').addEventListener('click', SAA._closeDashboard);
    },

    _openDashboard() {
      const panel = document.getElementById('saa-dashboard');
      if (!panel) return;
      SAA._renderDashboard();
      panel.classList.add('open');
      document.body.classList.add('saa-db-open');
      const close = document.getElementById('saa-db-close');
      if (close) close.focus();
    },

    _closeDashboard() {
      const panel = document.getElementById('saa-dashboard');
      if (!panel) return;
      panel.classList.remove('open');
      document.body.classList.remove('saa-db-open');
      const btn = document.getElementById('saa-dashboard-btn');
      if (btn) btn.focus();
    },

    _renderDashboard() {
      const body = document.getElementById('saa-db-body');
      if (!body) return;
      const currentId = SAA.getPageId();
      let totCards = 0, doneCards = 0, totMCQ = 0, corrMCQ = 0;

      const rows = SAA._knownPages.map(function (page) {
        const stats   = SAA.storage.get('page-stats-' + page.id, null);
        const rev     = SAA.storage.get('reviewed-' + page.id, {});
        const mcqData = SAA.storage.get('mcq-answers-' + page.id, {});
        const done    = Object.values(rev).filter(Boolean).length;
        const answered = Object.keys(mcqData).length;
        const correct  = Object.values(mcqData).filter(a => a.correct).length;
        if (stats) { totCards += stats.totalCards; doneCards += done; totMCQ += stats.totalMCQs; corrMCQ += correct; }
        return { page, stats, done, answered, correct };
      });

      const oPct = totCards > 0 ? Math.round(doneCards / totCards * 100) : 0;
      const mPct = totMCQ  > 0 ? Math.round(corrMCQ  / totMCQ  * 100) : 0;

      let html =
        '<div class="saa-db-overview">' +
          '<div class="saa-db-ov-item"><span class="saa-db-ov-num">' + oPct + '%</span><span class="saa-db-ov-lbl">Cards Reviewed<br><small>' + doneCards + ' / ' + totCards + '</small></span></div>' +
          '<div class="saa-db-ov-item"><span class="saa-db-ov-num' + (mPct >= 70 ? ' saa-db-ov-good' : '') + '">' + mPct + '%</span><span class="saa-db-ov-lbl">MCQ Accuracy<br><small>' + corrMCQ + ' / ' + totMCQ + '</small></span></div>' +
        '</div><div class="saa-db-pages">';

      rows.forEach(function (row) {
        const { page, stats, done, answered, correct } = row;
        const isCurr  = page.id === currentId;
        const cardPct = stats && stats.totalCards > 0 ? Math.round(done    / stats.totalCards * 100) : 0;
        const mcqPct  = stats && stats.totalMCQs  > 0 ? Math.round(correct / stats.totalMCQs  * 100) : 0;
        const mcqColor = mcqPct >= 70 ? '#34d399' : answered > 0 ? '#f59e0b' : '';

        html += '<div class="saa-db-pg" style="--pg-color:' + page.color + '">' +
          '<div class="saa-db-pg-hdr">' +
            '<span class="saa-db-pg-badge">' + page.short + '</span>' +
            '<span class="saa-db-pg-name">' + page.label + '</span>' +
            (isCurr ? '<span class="saa-db-pg-curr">current</span>' : '') +
          '</div>';

        if (!stats) {
          html += '<p class="saa-db-pg-none">Visit this guide to start tracking progress.</p>';
        } else {
          html += '<div class="saa-db-pg-stats">' +
            '<div class="saa-db-row">' +
              '<span class="saa-db-row-lbl">Cards reviewed</span>' +
              '<div class="saa-db-bar"><div class="saa-db-bar-fill" style="width:' + cardPct + '%"></div></div>' +
              '<span class="saa-db-row-val">' + done + '/' + stats.totalCards + '</span>' +
            '</div>';
          if (stats.totalMCQs > 0) {
            html += '<div class="saa-db-row">' +
              '<span class="saa-db-row-lbl">MCQ score</span>' +
              '<div class="saa-db-bar"><div class="saa-db-bar-fill" style="width:' + mcqPct + '%' + (mcqColor ? ';background:' + mcqColor : '') + '"></div></div>' +
              '<span class="saa-db-row-val">' + correct + '/' + stats.totalMCQs + (answered > 0 ? ' (' + mcqPct + '%)' : '') + '</span>' +
            '</div>';
          }
          html += '</div>';
        }
        html += '</div>';
      });

      html += '</div>';
      body.innerHTML = html;
    },

    _initPhase6() {
      SAA._injectDashboardBtn();
      SAA._injectDashboardPanel();
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          const panel = document.getElementById('saa-dashboard');
          if (panel && panel.classList.contains('open')) SAA._closeDashboard();
        }
      });
    },

    // ─── 12. PHASE 7 — FINAL POLISH ──────────────────────────────────────────
    _initReadingTime() {
      document.querySelectorAll('.task-section').forEach(function (section) {
        let words = 0;
        section.querySelectorAll('.card').forEach(function (card) {
          const body = card.querySelector('.card-body');
          if (body) words += body.textContent.trim().split(/\s+/).length;
        });
        const mins = Math.max(1, Math.round(words / 220));
        const titleEl = section.querySelector('.task-title');
        if (!titleEl) return;
        const rt = document.createElement('span');
        rt.className = 'saa-reading-time';
        rt.textContent = '~' + mins + ' min';
        rt.setAttribute('title', 'Estimated reading time: ' + mins + ' minute' + (mins !== 1 ? 's' : ''));
        titleEl.appendChild(rt);
      });
    },

    _injectSkipLink() {
      if (document.getElementById('saa-skip-link')) return;
      const main = document.querySelector('main');
      if (!main) return;
      if (!main.id) main.id = 'saa-main-content';
      const link = document.createElement('a');
      link.id = 'saa-skip-link';
      link.href = '#saa-main-content';
      link.className = 'saa-skip-link';
      link.textContent = 'Skip to main content';
      document.body.insertBefore(link, document.body.firstChild);
    },

    _initPhase7() {
      SAA._injectSkipLink();
      SAA._initReadingTime();
      SAA._storePageStats();
    }

  };

  global.SAA = SAA;

  // ─── BOOTSTRAP ────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    SAA._initDataAttributes();
    SAA._initPhase2();
    SAA._initPhase3();
    SAA._initPhase4();
    SAA._initPhase5();
    SAA._initPhase6();
    SAA._initPhase7();
  });

})(window);
