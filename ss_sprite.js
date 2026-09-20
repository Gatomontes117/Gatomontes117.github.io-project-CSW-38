(function () {
    "use strict";

    const FRAME_FILES = [
        "Enclave_Man_1.jpeg",
        "Enclave_Man_2.jpeg",
        "Enclave_Man_3.jpeg",
        "Enclave_Man_4.jpeg",
        "Enclave_Man_5.jpeg",
        "Enclave_Man_6.jpeg",
        "Enclave_Man_7.jpeg",
        "Enclave_Man_8.jpeg"
    ];

    const FRAME_DELAY_MS = 130;
    const STEP_PX = 3;
    const SCALE = 2;
    const GROUND_Y = 100;
    const SOLDIER_SPACING = 140;
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
        ctx.moveTo(0, GROUND_Y + 30);
        ctx.lineTo(canvas.Width, GROUND_Y + 30);
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
         x -= SOLDIER_SPACING; 
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
        canvas = document.getElementsById("marchCanvas");
        if (!canvas.getContext) {
            return;
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