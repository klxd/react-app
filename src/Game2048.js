import React, {Component} from 'react';
import './Game2048.css';
class Game2048 extends Component {
  constructor() {
    super();
    this.init();
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  onKeyDown = (keyBoardEvent) => {
    let [isChange, ] = this.movePanel(keyBoardEvent.code);
    if (isChange > 0) {
      this.getNewNum();
    }
    this.setState({});
  };

  init = () => {
    this.score = 0;
    this.arr = [];
    for (let i = 0; i < 4; i++) {
      this.arr.push([0, 0, 0, 0]);
    }
    this.getNewNum();
    this.getNewNum();
  };

  getNewNum = () => {
    let position = this.getRandomEmpty();
    if (position >= 0) {
      this.arr[Math.floor(position / 4)][position % 4] = Game2048.getNextCellNumber();
    }
  };

  getRandomEmpty() {
    let emptyPosition = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.arr[i][j] === 0) {
          emptyPosition.push(i * 4 + j);
        }
      }
    }
    if (emptyPosition.length === 0) {
      return -1;
    } else {
      return emptyPosition[Math.floor(Math.random() * emptyPosition.length)];
    }
  }

  static getNextCellNumber() {
    return Math.random() > 0.1 ? 2 : 4;
  }

  movePanel = (direction) => {
    let isAsc = true, isRow = true;
    switch (direction) {
      case 'ArrowLeft':
        break;
      case 'ArrowRight':
        isAsc = false;
        break;
      case 'ArrowUp':
        isRow = false;
        break;
      case 'ArrowDown':
        isAsc = false;
        isRow = false;
        break;
      default:
        return 0;
    }
    let newScore = 0;
    let isChange = false;
    for (let i = 0; i < 4; i++) {
      let j = isAsc ? 0 : 3;
      let step = isAsc ? 1 : -1;
      while ((isAsc && j < 3) || (!isAsc && j > 0)) {
        let nextI = i;
        let nextJ = j + step;
        if (!isRow) {
          [i, j] = [j, i];
          [nextI, nextJ] = [nextJ, nextI];
        }
        if (this.arr[i][j] !== 0 && this.arr[i][j] === this.arr[nextI][nextJ]) {
          this.arr[i][j] *= 2;
          this.arr[nextI][nextJ] = 0;
          newScore += this.arr[i][j];
          isChange = true;
        }
        [i, j] = isRow ? [i, j] : [j, i];
        j += step;
      }
      j = isAsc ? 0 : 3;
      while ((isAsc && j < 3) || (!isAsc && j > 0)) {
        [i, j] = isRow ? [i, j] : [j, i];
        if (this.arr[i][j] === 0) {
          let nextI = isRow ? i : i + step;
          let nextJ = isRow ? j + step : j;
          while (0 <= nextJ && nextJ <= 3 && 0 <= nextI && nextI <= 3) {
            if (this.arr[nextI][nextJ] !== 0) {
              this.arr[i][j] = this.arr[nextI][nextJ];
              this.arr[nextI][nextJ] = 0;
              isChange = true;
              break;
            }
            isRow ? nextJ += step : nextI += step;
          }
        }
        [i, j] = isRow ? [i, j] : [j, i];
        j += step;
      }
    }
    return [isChange, newScore];
  };

  showArray = () => {
    for (let i = 0; i < 4; i++) {
      console.log(this.arr[i]);
    }
  };

  render() {

    return (
      <div className="grid-container">
        {this.arr.map((row, index) => <div key={index} className="grid-row">
            {row.map((num, index) => <div key={index} className="grid-cell">{num === 0 ? '' : num}</div>)}
          </div>
        )}
      </div>
    );
  }
}

export default Game2048;