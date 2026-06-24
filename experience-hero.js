import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SplitText } from "gsap/SplitText";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // LENIS SETUP
  // =========================
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // =========================
  // ANIMASI TEKS
  // =========================
  const experienceCopySplit = new SplitText(".experience-copy h3", {
    type: "words",
    wordsClass: "word",
  });

  let isExperienceCopyHidden = false;

  // =========================
  // ANIMASI KARTU UTAMA (HERO)
  // =========================
  ScrollTrigger.create({
    trigger: ".experience-hero",
    start: "top top",
    end: `+=${window.innerHeight * 2.7}px`,
    pin: true,
    pinSpacing: false,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;

      // 1. Teks "Berbekal dengan pengalaman..." naik ke atas
      const experienceHeaderProgress = Math.min(progress / 0.29, 1);
      gsap.set(".experience-header", { yPercent: -experienceHeaderProgress * 100 });

      // 2. Efek teks SplitText memudar
      const experienceHeroWordsProgress = Math.max(0, Math.min((progress - 0.29) / 0.21, 1));
      const totalWords = experienceCopySplit.words.length;
      
      experienceCopySplit.words.forEach((word, i) => {
        const wordStart = i / totalWords;
        const wordEnd = (i + 1) / totalWords;
        const wordOpacity = Math.max(0, Math.min((experienceHeroWordsProgress - wordStart) / (wordEnd - wordStart), 1));
        gsap.set(word, { opacity: wordOpacity });
      });

      // 3. Sembunyikan teks copy saat scroll ke bawah
      if (progress > 0.64 && !isExperienceCopyHidden) {
        isExperienceCopyHidden = true;
        gsap.to(".experience-copy h3", { opacity: 0, duration: 0.2 });
      } else if (progress <= 0.64 && isExperienceCopyHidden) {
        isExperienceCopyHidden = false;
        gsap.to(".experience-copy h3", { opacity: 1, duration: 0.2 });
      }

      // 4. ✨ PERBAIKAN: Efek Gambar Utama Mengecil
      const heroImgProgress = Math.max(0, Math.min((progress - 0.71) / 0.29, 1));
      
      const heroImgWidth = gsap.utils.interpolate(window.innerWidth, 150, heroImgProgress);
      const heroImgHeight = gsap.utils.interpolate(window.innerHeight, 150, heroImgProgress);
      const heroImgBorderRadius = gsap.utils.interpolate(0, 10, heroImgProgress);

      // GSAP sekarang menargetkan tag IMG di dalam .experience-content sesuai HTML-mu
      gsap.set(".experience-content img", {
        width: heroImgWidth,
        height: heroImgHeight,
        borderRadius: heroImgBorderRadius,
      });
    }
  });

  // =========================
  // ANIMASI PARALLAX WALL
  // =========================
  // ✨ PERBAIKAN: Menyesuaikan dengan ID yang ada di HTML-mu
  const aboutImgCols = [
    { id: "#experience-imgs-col-1", y: -800 },
    { id: "#experience-imgs-col-2", y: -400 },
    { id: "#experience-imgs-col-3", y: -400 },
    { id: "#experience-imgs-col-4", y: -800 },
  ];

  aboutImgCols.forEach(({ id, y }) => {
    gsap.to(id, {
      y: y,
      ease: "none",
      scrollTrigger: {
        // ✨ PERBAIKAN: Target trigger diubah menjadi .experience-about
        trigger: ".experience-about",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  

});