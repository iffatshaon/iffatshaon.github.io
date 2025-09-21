// Load /partials/*.html into their slots, then boot the app.
(async function(){
  const slots = document.querySelectorAll('[data-include]');
  for (const slot of slots) {
    const name = slot.getAttribute('data-include');
    try {
      const res = await fetch(`partials/${name}.html`);
      const html = await res.text();
      slot.outerHTML = html;
    } catch(err){ console.warn('Failed to load partial', name, err); }
  }
  setTimeout(()=>{ window.__initApp && window.__initApp(); }, 50);
})();