// cw_animation.js
// Spins two images continuously and pauses the spin on mouse hover

window.addEventListener("load", function () {
   // Welcome image (cw_image07) and Spotlight image (cw_image01)
   var img07 = document.querySelector("article p img[src='cw_image07.png']");
   var img01 = document.querySelector("section#spotlight img[src='cw_image01.png']");

   if (img07) {
      img07.classList.add("spin07");
   }
   if (img01) {
      img01.classList.add("spin01");
   }

   // Pause on hover, resume on mouse leave
   [img07, img01].forEach(function (img) {
      if (!img) return;
      img.addEventListener("mouseover", function () {
         img.style.animationPlayState = "paused";
      });
      img.addEventListener("mouseout", function () {
         img.style.animationPlayState = "running";
      });
   });
});