function respond(yes){
    document.getElementById('rsvpResponse').textContent = yes
      ? "✦ Wonderful — we can't wait to celebrate with you!"
      : "✦ You'll be missed — thank you for letting us know.";
  }

  const doorOverlay = document.getElementById('doorOverlay');
  const titleReveal = document.getElementById('titleReveal');
  const OPEN_THRESHOLD = 40;

  function updateDoorState(){
    if (window.scrollY > OPEN_THRESHOLD) {
      doorOverlay.classList.add('opened');
      titleReveal.classList.add('show');
    } else {
      doorOverlay.classList.remove('opened');
      titleReveal.classList.remove('show');
    }
  }
  window.addEventListener('scroll', updateDoorState, { passive: true });
  updateDoorState();

  // tap the door to open it (nudges the page to scroll past the open threshold)
  doorOverlay.addEventListener('click', () => {
    window.scrollTo({ top: OPEN_THRESHOLD + 60, behavior: 'smooth' });
  });

  // dense twinkling starfield across the whole page
  const starfield = document.getElementById('starfield');
  const pageHeight = () => document.documentElement.scrollHeight;
  function scatterStars(){
    starfield.innerHTML = '';
    const count = 160;
    const h = pageHeight();
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = (Math.random() * 2 + 1).toFixed(1);
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * h + 'px';
      s.style.animationDuration = (2 + Math.random() * 3) + 's';
      s.style.animationDelay = (Math.random() * 4) + 's';
      starfield.appendChild(s);
    }
    starfield.style.height = h + 'px';
  }
  scatterStars();
  window.addEventListener('resize', scatterStars);

  // twinkling stars scattered inside each door panel
  function scatterDoorStars(container){
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = (Math.random() * 1.8 + 0.6).toFixed(1);
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDuration = (2 + Math.random() * 3) + 's';
      s.style.animationDelay = (Math.random() * 4) + 's';
      container.appendChild(s);
    }
  }
  scatterDoorStars(document.getElementById('doorStarsLeft'));
  scatterDoorStars(document.getElementById('doorStarsRight'));

  // reveal RSVP card on scroll into view
  const card = document.getElementById('rsvpCard');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) card.classList.add('show');
    });
  }, { threshold: 0.3 });
  io.observe(card);

  // throw pretty flower petals while scrolling
  const petalLayer = document.getElementById('petalLayer');
  const petalColors = ['#ffd9e6', '#ffe9c7', '#e0d4ff', '#ffffff'];
  let lastPetalTime = 0;

  function throwPetal(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 4 + Math.random() * 5;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.left = Math.random() * 100 + '%';
    petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
    const fallDur = 4 + Math.random() * 3;
    const swayDur = 1.5 + Math.random() * 1.5;
    petal.style.animationDuration = fallDur + 's, ' + swayDur + 's';
    petal.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
    petalLayer.appendChild(petal);
    setTimeout(() => petal.remove(), fallDur * 1000 + 200);
  }

  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastPetalTime > 120) {
      lastPetalTime = now;
      const burst = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < burst; i++) throwPetal();
    }
  }, { passive: true });