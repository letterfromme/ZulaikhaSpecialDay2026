onload = () => {
  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");
    clearTimeout(c);
  }, 1000);
};

window.addEventListener("load", () => {
  // Tunggu sampai animasi bunga habis (contoh 6s)
  setTimeout(() => {
    window.location.href = "indexb.html";
  }, 6000); 
});

