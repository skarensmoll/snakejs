/**
 * Board Component
 */
class Board {
    /**
     * Creates an instance of board component
     */
    constructor() {
        this.table = document.getElementById(BoardSelectors.BOARD);
        this.ctx = this.table.getContext('2d');
        this.currentArea = this.table.width * this.table.width;
    }

    /**
     * Draws elements on canvan
     * @param {Object} param0 List of elements to be drawn on canvas,
     * each element carries its own properties
     */
    drawObject({ properties: { color: defaultColor, size }, elements }) {
        elements.forEach(element => {
            if (element.color) {
                this.ctx.fillStyle = element.color;
            } else {
                this.ctx.fillStyle = defaultColor;
            }
            this.ctx.fillRect(element.x, element.y, size, size);
            this.ctx.strokeRect(element.x, element.y, size, size);
        });
    }

    /**
     * Leaves canvas empty
     */
    clearBoard() {
        this.ctx.clearRect(0, 0, this.table.width, this.table.height);
    }

    /**
     * Reduces board's area
     */
    reduceBoardArea() {
        let sideLength = this.table.width - BoardConsts.REDUCE_RATIO;
        this.table.width = sideLength;
        this.table.height = sideLength;
    }

    /**
     * Returns current board's size
     * @return {Object} Object with board's measures
     */
    getSize() {
        return {
            width: this.table.width,
            height: this.table.height
        }
    }

    /**
     * Resets board size to its original dimension
     */
    resetBoardSize() {
        this.table.width = BoardConsts.SIZE;
        this.table.height = BoardConsts.SIZE;
    }
}

/**
 * Group of Selectors
 * @enum String
*/
const BoardSelectors = {
    BOARD: 'board'
}

/**
 * Group of consts
 * @enum
 */
const BoardConsts = {
    SIZE: 800,
    REDUCE_RATIO: 48
}