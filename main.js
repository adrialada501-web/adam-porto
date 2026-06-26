import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SplitText } from "gsap/SplitText";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import "./hero.js";
import "./about.js";
import "./footer.js";
import "./box.js";
import "./experience-hero.js";
import "./card.js";
import "./slider.js";

gsap.registerPlugin(ScrollTrigger);

// =========================
// LENIS INIT (WAJIB DI BAWAH IMPORT)
// =========================
const lenis = new Lenis();

// debug (boleh hapus nanti)
console.log("Lenis:", lenis);

// sync scroll
lenis.on("scroll", ScrollTrigger.update);

// GSAP ticker sync
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// refresh scrolltrigger
ScrollTrigger.refresh();

console.log("App Loaded");