import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // LENIS
  // =========================

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  if (!tabs.length || !contents.length) return;

  let activeTab = "about";

  function switchTab(targetId) {

    if (targetId === activeTab) return;

    const current = document.getElementById(activeTab);
    const next = document.getElementById(targetId);

    const tl = gsap.timeline();

    // OUT animation (current content)
    tl.to(current, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        current.classList.remove("active");
      }
    });

    // IN animation (next content)
    tl.set(next, { display: "block" });

    tl.fromTo(next,
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
          next.classList.add("active");
        }
      }
    );

    activeTab = targetId;
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {

      const target = tab.dataset.tab;

      // update active button
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      switchTab(target);
    });
  });

  const carousel = document.querySelector(".carousel");
const group = document.querySelector(".group");
const originalCards = Array.from(group.children);

// 1. Duplikasi kartu
originalCards.forEach(card => {
  group.appendChild(card.cloneNode(true));
});

// 2. Kalkulasi Lebar Presisi
const cardWidth = originalCards[0].offsetWidth;
const gapStyle = window.getComputedStyle(group).gap;
const gap = parseFloat(gapStyle) || 0; 
const moveDistance = (cardWidth + gap) * originalCards.length;

// 3. Animasi timeline dasar
const loop = gsap.to(group, {
  x: -moveDistance,
  duration: 35, 
  ease: "none",
  repeat: -1,
});

let currentSpeed = 1;
let targetSpeed = 1;
const dragSensitivity = 1.2; 

// ==========================================
// ⚙️ MESIN ANIMASI (TICKER)
// ==========================================
gsap.ticker.add(() => {
  currentSpeed += (targetSpeed - currentSpeed) * 0.05; 
  loop.timeScale(currentSpeed);

  // 🛑 KUNCI PERBAIKAN: Mencegah "stuck" saat scroll ke atas
  // Jika animasi mundur dan menyentuh titik awal (0), lempar otomatis ke akhir (0.999)
  if (currentSpeed < 0 && loop.progress() <= 0) {
    loop.progress(0.999);
  }
});

// ==========================================
// 🖱️ FITUR DRAG / SLIDE 
// ==========================================
let isDragging = false;
let startX = 0;

carousel.addEventListener("pointerdown", (e) => {
  isDragging = true;
  startX = e.clientX;
  carousel.style.cursor = "grabbing";
  
  targetSpeed = 0; 
  currentSpeed = 0; 
});

window.addEventListener("pointermove", (e) => {
  if (!isDragging) return;
  
  const deltaX = e.clientX - startX;
  startX = e.clientX;
  
  let progressChange = (-deltaX * dragSensitivity) / moveDistance;
  let newProgress = loop.progress() + progressChange;
  
  newProgress = gsap.utils.wrap(0, 1, newProgress);
  loop.progress(newProgress);
});

window.addEventListener("pointerup", () => {
  if (!isDragging) return;
  isDragging = false;
  carousel.style.cursor = "grab";
  
  targetSpeed = 1; 
});

// ==========================================
// 📜 FITUR SCROLL ACCELERATION
// ==========================================
let scrollTimeout;

ScrollTrigger.create({
  trigger: ".about-section",
  start: "top bottom",
  end: "bottom top",
  onUpdate: (self) => {
    if (isDragging) return; 

    targetSpeed = self.direction * 15; 

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (!isDragging) {
        targetSpeed = 1; 
      }
    }, 150); 
  }
});
  

});