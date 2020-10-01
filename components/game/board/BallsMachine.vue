<template>
  <aside
    class="game-balls-machine relative row-1-1 pb-2"
    :class="{ full: !spin }"
  >
    <!-- <v-spacer></v-spacer> -->
    <!-- :style="{ backgroundImage: `url(${getImgUrl(`blower`)})` }" -->
    <div id="canvas-wrapper">
      <canvas id="canvas" class="full"></canvas>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameBallsMachine',
  props: {
    balls: { type: Array, default: () => [] },
    spin: { type: Boolean, default: () => false },
  },
  data() {
    return {
      canvasWidth: 255,
      canvasHeight: 255,
      ballRadius: 15,
      ballsCount: 0,
      canvas: null,
      cBalls: [],
      needToInit: true,
      runner: null,
      render: null,
    };
  },
  computed: {
    ...mapGetters({
      isDrawing: 'game/getIsDrawing',
    }),
  },
  watch: {
    balls(val) {
      this.ballsCount = val.length;
      if (this.needToInit && val.length) {
        this.needToInit = false;
        setTimeout(() => {
          this.initBlower();
        }, 0);
      } else {
        console.log('NEDD TO UPDATE BALLS');
        //  this.cBalls = this.cBalls.splice
      }
    },
    isDrawing() {
      if (this.isDrawing) {
        this.setBlowerAniamtion();
      } else {
        this.removeBlowerAniamtion();
      }
    },
  },
  mounted() {
    this.canvas = document.querySelector(`#canvas`);
  },
  methods: {
    onRenderTick() {
      const Body = this.$matter.Body;

      this.cBalls.forEach((ball) => {
        if (ball.position.y >= this.render.canvas.height - 100) {
          Body.applyForce(
            ball,
            { x: ball.position.x, y: ball.position.y },
            { x: 0.003, y: -0.003 }
          );
        }
        if (ball.position.y < 120) {
          Body.applyForce(
            ball,
            { x: ball.position.x, y: ball.position.y },
            { x: -0.003, y: 0.003 }
          );
        }

        if (ball.position.x < 80) {
          Body.applyForce(
            ball,
            { x: ball.position.x, y: ball.position.y },
            { x: 0.003, y: -0.003 }
          );
        }

        if (ball.position.x > this.render.canvas.width - 80) {
          Body.applyForce(
            ball,
            { x: ball.position.x, y: ball.position.y },
            { x: -0.003, y: 0.003 }
          );
        }
      });
    },
    createBall(i) {
      const ball = this.$matter.Bodies.circle(
        this.render.canvas.width / 2 - this.ballRadius,
        this.render.canvas.height / 2 - 2 * this.ballRadius,
        this.ballRadius,
        {
          restitution: 0.3,
          render: {
            sprite: {
              texture: `https://res.cloudinary.com/${process.env.cloudinaryName}/image/upload/w_75,h_75,c_fill,r_max/v1/${this.balls[i].public_id}.png`,
            },
          },
        }
      );
      this.cBalls.push(ball);
      return ball;
    },
    initBlower() {
      const Engine = this.$matter.Engine;
      const Render = this.$matter.Render;
      const World = this.$matter.World;
      const Bodies = this.$matter.Bodies;
      const Runner = this.$matter.Runner;

      const engine = Engine.create();
      this.runner = Runner.run(engine);

      const render = Render.create({
        canvas: this.canvas,
        engine,
        options: {
          wireframes: false,
          width: this.canvasWidth,
          height: this.canvasHeight,
          background: 'transparent',
        },
      });
      this.render = render;

      // Add the balls to the scene
      for (let i = 0; i < this.ballsCount; i++) {
        World.add(engine.world, this.createBall(i));
      }

      // Run the engine
      Engine.run(engine);
      Render.run(render);

      /**
       * Build the circle bounds - BEGIN
       * */
      const addBody = (...bodies) => {
        World.add(engine.world, ...bodies);
      };

      const addRect = ({ x = 0, y = 0, w = 10, h = 10, options = {} } = {}) => {
        const body = Bodies.rectangle(x, y, w, h, options);
        addBody(body);
        return body;
      };

      const sW = this.canvasWidth;
      const sH = this.canvasWidth;
      const m = Math.min(sW, sH);
      const rat = (1 / 4.5) * 2;
      const r = m * rat;
      const pegCount = 64;
      const TAU = Math.PI * 2;
      for (let i = 0; i < pegCount; i++) {
        const segment = TAU / pegCount;
        const angle2 = (i / pegCount) * TAU + segment / 2;
        const x2 = Math.cos(angle2);
        const y2 = Math.sin(angle2);
        const cx2 = x2 * r + sW / 2;
        const cy2 = y2 * r + sH / 2;
        addRect({
          x: cx2,
          y: cy2,
          w: (100 / 1000) * m,
          h: (3000 / 1000) * m,
          options: {
            angle: angle2,
            isStatic: true,
            density: 1,
            render: {
              fillStyle: 'transparent',
              strokeStyle: 'white',
              lineWidth: 0,
            },
          },
        });
      }
      // Build the circle bounds - END

      // Start the blowing with X seconds delay
      // setTimeout(() => {
      //   this.setBlowerAniamtion();
      //   setTimeout(() => {
      //     this.removeBlowerAniamtion();
      //   }, 10000);
      // }, 3000);
    },
    setBlowerAniamtion() {
      const Events = this.$matter.Events;
      Events.on(this.runner, 'tick', this.onRenderTick);
    },
    removeBlowerAniamtion() {
      const Events = this.$matter.Events;
      Events.on(this.runner, 'tick', () => {});
    },
    getImgUrl(file) {
      return require(`~/assets/pngs/${file}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
#canvas-wrapper {
  background-repeat: no-repeat;
  background-size: cover;
  // background-size: 150% 100%;
  // flex: 1 0 a;
  // max-height: 255px;
  // height: 255px;
  height: 100%;
}
</style>
