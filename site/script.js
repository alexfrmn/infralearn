/* InfraLearn — Tab switching, copy buttons, syntax highlighting */

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initTabArrows();
  initCopyButtons();
  initHighlighting();
});

/* Tab Switching */
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  const hash = window.location.hash.replace('#', '');
  let initialTab = hash || 'block-0';
  if (!document.getElementById(initialTab)) initialTab = 'block-0';

  activateTab(initialTab, buttons, panes, false);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      activateTab(target, buttons, panes, true);
      window.history.replaceState(null, '', '#' + target);
    });
  });

  window.addEventListener('hashchange', () => {
    const h = window.location.hash.replace('#', '');
    if (h) activateTab(h, buttons, panes, false);
  });
}

function activateTab(tabId, buttons, panes, doScroll) {
  buttons.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  panes.forEach(p => p.classList.toggle('active', p.id === tabId));

  const activeBtn = document.querySelector('.tab-btn[data-tab="' + tabId + '"]');
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  if (doScroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const pane = document.getElementById(tabId);
  if (pane && window.hljs) {
    pane.querySelectorAll('pre code:not(.hljs)').forEach(block => {
      hljs.highlightElement(block);
    });
  }
}

/* Tab Arrow Scrolling */
function initTabArrows() {
  const nav = document.querySelector('.tab-nav');
  const leftArrow = document.querySelector('.tab-arrow-left');
  const rightArrow = document.querySelector('.tab-arrow-right');
  if (!nav || !leftArrow || !rightArrow) return;

  const scrollAmount = 200;

  function updateArrows() {
    const atStart = nav.scrollLeft <= 2;
    const atEnd = nav.scrollLeft + nav.clientWidth >= nav.scrollWidth - 2;
    leftArrow.classList.toggle('hidden', atStart);
    rightArrow.classList.toggle('hidden', atEnd);
  }

  leftArrow.addEventListener('click', () => {
    nav.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightArrow.addEventListener('click', () => {
    nav.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  nav.addEventListener('scroll', updateArrows, { passive: true });
  window.addEventListener('resize', updateArrows);
  updateArrows();
}

/* Copy Buttons */
function initCopyButtons() {
  document.querySelectorAll('.code-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.copy-btn');
    const code = wrapper.querySelector('pre code');
    if (!btn || !code) return;

    btn.addEventListener('click', async () => {
      const text = code.textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Скопировано!';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = 'Копировать';
          btn.classList.remove('copied');
        }, 2000);
      } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          btn.textContent = 'Скопировано!';
          btn.classList.add('copied');
        } catch (e) {
          btn.textContent = 'Ошибка';
        }
        document.body.removeChild(textarea);
        setTimeout(() => {
          btn.textContent = 'Копировать';
          btn.classList.remove('copied');
        }, 2000);
      }
    });
  });
}

/* Syntax Highlighting */
function initHighlighting() {
  const doHighlight = () => {
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
      });
    }
  };

  if (window.hljs) {
    doHighlight();
  } else {
    window.addEventListener('load', doHighlight);
  }
}
