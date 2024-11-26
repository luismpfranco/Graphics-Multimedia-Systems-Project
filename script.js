// script.js

document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const homePage = document.getElementById("home-page");
  const heroesPage = document.getElementById("heroes-page");
  const heroDetailPage = document.getElementById("hero-detail");

  // Buttons
  const btnHeroes = document.getElementById("btn-heroes");
  const btnMission = document.getElementById("btn-mission");
  const backToHome = document.getElementById("back-to-home");
  const backToHeroes = document.getElementById("back-to-heroes");

  // Hero details
  const heroImage = document.getElementById("hero-image");
  const heroDescription = document.getElementById("hero-description");
  const heroTip = document.getElementById("hero-tip");

  const heroData = {
    "super-fruta": {
      img: "super-fruta.png",
      desc: "Eu sou o Super Fruta! As frutas são cheias de vitaminas e fibras que te dão energia e mantêm o corpo forte.",
      tip: "Dica: Come uma fruta diferente todos os dias!"
    },
    "capita-vegetal": {
      img: "capita-vegetal.png",
      desc: "Eu sou a Capitã Vegetal! Os vegetais são importantes para a tua saúde, fornecendo vitaminas e minerais essenciais.",
      tip: "Dica: Experimenta um vegetal novo todas as semanas!"
    },
    "doutor-grao": {
      img: "doutor-grao.png",
      desc: "Eu sou o Doutor Grão! Os grãos integrais dão-te energia duradoura e ajudam-te na digestão.",
      tip: "Dica: Escolhe grãos integrais para teres mais energia!"
    }
  };

  // Navigation
  btnHeroes.addEventListener("click", () => switchPage(heroesPage));
  backToHome.addEventListener("click", () => switchPage(homePage));
  backToHeroes.addEventListener("click", () => switchPage(heroesPage));

  document.querySelectorAll(".hero").forEach(hero => {
    hero.addEventListener("click", () => {
      const heroId = hero.id;
      const data = heroData[heroId];
      heroImage.src = data.img;
      heroDescription.textContent = data.desc;
      heroTip.textContent = data.tip;
      switchPage(heroDetailPage);
    });
  });

  function switchPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");
  }
});