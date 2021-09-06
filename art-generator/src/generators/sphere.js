import React from "react";
import Sketch from "react-p5";

// export default class P5Sketch extends Component {

class Sphere {
  x = 0
  y = 0
  z = 0
  r = 1
  constructor(radius = 1, x = 0, y = 0, z = 0) {
    // setup sphere
    this.r = radius
    this.x = x
    this.y = y
    this.z = z
  }

  getVerticalDistance = (x, y, z = 0) => {
    // compute the vertical distance between the plane and a given point (x, y, z)
    const verticalPoint = Math.sqrt(
      Math.pow(this.r, 2) - Math.pow(x - this.x, 2) - Math.pow(y - this.y, 2)
    )
    if (z < this.z) {
      return this.z - verticalPoint
    } else {
      return this.z + verticalPoint
    }
  };
  // returns true if (x, y) is within the sphere's cylinder
  withinCylinder = (x, y) => Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2)) <= this.r

  // returns the maximum height of this sphere
  maxHeight = () => Math.abs(this.z)
}

export default (props) => {
  const { generator } = props
  const { numSpheres, id, } = generator // unpack generator props
  const width = 500
	const height = 500
	let spheres = []
  // x = Math.round(500 * Math.random());
  // y = Math.round(500 * Math.random());

  const setup = (p5, parent) => {
    p5.createCanvas(width, height).parent(parent);
    p5.noLoop();
		for (let i = 0; i < numSpheres; i++) {
			const sphere_r = Math.max(5 + Math.random() * 250, 255)
			const sphere_x = Math.max(Math.random() * width, width)
			const sphere_y = Math.max(Math.random() * height, height)
			const sphere_z = Math.random() * 255
			const sphere = new Sphere(sphere_r, sphere_x, sphere_y, sphere_z)
			spheres.push(sphere)
		}
  };

  const draw = (p5) => {
    // p5.background(0);
    // p5.ellipse(x, y, 70, 70);
		p5.background(255, 255, 255)
		for (let px = 0; px < width; px++) {
			for (let py = 0; py < height; py++) {
				spheres.forEach(sphere => {
					if (sphere.withinCylinder(px, py)) {
						const verticalDistance = sphere.getVerticalDistance(px, py)
						const normalVertical = (verticalDistance) / sphere.maxHeight()
						const redAmt = px/width * 255
						const greenAmt = py/height * 255
						const blueAmt = Math.abs(normalVertical) * 255
						p5.stroke(redAmt, greenAmt, blueAmt)
						p5.point(px, py)
					}
				})
			}
		}
  };

  // render() {
  return <Sketch setup={setup} draw={draw} />;
  // }
};
