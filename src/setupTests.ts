// Temporary hack to suppress error
// https://github.com/facebookincubator/create-react-app/issues/3199
window.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
  return 0;
};

import * as enzyme from "enzyme";
import * as Adapter from "enzyme-adapter-react-15";

enzyme.configure({ adapter: new Adapter() });
