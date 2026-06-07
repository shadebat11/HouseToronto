/* Shared script for Toronto Affordability content pages:
   theme toggle (persisted to localStorage) + scroll-reveal of article blocks. */
(function(){
  var root = document.documentElement;
  var STORAGE_KEY = 'ta-theme';

  // --- Theme toggle (initial data-theme is set by the inline pre-paint script) ---
  var btn = document.getElementById('themeToggle');
  function syncButton(){
    if (!btn) return;
    var isDark = root.getAttribute('data-theme') === 'dark';
    btn.textContent = isDark ? 'Light mode' : 'Dark mode';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncButton();
  if (btn) {
    btn.addEventListener('click', function(){
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) {}
      syncButton();
    });
  }

  // --- Scroll-triggered reveal of each top-level block in the article ---
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var targets = document.querySelectorAll('.article > *');
  targets.forEach(function(t){ t.classList.add('fade-section'); });
  if (!('IntersectionObserver' in window) || reduced) {
    targets.forEach(function(t){ t.classList.add('is-visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  targets.forEach(function(t){ obs.observe(t); });
})();
