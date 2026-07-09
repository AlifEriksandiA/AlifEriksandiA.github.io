// ============================================
// NAVBAR: scrolled state + active link tracking
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('[data-nav-link]');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const sections = document.querySelectorAll('section[id]');

function updateNavbarBg(){
  navbar.classList.toggle('scrolled', window.scrollY > 12);
}
updateNavbarBg();
window.addEventListener('scroll', updateNavbarBg);

// ============================================
// HAMBURGER MENU (mobile)
// ============================================
function closeMenu(){
  navMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}
function toggleMenu(){
  const isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
}
hamburger.addEventListener('click', toggleMenu);

// ============================================
// SMOOTH SCROLL for nav links (with navbar offset)
// ============================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if(!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if(!target) return;
    e.preventDefault();
    closeMenu();

    const navHeight = navbar.offsetHeight;
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
// ============================================
const navAnchors = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        const isMatch = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('active', isMatch);
      });
    }
  });
}, {
  rootMargin: `-${document.getElementById('navbar').offsetHeight + 20}px 0px -60% 0px`,
  threshold: 0
});

// Only observe sections that have a matching nav link (home -> hero, projects, contact)
const observedIds = ['home', 'projects', 'contact'];
observedIds.forEach(id => {
  const el = document.getElementById(id);
  if(el) sectionObserver.observe(el);
});

// Resume section should also light up "Home" since it's part of the main flow
const resumeSection = document.getElementById('resume');
if(resumeSection){
  const resumeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#home'));
      }
    });
  }, { rootMargin: `-${document.getElementById('navbar').offsetHeight + 20}px 0px -60% 0px`, threshold: 0 });
  resumeObserver.observe(resumeSection);
}

// ============================================
// REVEAL ON SCROLL (fade-in / slide-up)
// ============================================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if(entry.isIntersecting){
      // slight stagger for elements revealing together
      setTimeout(() => entry.target.classList.add('in-view'), i * 40);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ============================================
// ROLE ROTATOR (typewriter-ish rotation in hero)
// ============================================
const roles = [
  'AI Engineering',
  'Machine Learning',
  'Web Development',
  'Robotics & IoT',
  'Data Analysis'
];
const roleTrack = document.getElementById('roleTrack');
let roleIndex = 0;

function rotateRole(){
  if(!roleTrack) return;
  roleTrack.style.opacity = '0';
  roleTrack.style.transform = 'translateY(6px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleTrack.textContent = roles[roleIndex];
    roleTrack.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    roleTrack.style.opacity = '1';
    roleTrack.style.transform = 'translateY(0)';
  }, 350);
}
if(roleTrack){
  roleTrack.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  setInterval(rotateRole, 2600);
}

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const scrollTopBtn = document.getElementById('scrollTopBtn');
function toggleScrollTopBtn(){
  scrollTopBtn.classList.toggle('visible', window.scrollY > 480);
}
toggleScrollTopBtn();
window.addEventListener('scroll', toggleScrollTopBtn);
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// CONTACT FORM (front-end only, ready to extend)
// ============================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();

  // Placeholder behaviour — replace with a real API call / email service later.
  formNote.textContent = `Terima kasih, ${name || 'atas pesannya'}! Namun saat ini pesan belum bisa terkirim, silahkan hubungi melalui E-mail.`;
  formNote.style.color = 'var(--blue-deep)';

  contactForm.reset();

  setTimeout(() => { formNote.textContent = ''; }, 6000);
});

// ============================================
// DOWNLOAD CV BUTTON (placeholder handling)
// ============================================
const downloadCvBtn = document.getElementById('downloadCvBtn');
downloadCvBtn.addEventListener('click', (e) => {
  // If no real CV file is linked yet, prevent dead navigation and inform gently via console.
  const href = downloadCvBtn.getAttribute('href');
  if(!href || href === '#'){
    e.preventDefault();
    alert('File CV belum ditautkan. Ganti atribut href pada tombol "Download CV" dengan path file PDF Anda, misalnya assets/CV-Alif-Eriksandi.pdf');
  }
});

// ============================================
// PROJECT "View Detail" BUTTON (placeholder)
// ============================================
document.querySelectorAll('[data-detail-btn]').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.project-card');
    const title = card ? card.querySelector('h3').textContent : 'proyek ini';
    alert(`Detail lengkap untuk "${title}" dapat ditambahkan di sini — misalnya tautan ke halaman studi kasus atau modal galeri.`);
  });
});
