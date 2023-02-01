// Original JavaScript code by Chirp Internet: chirpinternet.eu
// Please acknowledge use of this code by including this header.

let mapArray;

const WIDTH = 10; //ALSO CHANGE IN GAMELOGIC
const LENGTH = 10;

const initArray = (value) => {
  return new Array(rows).fill().map(() => new Array(cols).fill(value));
};

const rand = (min, max) => {
  return min + Math.floor(Math.random() * (1 + max - min));
};

const posToSpace = (x) => {
  return 2 * (x - 1) + 1;
};

const posToWall = (x) => {
  return 2 * x;
};

const inBounds = (r, c) => {
  if (typeof mapArray[r] == "undefined" || typeof mapArray[r][c] == "undefined") {
    return false; // out of bounds
  }
  return true;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const partition = (r1, r2, c1, c2) => {
  // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

  let horiz, vert, x, y, start, end;

  if (r2 < r1 || c2 < c1) {
    return false;
  }

  if (r1 == r2) {
    horiz = r1;
  } else {
    x = r1 + 1;
    y = r2 - 1;
    start = Math.round(x + (y - x) / 4);
    end = Math.round(x + (3 * (y - x)) / 4);
    horiz = rand(start, end);
  }

  if (c1 == c2) {
    vert = c1;
  } else {
    x = c1 + 1;
    y = c2 - 1;
    start = Math.round(x + (y - x) / 3);
    end = Math.round(x + (2 * (y - x)) / 3);
    vert = rand(start, end);
  }

  for (let i = posToWall(r1) - 1; i <= posToWall(r2) + 1; i++) {
    for (let j = posToWall(c1) - 1; j <= posToWall(c2) + 1; j++) {
      if (i == posToWall(horiz) || j == posToWall(vert)) {
        mapArray[i][j] = "B";
      }
    }
  }

  let gaps = shuffle([true, true, true, false]);

  if (gaps[0]) {
    let gapPosition = rand(c1, vert);
    mapArray[posToWall(horiz)][posToSpace(gapPosition)] = [];
  }

  if (gaps[1]) {
    let gapPosition = rand(vert + 1, c2 + 1);
    mapArray[posToWall(horiz)][posToSpace(gapPosition)] = [];
  }

  if (gaps[2]) {
    let gapPosition = rand(r1, horiz);
    mapArray[posToSpace(gapPosition)][posToWall(vert)] = [];
  }

  if (gaps[3]) {
    let gapPosition = rand(horiz + 1, r2 + 1);
    mapArray[posToSpace(gapPosition)][posToWall(vert)] = [];
  }

  partition(r1, horiz - 1, c1, vert - 1);
  partition(horiz + 1, r2, c1, vert - 1);
  partition(r1, horiz - 1, vert + 1, c2);
  partition(horiz + 1, r2, vert + 1, c2);
};

const isGap = (...cells) => {
  return cells.every((array) => {
    let row, col;
    [row, col] = array;
    if (mapArray[row][col].length > 0) {
      if (!mapArray[row][col].includes("W")) {
        return false;
      }
    }
    return true;
  });
};

const cols = 2 * WIDTH + 1;
const rows = 2 * LENGTH + 1;

const generateMap = () => {
  mapArray = initArray(".");

  // place initial walls
  mapArray.forEach((row, r) => {
    row.forEach((cell, c) => {
      switch (r) {
        case 0:
        case rows - 1:
          mapArray[r][c] = "b";
          break;

        default:
          if (r % 2 == 1) {
            if (c == 0 || c == cols - 1) {
              mapArray[r][c] = "b";
            }
          } else if (c % 2 == 0) {
            mapArray[r][c] = "b";
          }
      }
    });
  });

  // start partitioning
  partition(1, LENGTH - 1, 1, WIDTH - 1);

  return mapArray;
};

module.exports = {
  generateMap,
};
