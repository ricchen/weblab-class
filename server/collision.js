const intersect = (
  playerPosition,
  playerHeight,
  playerWidth,
  objectPosition,
  objectHeight,
  objectWidth
) => {
  const px = playerPosition.x;
  const py = playerPosition.y;
  const ox = objectPosition.x;
  const oy = objectPosition.y;

  const pointInside = (x, y) => {
    return x > ox && x < ox + objectWidth && y > oy && y < oy + objectHeight;
  };

  return (
    pointInside(px, py) ||
    pointInside(px + playerWidth, py) ||
    pointInside(px, py + playerHeight) ||
    pointInside(px + playerWidth, py + playerHeight)
  );
};

const collisionVector = (
  playerPosition,
  playerHeight,
  playerWidth,
  objectPosition,
  objectHeight,
  objectWidth
) => {
  //only to be called if INTERSECT

  const px = playerPosition.x;
  const py = playerPosition.y;
  const ox = objectPosition.x;
  const oy = objectPosition.y;

  const pointInside = (x, y) => {
    return x > ox && x < ox + objectWidth && y > oy && y < oy + objectHeight;
  };

  if (pointInside(px, py)) {
    moveX = ox + objectWidth - px;
    moveY = oy + objectHeight - py;
  } else if (pointInside(px + playerWidth, py)) {
    moveX = -(px + playerWidth - ox);
    moveY = oy + objectHeight - py;
  } else if (pointInside(px, py + playerHeight)) {
    moveX = ox + objectWidth - px;
    moveY = -(py + playerHeight - oy);
  } else if (pointInside(px + playerWidth, py + playerHeight)) {
    moveX = -(px + playerWidth - ox);
    moveY = -(py + playerHeight - oy);
  } else {
    return null;
  }

  if (Math.abs(moveX) < Math.abs(moveY)) {
    return { dx: moveX, dy: 0 };
  } else {
    return { dx: 0, dy: moveY };
  }
};

module.exports = {
  intersect,
  collisionVector,
};
