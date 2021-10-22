/**
 * O(m * n) time | O(1) space
 */
class GameOfLife {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.universe = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push(0);
            }
            this.universe.push(row);
        }
    }

    seed(aliveCells) {
        for (let i = 0; i < aliveCells.length; i++) {
            let [row, col] = aliveCells[i];
            this.universe[row][col] = 1;
        }
    }

    generate() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.universe[row][col] = this.__getState(row, col);
            }
        }

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.universe[row][col] = this.universe[row][col] < 1 ? 0 : 1;
            }
        }
    }

    __getState(row, col) {
        let lives = 0;
        if (row > 0 && col > 0 && (this.universe[row - 1][col - 1] === 1 || this.universe[row - 1][col - 1] === -1)) lives += 1;
        if (row > 0 && (this.universe[row - 1][col] === 1 || this.universe[row - 1][col] === -1)) lives += 1;
        if (row > 0 && col < this.cols - 1 && (this.universe[row - 1][col + 1] === 1 || this.universe[row - 1][col + 1] === -1)) lives += 1;
        if (col > 0 && (this.universe[row][col - 1] === 1 || this.universe[row][col - 1] === -1)) lives += 1;
        if (col < this.cols - 1 && (this.universe[row][col + 1] === 1 || this.universe[row][col + 1] === -1)) lives += 1;
        if (row < this.rows - 1 && col > 0 && (this.universe[row + 1][col - 1] === 1 || this.universe[row + 1][col - 1] === -1)) lives += 1;
        if (row < this.rows - 1 && (this.universe[row + 1][col] === 1 || this.universe[row + 1][col] === -1)) lives += 1;
        if (row < this.rows - 1 && col < this.cols - 1 && (this.universe[row + 1][col + 1] === 1 || this.universe[row + 1][col + 1] === -1)) lives += 1;

        if (this.universe[row][col] === 0) return lives === 3 ? 2 : 0;

        return lives < 2 || lives > 3 ? -1 : 1;
    }
}

const aliveCells = [
    [11, 12],
    [12, 13],
    [13, 13],
    [13, 12],
    [13, 11],
];

const gameOfLife = new GameOfLife(25, 25);

gameOfLife.seed(aliveCells);

let i = 0;
while (i < 5) {
    for (let i = 0; i < gameOfLife.universe.length; i++) {
        console.log(gameOfLife.universe[i].toString());
    }

    gameOfLife.generate();
    console.log('\n');
    i++;
}
