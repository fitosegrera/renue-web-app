<script>
  import { onMount } from "svelte";

  const primaryLight = "#D9F3A1";

  const primaryDarkAlpha = "#2D3B0F55";
  const secondaryVariant = "#54768055";

  let c1, c2;
  let myParticles = [];
  let colorOptions = [secondaryVariant];
  let particleSpeed = 0;

  onMount(async () => {
    const p5Module = await import("p5");
    let P5 = p5Module.default;
    new P5(sketch);

    // console.log(memory_data);
  });

  const sketch = (p5) => {
    let canv;

    p5.preload = () => {};

    p5.setup = () => {
      canv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canv.parent("bg-bubbles");

      p5.rectMode(p5.CENTER);
      p5.noFill();
      p5.smooth();
      p5.noCursor();

      c1 = p5.color("#FFFFFF");
      c2 = p5.color(primaryLight);
    };

    p5.draw = () => {
      setGradient(0, 0, p5.width, p5.height, c1, c2);

      for (let i = myParticles.length - 1; i >= 0; i--) {
        myParticles[i].updateParticle();
        if (myParticles[i].isAlive == false) {
          myParticles.splice(i, 1);
        }
      }
    };

    p5.mouseMoved = () => {
      if (particleSpeed < 5) {
        particleSpeed++;
      } else {
        particleSpeed = 0;
      }

      myParticles.push(
        new Particle(p5.mouseX, p5.mouseY, particleSpeed, colorOptions[0])
      );
    };

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    function setGradient(x, y, w, h, c1, c2) {
      p5.noFill();

      for (let i = y; i <= y + h; i++) {
        let inter = p5.map(i, y, y + h, 0, 1);
        let c = p5.lerpColor(c1, c2, inter);
        p5.stroke(c);
        p5.line(x, i, x + w, i);
      }
    }

    //////////////////
    // BUBBLE CLASS //
    //////////////////
    class Particle {
      constructor(startX, startY, speed, tempC) {
        this.particleScale = p5.random(2, 25);
        this.particleSpeed = p5.random(1, 6);
        this.particlePoint = { x: startX, y: startY, z: tempC };
        this.c = tempC;
        this.value = p5.alpha(this.c);
        this.isAlive = true;

        p5.stroke(this.c);
        p5.noFill();
        p5.ellipse(
          this.particlePoint.x,
          this.particlePoint.y,
          this.particleScale * 0.75,
          this.particleScale * 0.75
        );
      }

      updateParticle() {
        p5.smooth();
        this.particlePoint.y =
          this.particlePoint.y - p5.sin(this.particleSpeed) * 0.9;
        this.particlePoint.x =
          this.particlePoint.x + p5.cos(this.particlePoint.x);

        if (this.particleScale > 0) {
          this.particleScale--;
        } else {
          this.isAlive = false;
        }

        p5.fill(this.c);
        p5.ellipse(
          this.particlePoint.x,
          this.particlePoint.y,
          this.particleScale,
          this.particleScale
        );
        p5.fill(this.c);
        // p5.ellipse(
        //   this.particlePoint.x,
        //   this.particlePoint.y,
        //   this.particleScale * 0.75,
        //   this.particleScale * 0.75
        // );
        p5.noFill();
        p5.noStroke();
      }
    }
  };
</script>
