const {
  gsap,
  gsap: { to, timeline, set, delayedCall },
  Splitting } =
window;

Splitting();

const BTN = document.querySelector('.birthday-button__button');
const SOUNDS = {
  CHEER: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/cheer.mp3'),

  MATCH: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/match-strike-trimmed.mp3'),

  TUNE: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/happy-birthday-trimmed.mp3'),

  ON: new Audio('https://assets.codepen.io/605876/switch-on.mp3'),
  BLOW: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/blow-out.mp3'),

  POP: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/pop-trimmed.mp3'),

  HORN: new Audio(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/605876/horn.mp3') };



const EYES = document.querySelector('.cake__eyes');
const BLINK = eyes => {
  gsap.set(eyes, { scaleY: 1 });
  if (eyes.BLINK_TL) eyes.BLINK_TL.kill();
  eyes.BLINK_TL = new gsap.timeline({
    delay: Math.floor(Math.random() * 4) + 1,
    onComplete: () => BLINK(eyes) });

  eyes.BLINK_TL.to(eyes, {
    duration: 0.05,
    transformOrigin: '50% 50%',
    scaleY: 0,
    yoyo: true,
    repeat: 1 });

};
BLINK(EYES);

const FROSTING_TL = () =>
timeline().
to(
'#frosting',
{
  scaleX: 1.015,
  duration: 0.25 },

0).

to(
'#frosting',
{
  scaleY: 1,
  duration: 1 },

0).

to(
'#frosting',
{
  duration: 1,
  morphSVG: '.cake__frosting--end' },

0);

// Extract to sprinkle
const SPRINKLES_TL = () =>
timeline().to('.cake__sprinkle', { scale: 1, duration: 0.06, stagger: 0.02 });
// Extract out to your own timeline
const SPIN_TL = () =>
timeline().
set('.cake__frosting-patch', { display: 'block' }).
to(
['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'],
{ x: 0, duration: 1 },
0).

to(
['.cake__frosting--start', '.cake__sprinkles--initial'],
{ x: 65, duration: 1 },
0).

to('.cake__face', { duration: 1, x: -48.82 }, 0);

const flickerSpeed = 0.1;
const FLICKER_TL = timeline().
to('.candle__flame-outer', {
  duration: flickerSpeed,
  repeat: -1,
  yoyo: true,
  morphSVG: '#flame-outer' }).

to(
'.candle__flame-inner',
{
  duration: flickerSpeed,
  repeat: -1,
  yoyo: true,
  morphSVG: '#flame-inner' },

0);


const SHAKE_TL = () =>
timeline({ delay: 0.5 }).
set('.cake__face', { display: 'none' }).
set('.cake__face--straining', { display: 'block' }).
to(
'.birthday-button',
{
  onComplete: () => {
    set('.cake__face--straining', { display: 'none' });
    set('.cake__face', { display: 'block' });
  },
  x: 1,
  y: 1,
  repeat: 13,
  duration: 0.1 },

0).

to(
'.cake__candle',
{
  onComplete: () => {
    FLICKER_TL.play();
  },
  onStart: () => {
    SOUNDS.POP.play();
    delayedCall(0.2, () => SOUNDS.POP.play());
    delayedCall(0.4, () => SOUNDS.POP.play());
  },
  ease: 'Elastic.easeOut',
  duration: 0.2,
  stagger: 0.2,
  scaleY: 1 },

0.2);

const FLAME_TL = () =>
timeline({}).
to('.cake__candle', { '--flame': 1, stagger: 0.2, duration: 0.1 }).
to('body', { '--flame': 1, '--lightness': 5, duration: 0.2, delay: 0.2 });
const LIGHTS_OUT = () =>
timeline().to('body', {
  onStart: () => {
    SOUNDS.BLOW.play();
    // Activate full page black overlay
    const overlay = document.getElementById('lights-out-overlay');
    if (overlay) {
      overlay.classList.add('active');
    }
  },
  delay: 0.5,
  '--lightness': 0,
  duration: 0.1,
  '--glow-saturation': 0,
  '--glow-lightness': 0,
  '--glow-alpha': 1,
  '--transparency-alpha': 1 });


const RESET = () => {
  set('.char', {
    '--hue': () => Math.random() * 360,
    '--char-sat': 0,
    '--char-light': 0,
    x: 0,
    y: 0,
    opacity: 1 });

  set('body', {
    '--frosting-hue': Math.random() * 360,
    '--glow-saturation': 50,
    '--glow-lightness': 35,
    '--glow-alpha': 0.4,
    '--transparency-alpha': 0,
    '--flame': 0 });

  set('.cake__candle', { '--flame': 0 });
  to('body', {
    '--lightness': 50,
    duration: 0.25 });
  
  // Remove lights out overlay on reset
  const overlay = document.getElementById('lights-out-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }

  // SET THESE
  set('.cake__frosting--end', { opacity: 0 });
  set('#frosting', {
    transformOrigin: '50% 10%',
    scaleX: 0,
    scaleY: 0 });

  set('.cake__frosting-patch', { display: 'none' });
  set(['.cake__frosting--duplicate', '.cake__sprinkles--duplicate'], { x: -65 });
  set('.cake__face', { x: -110 });
  set('.cake__face--straining', { display: 'none' });
  set('.cake__sprinkle', {
    '--sprinkle-hue': () => Math.random() * 360,
    scale: 0,
    transformOrigin: '50% 50%' });

  set('.birthday-button', { scale: 0.6, x: 0, y: 0 });
  set('.birthday-button__cake', { 
    display: 'block', 
    opacity: 0,
    bottom: -40,
    yPercent: 0,
    width: 280
  });
  const cake = document.querySelector('.birthday-button__cake');
  if (cake) {
    cake.classList.remove('visible');
  }
  const btn = document.querySelector('.birthday-button__button');
  if (btn) {
    btn.classList.remove('hidden');
    btn.style.opacity = '';
    btn.style.transform = '';
  }
  const container = document.querySelector('.birthday-button');
  if (container) {
    container.classList.remove('cake-highlight');
  }
  set('.cake__candle', { scaleY: 0, transformOrigin: '50% 100%' });
};
RESET();
const MASTER_TL = timeline({
  onStart: () => {
    SOUNDS.ON.play();
  },
  onComplete: () => {
    gsap.delayedCall(2, () => {
      window.location.href = "indexX.html";
    });
    BTN.removeAttribute('disabled');
  },
  paused: true }).

set('.birthday-button__cake', { display: 'block', opacity: 0 }).
to('.birthday-button', {
  onStart: () => SOUNDS.CHEER.play(),
  scale: 1,
  duration: 0.2 }).

to('.char', { '--char-sat': 70, '--char-light': 65, duration: 0.2 }, 0).
to('.char', {
  onStart: () => SOUNDS.HORN.play(),
  delay: 0.75,
  y: () => gsap.utils.random(-100, -200),
  x: () => gsap.utils.random(-50, 50),
  duration: () => gsap.utils.random(0.5, 1) }).

to('.char', { opacity: 0, duration: 0.25 }, '>-0.5').
to('.birthday-button__button', {
  onComplete: () => {
    // Hide button completely after text disappears
    const btn = document.querySelector('.birthday-button__button');
    if (btn) {
      btn.classList.add('hidden');
    }
  },
  opacity: 0,
  scale: 0.8,
  duration: 0.5
}, '>-0.3').
to('.birthday-button__cake', {
  opacity: 1,
  yPercent: 50,
  bottom: '50%',
  width: 320,
  duration: 0.8,
  ease: 'power2.out',
  onStart: () => {
    // Add class to center cake
    const container = document.querySelector('.birthday-button');
    if (container) {
      container.classList.add('cake-highlight');
    }
    const cake = document.querySelector('.birthday-button__cake');
    if (cake) {
      cake.classList.add('visible');
    }
  }
}, '>-0.2').
add(FROSTING_TL()).
add(SPRINKLES_TL()).
add(SPIN_TL()).
add(SHAKE_TL()).
add(FLAME_TL(), 'FLAME_ON').
add(LIGHTS_OUT(), 'LIGHTS_OUT');

SOUNDS.TUNE.onended = SOUNDS.MATCH.onended = () => MASTER_TL.play();
MASTER_TL.addPause('FLAME_ON', () => SOUNDS.MATCH.play());
MASTER_TL.addPause('LIGHTS_OUT', () => SOUNDS.TUNE.play());
// Confetti creation function
function createConfetti() {
  const confettiContainer = document.querySelector('.confetti-container');
  if (!confettiContainer) return;
  
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = Math.random() * 10 + 5 + 'px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.opacity = Math.random();
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    const animationDuration = Math.random() * 3 + 2;
    const animationDelay = Math.random() * 0.5;
    
    confetti.style.animation = `confettiFall ${animationDuration}s ${animationDelay}s linear forwards`;
    
    confettiContainer.appendChild(confetti);
    
    setTimeout(() => {
      confetti.remove();
    }, (animationDuration + animationDelay) * 1000);
  }
}

// Add confetti animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(720deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

BTN.addEventListener('click', () => {
  BTN.setAttribute('disabled', true);
  
  // Hide the "Click the button" label bila button ditekan
  const label = document.querySelector('.click-label');
  if (label) label.style.display = 'none';
  
  // Create confetti
  createConfetti();
  
  // Create more confetti after a delay
  setTimeout(() => createConfetti(), 300);
  setTimeout(() => createConfetti(), 600);
  
  MASTER_TL.restart();
});


SOUNDS.TUNE.muted = SOUNDS.MATCH.muted = SOUNDS.HORN.muted = SOUNDS.POP.muted = SOUNDS.CHEER.muted = SOUNDS.BLOW.muted = SOUNDS.ON.muted = false;

const toggleAudio = () => {
  SOUNDS.TUNE.muted = SOUNDS.MATCH.muted = SOUNDS.POP.muted = SOUNDS.HORN.muted = SOUNDS.CHEER.muted = SOUNDS.BLOW.muted = SOUNDS.ON.muted = !SOUNDS.
  BLOW.muted;
};

// Only add event listener if volume control exists
const volumeControl = document.querySelector('#volume');
if (volumeControl) {
  volumeControl.addEventListener('input', toggleAudio);
}