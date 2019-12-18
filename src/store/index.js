import Vue  from 'vue'
import Vuex from 'vuex'
import lib  from '../libs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    field_x: 10,
    field_y: 10,
    field_width: 500,
    field_height: 300,
    corner_radius: 30,
    points_quantity: 7,
    field_image: 'https://gratisography.com/wp-content/uploads/2019/11/gratisography-laptop-colorful-keys-900x600.jpg',
    points: [
      { x: 112, y: 49 },
      { x: 373, y: 50 },
      { x: 351, y: 197 },
      { x: 134, y: 238 },
    ],
  },
  getters: {
    clip_path: ({ field_x, field_y, field_width, field_height, points, corner_radius, points_quantity }) => {
      const rounded_points = lib.make_points(points, corner_radius, points_quantity);
      const res = rounded_points.reduce((acc, point) => {
        const x = (point.x - field_x) / field_width * 100;
        const y = (point.y - field_y) / field_height * 100;
        return `${acc} ${x.toFixed(2)}% ${y.toFixed(2)}%,`;
      }, '');

      return res.slice(0, -1);
    },

  },
  mutations: {
    SET_FIELD_WIDTH: (state, val) => {
      state.field_width = val;
    },
    SET_FIELD_HEIGHT: (state, val) => {
      state.field_height = val;
    },
    SET_CORNER_RADIUS: (state, val) => {
      state.corner_radius = val;
    },
    SET_POINTS_QUANTITY: (state, val) => {
      state.points_quantity = val;
    },
    SET_POINT_COORDS: (state, val) => {
      const { field_x, field_y, field_width, field_height } = state;
      const { x, y, idx } = val;
      if (x < field_x) val.x = field_x;
      if (x > field_x + field_width) val.x = field_x + field_width;
      if (y < field_y) val.y = field_y;
      if (y > field_y + field_height) val.y = field_y + field_height;
      Object.assign(state.points[idx], val);
    },
    // UPDATE_COORDS: (state, val) => {
    //   const { x, y, idx } = val;
    // },
  },
  actions: {
  },
  modules: {
  }
})