// scripts.js — common utility & transitions
document.addEventListener('DOMContentLoaded', () => {
  // page show animation
  document.querySelectorAll('.hero-content, .page-home .hero-content').forEach(el => {
    requestAnimationFrame(()=> el.classList.add('show'));
  });

  // set footer years
  const y = new Date().getFullYear();
  ['year','year2','year3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = y;
  });

  // mobile nav toggle
  document.querySelectorAll('.nav-toggle').forEach(btn => {
    const navLinks = btn.closest('.header-inner').querySelector('.nav-links');
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('show');
    });
  });

  // page transitions for internal links with .link-explore class
  const transitionOverlay = document.querySelector('.page-transition');
  document.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');
    // only intercept internal navigation (not mailto or external)
    if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
    a.addEventListener('click', (e) => {
      // allow ctrl/cmd clicks and right-clicks
      if (e.metaKey || e.ctrlKey || e.button !== 0) return;
      e.preventDefault();
      // show transition
      transitionOverlay.classList.add('show');
      setTimeout(()=> window.location.href = href, 480);
    });
  });

  // smooth anchor scroll for internal hash links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });
});