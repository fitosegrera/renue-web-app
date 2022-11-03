<script>
  import { onMount } from "svelte";

  onMount(async () => {
    const p5Module = await import("p5");
    let P5 = p5Module.default;
    new P5(sketch);
  });

  const sketch = (p5) => {
    let canv;

    let pg;
    let pgSize = 200;
    let objs = [];
    let objNum = 20;

    p5.preload = () => {};

    p5.setup = () => {
      canv = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      canv.parent("bg-aurora");

      pg = p5.createGraphics(pgSize, pgSize);
      pg.colorMode(p5.HSB, 360, 100, 100, 100);
      pg.rectMode(p5.CENTER);
      pg.drawingContext.shadowBlur = 80;

      for (let i = 0; i < objNum; i++) {
        objs.push(new Obj());
      }
    };

    p5.draw = () => {
      p5.background("#ffffff");

      pg.blendMode(p5.BLEND);
      pg.background("#A6CF4D");

      pg.blendMode(p5.ADD);
      pg.fill(0);
      pg.noStroke();

      for (let i = 0; i < objs.length; i++) {
        objs[i].move(pg);
        objs[i].display(pg);
      }

      p5.image(pg, 0, 0, p5.width, p5.height);
      p5.fill(255, 255, 255, 200);
      p5.rect(0, 0, p5.width, p5.height);
    };

    p5.mouseMoved = () => {};

    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    };

    ///////////
    ///////////

    class Obj {
      constructor() {
        this.init();
        this.y = p5.random(-this.h / 2, pgSize + this.h / 2);
      }

      init() {
        this.w = p5.random(10, 30);
        this.h = p5.random(100, 300);

        this.x = p5.random(this.w, pgSize - this.w);

        this.speed = p5.random(10, 20) * 0.025;
        this.hue = 200; //p5.random(360);
        this.sat = 100; //p5.random(50, 100);
        this.bri = 70; //p5.random(30, 100);

        this.N = p5.random(1000);
      }

      move() {
        this.y -= this.speed;

        if (this.y < -this.h / 2) {
          this.init();
          this.y = pgSize + this.h / 2;
        }
      }

      display(targetPg) {
        targetPg.drawingContext.shadowColor = targetPg.color(
          this.hue,
          this.sat,
          this.bri,
          180
        );
        targetPg.rect(this.x, this.y, this.w, this.h, 50);
      }
    }
  };
</script>
