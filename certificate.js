import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SplitText } from "gsap/SplitText";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import legalContract from "./images/LegalContract.jpeg";
import website from "./images/SertifikatWebsite.jpg";
import english from "./images/SertifikatEnglish.jpg";
import erp from "./images/SertifikatERP.jpg";
import coa from "./images/SertifikatPelatihan_BLK.jpg";

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

  const certificateImages = {
    legalContract,
    website,
    english,
    erp,
    coa,
  };

const modal = document.querySelector(".certificate-modal");
const modalImage = document.querySelector("#certificate-image");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".certificate-btn").forEach((button) => {
  button.addEventListener("click", () => {

    modalImage.style.opacity = "0";

    const img = new Image();

    img.src = certificateImages[button.dataset.image];

    img.onload = () => {

        modalImage.src = img.src;

        modal.classList.add("show");

        requestAnimationFrame(() => {
            modalImage.style.opacity = "1";
        });

    };

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