document.addEventListener("DOMContentLoaded", () => {
const message = `ASSALAMUALAIKUM WAHAI SAUDARI ZULAIKHA,

Alhamdulillah, syukur atas nikmat kurniaan Tuhan. Di kala hidup mendatangkan seribu satu keperitan dan dugaan, saudari tetap teguh berdiri, dan akhirnya tiba di hari yang dinanti penuh makna ini.

Saya, Muhammad Saiful Iqbal, ingin mengucapkan Selamat Ulang Tahun yang ke-20. Wahai saudari, menjelang dua dekad kehidupan saudari, saya sentiasa mengiringkan doa agar saudari sentiasa berada dalam keadaan sihat hendaknya, dikurniakan jiwa yang tenang, dan setiap satu urusan saudari dipermudahkan dengan penuh keberkatan.

Lebih bermakna lagi, ulang tahun saudari pada tahun ini jatuh sehari sebelum menjelangnya bulan yang mulia, Ramadan. Maka saya mengambil peluang ini untuk mengucapkan selamat beramal soleh sepanjang bulan Ramadan buat saudari sekeluarga.

Semoga kehidupan saudari di kehadapannya akan terus dikelilingi oleh insan-insan yang baik budi dan budiman, yang sentiasa mencoretkan senyuman kebahagiaan di wajah saudari.

Saya juga mengharapkan agar saudari akan terus berkarya dengan cara saudari yang tersendiri. Janganlah sesekali berhenti menyebarkan kebaikan kepada orang ramai, kerana secara tidak langsung saya yakin saudari telah mengubah ramai kehidupan masyarakat di luar sana.

Sebelum saya mengakhiri ucapan ini, izinkan saya menyampaikan serangkap pantun untuk saudari:

Bunga mawar mekar berseri,
Wangi semerbak di pagi hari;
Genaplah 20 usia saudari,
Moga seronoknya kekal abadi.

Selamat Ulang Tahun yang ke-20,
Zulaikha binti Mohammed Omar.

Ikhlas dari hati,
IqbalHappy`;

  const msgContainer = document.getElementById("message");
  let i = 0;

  function typeWriter() {
    if (i < message.length) {
      msgContainer.textContent += message.charAt(i);
      i++;
      
      // Random typing speed for more natural feel
      const baseSpeed = 40;
      const randomVariation = Math.random() * 20;
      const speed = baseSpeed + randomVariation;
      
      setTimeout(typeWriter, speed);
    } else {
      // Remove cursor when complete
      msgContainer.classList.add('complete');
      
      // After typing finishes, fade in signature with surprise
      setTimeout(() => {
        const s = document.getElementById('signature');
        if (s) { 
          s.style.opacity = '0'; 
          s.style.transition = 'opacity 1.5s ease, transform 1.5s ease'; 
          requestAnimationFrame(() => { 
            s.style.opacity = '1'; 
            s.style.transform = 'translateX(0)';
          }); 
        }
        
        // Create surprise sparkles around signature
        createSignatureSparkles();
      }, 500);
    }
  }

  // Start typing when card appears
  function startTypingWhenReady() {
    const wrapper = document.querySelector('.flowers-wrapper');
    if (!wrapper) {
      setTimeout(startTypingWhenReady, 100);
      return;
    }
    
    // Check if already visible
    if (wrapper.classList.contains('show')) {
      setTimeout(() => typeWriter(), 500);
      return;
    }
    
    // Watch for when card becomes visible
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (wrapper.classList.contains('show')) {
            setTimeout(() => typeWriter(), 500);
            observer.disconnect();
          }
        }
      });
    });
    
    observer.observe(wrapper, { attributes: true });
    
    // Fallback: also check periodically
    const checkInterval = setInterval(() => {
      if (wrapper.classList.contains('show')) {
        clearInterval(checkInterval);
        setTimeout(() => typeWriter(), 500);
        observer.disconnect();
      }
    }, 200);
  }
  
  startTypingWhenReady();

  // Enhanced hearts spawn with variety
  function spawnHeart() {
    const container = document.querySelector('.hearts');
    if (!container) return;
    
    const heart = document.createElement('div');
    const heartTypes = ['heart', 'heart-pink', 'heart-gold', 'heart-white'];
    const heartType = heartTypes[Math.floor(Math.random() * heartTypes.length)];
    heart.className = `heart ${heartType}`;
    
    const size = Math.random() * 15 + 8; // 8 - 23px
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.bottom = '-20px';
    heart.style.animationDuration = `${Math.random() * 4 + 6}s`;
    heart.style.opacity = `${0.4 + Math.random() * 0.6}`;
    heart.style.animationDelay = `${Math.random() * 0.5}s`;
    
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }

  // Sparkles spawn function
  function spawnSparkle() {
    const container = document.querySelector('.sparkles');
    if (!container) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 100}%`;
    sparkle.style.top = `${Math.random() * 100}%`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkle.style.animationDuration = `${Math.random() * 2 + 2}s`;
    
    container.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 4000);
  }

  // Create sparkles around signature
  function createSignatureSparkles() {
    const signature = document.getElementById('signature');
    if (!signature) return;
    
    const rect = signature.getBoundingClientRect();
    const container = document.querySelector('.sparkles');
    if (!container) return;
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
        sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
        sparkle.style.animation = 'sparkleFloat 1.5s ease-out forwards';
        sparkle.style.transform = 'scale(1.5)';
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
      }, i * 100);
    }
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!prefersReduced) {
    // Spawn hearts more frequently
    setInterval(spawnHeart, 500);
    // Spawn sparkles less frequently
    setInterval(spawnSparkle, 2000);
    
    // Initial sparkles burst
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        setTimeout(spawnSparkle, i * 100);
      }
    }, 500);
  }
});
