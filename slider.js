import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SplitText } from "gsap/SplitText";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { triplanarTexture } from "three/tsl";

gsap.registerPlugin(ScrollTrigger, SplitText);

document.addEventListener("DOMContentLoaded", () => {
  // =========================
  // LENIS SETUP
  // =========================
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  const slides = [
    {
        title:
            "At BP3C Curug, I supported legal documentation, information management, and the development of the institution's official website.",
        image: "/images/AdamBP3C12.jpg",
    },
    {
        title:
            "Building strong legal foundations through public service, compliance, and digital innovation.",
        image: "/images/AdamBP3C6.jpg",
    },
    {
        title:
            "At Mudiar Law Office, I strengthened my legal research, drafting, and litigation support skills through real cases.",
        image: "/images/Mudiar2.jpeg",
    },
    {
        title:
            "At Pandeglang District Court, I learned how precision, organization, and accountability support the judicial process.",
        image: "/images/PNP1.jpeg",
    },  
  ];

  const pinDistance = window.innerHeight * slides.length;
  const progressBar = document.querySelector(".slider-progress");
  const sliderImages = document.querySelector(".slider-images");
  const sliderTitle = document.querySelector(".slider-title");
  const sliderIndices = document.querySelector(".slider-indices");

  let activeSlide = 0;
  let currentSplit = null;

  function createIndices() {
    sliderIndices.innerHTML = "";

    slides.forEach((_, index) => {
        const indexNum = (index + 1).toString().padStart(2, "0");
        const indicatorElement = document.createElement("p");
        indicatorElement.dataset.index = index;
        indicatorElement.innerHTML = `<span class="marker"></span><span class="index">${indexNum}</span>`;
        sliderIndices.appendChild(indicatorElement);

        if (index === 0) {
            gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 1,
            });
            gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 1,
            });
        } else {
            gsap.set(indicatorElement.querySelector(".index"), {
                opacity: 0.35,
            });
            gsap.set(indicatorElement.querySelector(".marker"), {
                scaleX: 0,
            });
        }
    });
  }

  function animateNewSlide(index) {
    const newSliderImage = document.createElement("img");
    newSliderImage.src = slides[index].image;
    newSliderImage.alt = `Slide ${index + 1}`;

    gsap.set(newSliderImage, {
        opacity: 0,
        scale: 1.1,
    });

    sliderImages.appendChild(newSliderImage);

    gsap.to(newSliderImage, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
    });

    gsap.to(newSliderImage, {
        scale: 1,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto",
    });

    const allImages = sliderImages.querySelectorAll("img");
    if (allImages.length > 3) {
        const removeCount = allImages.length - 3;
        for (let i = 0; i < removeCount; i++) {
             sliderImages.removeChild(allImages[i]);
        }
    }

    animateNewTitle(index);
    animateIndicators(index);
  }

  function animateIndicators(index) {
    const indicators = sliderIndices.querySelectorAll("p");

    indicators.forEach((indicator, i) => {
        const markerElement = indicator.querySelector(".marker");
        const indexElement = indicator.querySelector(".index");

        if (i === index) {
        gsap.to([indexElement, markerElement], {
          opacity: 1,
          scaleX: 1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
        } else {
            gsap.to(indexElement, {
                opacity: 0.5,
                duration: 0.3,
                ease: "power2.out",
            });

            gsap.to(markerElement, {
                scaleX: 0,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    });
  }

  function animateNewTitle(index) {
    if (currentSplit) {
        currentSplit.revert();
    }

    sliderTitle.innerHTML = `<h1>${slides[index].title}</h1>`;
    currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
        type: "lines",
        linesClass: "line",
        mask: "lines",
    });

    gsap.set(currentSplit.lines, {
        yPercent: 100,
        opacity: 0,
    });

    gsap.to(currentSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        overwrite: "auto",
    });
  }

  createIndices();

  sliderTitle.innerHTML = `<h1>${slides[0].title}</h1>`;
  currentSplit = new SplitText(sliderTitle.querySelector("h1"), {
      type: "lines",
      linesClass: "line",
    });

  ScrollTrigger.create({
    trigger: ".slider",
    start: "top top",
    end: `+=${pinDistance}px`,
    scrub: 1,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      gsap.set(progressBar, {
        scaleY: self.progress,
      });

      const currentSlide = Math.min(
        Math.floor(self.progress * slides.length),
        slides.length - 1
      );

      if (activeSlide !== currentSlide) {
        activeSlide = currentSlide;
        animateNewSlide(activeSlide);
      }
    },
  });
});