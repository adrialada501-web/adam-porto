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
  // BOX SECTION ANIMATION
  // =========================
  const boxContainer = document.querySelector(".box-container");
  
  ScrollTrigger.create({
    trigger: ".box-section",
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      // Memberikan efek parallax lembut saat masuk ke layar
      gsap.set(boxContainer, {
        yPercent: -60 * (1 - progress),
      });
    },
  });
});