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

  // =========================
  // HERO ANIMATION
  // =========================

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-section",
      start: "top bottom",
      end: "top top",
      scrub: true,
    },
  });

  // Nama
  heroTl.to(
    ".hero-col p",
    {
        yPercent: -105,
        opacity: 0.5,
        ease: "none",
    },
    0
  );
  
  // Judul utama
  heroTl.to(
    ".hero-col h2",
    {
      yPercent: -110,
      opacity: 0,
      ease: "none",
    },
    0
  );

  // Kolom kanan
  heroTl.to(
    ".hero-sub-col",
    {
      yPercent: -30,
      opacity: 0.5,
      ease: "none",
    },
    0
  );

  // Baris bawah
  heroTl.to(
    ".hero-row:last-child",
    {
      yPercent: -15,
      opacity: 0,
      ease: "none",
    },
    0
  );

  // Seluruh container sedikit naik
  heroTl.to(
    ".hero-content",
    {
      yPercent: -20,
      ease: "none",
    },
    0
  );
});