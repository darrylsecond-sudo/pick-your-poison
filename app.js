(() => {
  'use strict';

  const DATA = window.PYP_DATA;
  if (!DATA) {
    document.body.innerHTML = '<p style="color:white;padding:2rem">Question data could not be loaded.</p>';
    return;
  }

  const STORAGE = {
    seenPrefix: 'pyp_seen_',
    rareSeen: 'pyp_rare_seen',
    history: 'pyp_history',
    consent: 'pyp_afterdark_consent',
    lastDraw: 'pyp_last_draw'
  };

  const state = {
    currentCategory: null,
    currentDraw: null,
    pendingAfterDarkAction: null
  };

  const els = {
    home: document.getElementById('homeScreen'),
    result: document.getElementById('resultScreen'),
    categoryGrid: document.getElementById('categoryGrid'),
    surprise: document.getElementById('surpriseButton'),
    poisonCard: document.getElementById('poisonCard'),
    resultCategory: document.getElementById('resultCategory'),
    resultId: document.getElementById('resultId'),
    questionText: document.getElementById('questionText'),
    hostBadge: document.getElementById('hostBadge'),
    rareBanner: document.getElementById('rareBanner'),
    another: document.getElementById('anotherButton'),
    chooseAgain: document.getElementById('chooseAgainButton'),
    pass: document.getElementById('passButton'),
    dialog: document.getElementById('afterDarkDialog'),
    dialogEnter: document.getElementById('afterDarkEnter'),
    dialogDecline: document.getElementById('afterDarkDecline'),
    historyPanel: document.getElementById('historyPanel'),
    historyList: document.getElementById('historyList'),
    historyClose: document.getElementById('historyClose'),
    historyHome: document.getElementById('historyToggleHome'),
    historyResult: document.getElementById('historyToggleResult')
  };

  function getSessionArray(key) {
    try { return JSON.parse(sessionStorage.getItem(key) || '[]'); }
    catch { return []; }
  }

  function setSession(key, value) {
    try { sessionStorage.setItem(key, JSON.stringify(value)); }
    catch { /* private-mode/storage failures should not break play */ }
  }

  function hasAfterDarkConsent() {
    try { return sessionStorage.getItem(STORAGE.consent) === 'yes'; }
    catch { return false; }
  }

  function setAfterDarkConsent() {
    try { sessionStorage.setItem(STORAGE.consent, 'yes'); }
    catch { /* no-op */ }
  }

  function buildCategoryButtons() {
    const order = ['sip', 'spill', 'feral', 'afterdark'];
    order.forEach((key) => {
      const cat = DATA.categories[key];
      const button = document.createElement('button');
      button.className = 'category-button';
      button.type = 'button';
      button.dataset.category = key;
      button.innerHTML = `
        <span class="category-icon" aria-hidden="true">${cat.icon}</span>
        <span class="category-name">${cat.label}</span>
        <span class="category-tagline">${cat.tagline}</span>
      `;
      button.addEventListener('click', () => requestCategory(key));
      els.categoryGrid.appendChild(button);
    });
  }

  function showScreen(name) {
    els.home.classList.toggle('is-active', name === 'home');
    els.result.classList.toggle('is-active', name === 'result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function requestCategory(categoryKey) {
    if (categoryKey === 'afterdark' && !hasAfterDarkConsent()) {
      state.pendingAfterDarkAction = { type: 'category', categoryKey };
      els.dialog.showModal();
      return;
    }
    drawFromCategory(categoryKey);
  }

  function surpriseMe() {
    const keys = Object.keys(DATA.categories);
    const categoryKey = keys[Math.floor(Math.random() * keys.length)];
    if (categoryKey === 'afterdark' && !hasAfterDarkConsent()) {
      state.pendingAfterDarkAction = { type: 'surprise', categoryKey };
      els.dialog.showModal();
      return;
    }
    drawFromCategory(categoryKey);
  }

  function shouldTriggerRare() {
    return Math.random() < Number(DATA.settings.rareChance || 0);
  }

  function getUnseenQuestion(categoryKey) {
    const questions = DATA.categories[categoryKey].questions;
    const key = STORAGE.seenPrefix + categoryKey;
    let seen = getSessionArray(key);
    let pool = questions.filter((q) => !seen.includes(q.id));

    if (pool.length === 0) {
      seen = [];
      pool = [...questions];

      // When a full cycle resets, avoid immediately repeating the card
      // that was just shown if there is more than one option.
      const lastId = state.currentDraw && state.currentDraw.categoryKey === categoryKey
        ? state.currentDraw.id
        : null;
      if (lastId && pool.length > 1) {
        pool = pool.filter((q) => q.id !== lastId);
      }
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    seen.push(chosen.id);
    setSession(key, seen);
    return chosen;
  }

  function getUnseenRare(categoryKey) {
    const allRare = DATA.rareQuestions.filter((q) => {
      if (q.category === 'afterdark' && !hasAfterDarkConsent()) return false;
      return q.category === categoryKey || categoryKey === 'surprise';
    });

    if (!allRare.length) return null;

    let seen = getSessionArray(STORAGE.rareSeen);
    let pool = allRare.filter((q) => !seen.includes(q.id));
    if (pool.length === 0) {
      seen = [];
      pool = [...allRare];
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)];
    seen.push(chosen.id);
    setSession(STORAGE.rareSeen, seen);
    return chosen;
  }

  function drawFromCategory(categoryKey, options = {}) {
    state.currentCategory = categoryKey;

    let question = null;
    let isRare = false;
    let rareLabel = '';

    if (!options.skipRare && shouldTriggerRare()) {
      const rare = getUnseenRare(categoryKey);
      if (rare) {
        question = rare;
        isRare = true;
        const labels = DATA.settings.rareLabels || ['RARE POISON'];
        rareLabel = labels[Math.floor(Math.random() * labels.length)];
      }
    }

    if (!question) question = getUnseenQuestion(categoryKey);

    const draw = {
      ...question,
      categoryKey: question.category || categoryKey,
      isRare,
      rareLabel
    };

    state.currentDraw = draw;
    saveDrawToHistory(draw);
    setSession(STORAGE.lastDraw, draw);
    renderDraw(draw);
    showScreen('result');
  }

  function renderDraw(draw) {
    const cat = DATA.categories[draw.categoryKey] || DATA.categories[state.currentCategory];
    els.resultCategory.textContent = cat ? `${cat.icon} ${cat.label}` : '✦ POISON';
    els.resultId.textContent = draw.id || '';
    els.questionText.textContent = draw.text;

    els.hostBadge.hidden = !draw.hostSpecific;
    if (draw.hostSpecific) {
      const host = String(DATA.settings.hostLabel || 'the birthday host').toUpperCase();
      els.hostBadge.textContent = `${host} IS SUMMONED`;
    }
    els.rareBanner.hidden = !draw.isRare;
    els.rareBanner.textContent = draw.isRare ? draw.rareLabel : '';
    els.poisonCard.classList.toggle('is-rare', Boolean(draw.isRare));

    els.pass.hidden = !(Number(draw.intensity) >= 3);
    els.another.textContent = draw.isRare ? 'ANOTHER POISON' : 'ANOTHER POISON';
  }

  function saveDrawToHistory(draw) {
    const limit = Number(DATA.settings.historyLimit || 5);
    const history = getSessionArray(STORAGE.history);
    history.unshift({
      id: draw.id,
      text: draw.text,
      categoryKey: draw.categoryKey,
      isRare: draw.isRare,
      rareLabel: draw.rareLabel
    });
    setSession(STORAGE.history, history.slice(0, limit));
  }

  function renderHistory() {
    const history = getSessionArray(STORAGE.history);
    els.historyList.innerHTML = '';

    if (!history.length) {
      els.historyList.innerHTML = '<p class="history-empty">The garden has not claimed you yet.</p>';
      return;
    }

    history.forEach((item) => {
      const cat = DATA.categories[item.categoryKey];
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-item-meta">${item.isRare ? `${escapeHtml(item.rareLabel)} · ` : ''}${cat ? `${cat.icon} ${cat.label}` : 'POISON'} · ${escapeHtml(item.id || '')}</div>
        <p>${escapeHtml(item.text)}</p>
      `;
      els.historyList.appendChild(div);
    });
  }

  function toggleHistory(show) {
    const next = typeof show === 'boolean' ? show : els.historyPanel.hidden;
    if (next) renderHistory();
    els.historyPanel.hidden = !next;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function restoreLastDraw() {
    const saved = getSessionArray(STORAGE.lastDraw);
    if (saved && saved.text) {
      state.currentDraw = saved;
      state.currentCategory = saved.categoryKey;
      renderDraw(saved);
      showScreen('result');
    }
  }

  els.surprise.addEventListener('click', surpriseMe);
  els.another.addEventListener('click', () => {
    if (!state.currentCategory) return showScreen('home');
    drawFromCategory(state.currentCategory);
  });
  els.chooseAgain.addEventListener('click', () => showScreen('home'));
  els.pass.addEventListener('click', () => {
    if (state.currentCategory) drawFromCategory(state.currentCategory);
  });

  els.dialogEnter.addEventListener('click', () => {
    setAfterDarkConsent();
    els.dialog.close();
    const pending = state.pendingAfterDarkAction;
    state.pendingAfterDarkAction = null;
    if (!pending) return;
    drawFromCategory(pending.categoryKey);
  });

  els.dialogDecline.addEventListener('click', () => {
    state.pendingAfterDarkAction = null;
    els.dialog.close();
    showScreen('home');
  });

  els.historyHome.addEventListener('click', () => toggleHistory(true));
  els.historyResult.addEventListener('click', () => toggleHistory(true));
  els.historyClose.addEventListener('click', () => toggleHistory(false));

  buildCategoryButtons();
  restoreLastDraw();
})();
