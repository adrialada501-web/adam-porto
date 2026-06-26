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

  // =========================
// CERTIFICATE MODAL
// =========================

const modal = document.querySelector(".certificate-modal");
const modalImage = document.querySelector("#certificate-image");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".certificate-btn").forEach((button) => {

    button.addEventListener("click", () => {

        modalImage.src = button.dataset.image;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

closeModal.addEventListener("click", () => {

    modal.classList.remove("show");

    document.body.style.overflow = "";

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }

});

});