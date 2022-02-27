export default {
  settle: (val: any, target: any, range: any) => {
    const lowerRange = val > target - range && val < target;
    const upperRange = val < target + range && val > target;
    return lowerRange || upperRange ? target : val;
  },
  getPointFromTouch: (touch: any) => {
    return {
      x: touch.clientX,
      y: touch.clientY,
    };
  },
  getDistanceBetweenPoints: (pointA: any, pointB: any) =>
    Math.sqrt(
      Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2)
    ),
  between: (min: any, max: any, value: any) =>
    Math.min(max, Math.max(min, value)),
};
