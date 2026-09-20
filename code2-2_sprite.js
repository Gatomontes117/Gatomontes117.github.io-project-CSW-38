/*
   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 3
   Case Problem 2

   Animated Soldier Sprite - Canvas Animation Script
   Author:
   Date:

   Filename: code2-2_sprite.js

   Animates a squad marching across #marchCanvas using the 8 Enclave
   soldier images (Enclave_Man_1.jpeg ... Enclave_Man_8.jpeg) as
   walk-cycle frames. These are plain JPEGs with their original solid
   background intact (JPEG has no alpha channel, so each frame draws as
   an opaque rectangle rather than blending into the page). Preload the
   images, then swap which frame is drawn on a timer while nudging each
   soldier's x-position - the same idea as a horizontal sprite-sheet
   animation, just with one file per frame instead of one file cut into
   columns.
*/

(function () {
   "use strict";

   // --- Configuration -----------------------------------------------
   const FRAME_FILES = [
      "Enclave.Man.1.jpeg",
      "Enclave.Man.2.jpeg",
      "Enclave.Man.3.jpeg",
      "Enclave.Man.4.jpeg",
      "Enclave.Man.5.jpeg",
      "Enclave.Man.6.jpeg",
      "Enclave.Man.7.jpeg",
      "Enclave.Man.8.jpeg"
   ];

   const FRAME_DELAY_MS = 130;   // how long each pose is shown
   const STEP_PX = 3;            // horizontal movement per tick
   const SCALE = 2;              // draw sprites at 2x their native size
   const GROUND_Y = 225;         // y-position (feet line) sprites stand on
   const SOLDIER_SPACING = 140;  // px between soldiers in the squad
   const SOLDIER_COUNT = 5;
   const COLOR_GROUND = "#605746";

   let canvas, ctx;
   let frames = [];
   let framesLoaded = 0;
   let frameIndex = 0;
   let squadX = 0;
   let frameWidth = 0;
   let frameHeight = 0;

   function drawGround() {
      ctx.strokeStyle = COLOR_GROUND;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(canvas.width, GROUND_Y);
      ctx.stroke();
   }

   function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGround();

      const img = frames[frameIndex];
      if (!img) return;

      const drawW = frameWidth * SCALE;
      const drawH = frameHeight * SCALE;
      const spanWidth = SOLDIER_SPACING * SOLDIER_COUNT;

      for (let i = 0; i < SOLDIER_COUNT; i++) {
         let x = (squadX + i * SOLDIER_SPACING) % (canvas.width + spanWidth);
         x -= SOLDIER_SPACING; // start just off the left edge
         ctx.drawImage(img, x, GROUND_Y - drawH, drawW, drawH);
      }
   }

   function tick() {
      frameIndex = (frameIndex + 1) % frames.length;
      squadX += STEP_PX;
      render();
   }

   function startAnimationWhenReady() {
      framesLoaded++;
      if (framesLoaded === FRAME_FILES.length) {
         frameWidth = frames[0].naturalWidth;
         frameHeight = frames[0].naturalHeight;
         render();
         setInterval(tick, FRAME_DELAY_MS);
      }
   }

   function init() {
      canvas = document.getElementById("marchCanvas");
      if (!canvas || !canvas.getContext) {
         return; // canvas not supported / not found, fail quietly
      }
      ctx = canvas.getContext("2d");

      frames = FRAME_FILES.map(function (fileName) {
         const img = new Image();
         img.onload = startAnimationWhenReady;
         img.src = fileName;
         return img;
      });
   }

   document.addEventListener("DOMContentLoaded", init);
})();
