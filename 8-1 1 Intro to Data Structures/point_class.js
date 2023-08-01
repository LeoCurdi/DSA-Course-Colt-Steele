class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // distance doesnt need to act onindividual instances because its not changing any member data
  // its just doing math on parameters that you pass in when you call it
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2)); // 7.0710678118654755