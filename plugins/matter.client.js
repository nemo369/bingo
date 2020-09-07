import Matter from 'matter-js';

const $matter = {
  Engine: Matter.Engine,
  Render: Matter.Render,
  World: Matter.World,
  Bodies: Matter.Bodies,
  Runner: Matter.Runner,
  Events: Matter.Events,
  Body: Matter.Body,
};

export default (_, inject) => {
  inject('matter', $matter);
};
