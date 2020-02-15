/**
 * Game Component
 */
class Game extends BaseComponent {
    /**
     * Creates a Game component
     */
    constructor() {
        super();

        this.snake = new Snake();
        this.food = new Food();
        this.board = new Board();
        this.resume = new Resume();
        this.foodBody = null;
        this.score = 0;

        this.scoreElement = document.querySelector(Selectors.SCORE);
        this.snakeBody = this.snake.create();

        this.events = {};
        this.events[SnakeEvents.POSITION_CHANGED] = this.onSnakePositionChanged_.bind(this);
        this.events[SnakeEvents.MOVING] = this.onSnakeMoving_.bind(this);
        this.events[SnakeEvents.EATEN] = this.gameLost_.bind(this);
        this.events[ResumeEvents.PLAY_AGAIN] = this.onPlayAgain_.bind(this);
    }

    /**
     * Handles event Play again
     * @private
     */
    onPlayAgain_(){
        this.board.resetBoardSize();
        this.start();
    }

    /**
     * Reduces board area
     * @param {Object} newHead
     */
    changeBoardArea_(newHead) {
        const boardSize = this.board.getSize();
        const greaterThanWidth = newHead.x >= boardSize.width;
        const greaterThanHeight = newHead.y >= boardSize.height;
        const decreaseX = greaterThanWidth ? -BoardConsts.REDUCE_RATIO : 0;
        const decreaseY = greaterThanHeight ? -BoardConsts.REDUCE_RATIO : 0;

        this.board.reduceBoardArea();
        this.snakeBody =
            this.snake.reverse(decreaseX, decreaseY);

        this.clean_();
    }

    /**
     * Repaints board whenever an object changes
     * @private
     */
    rePaintBoard_() {
        this.board.clearBoard();
        this.board.drawObject(this.snakeBody);
        this.board.drawObject(this.foodBody);
    }

    /**
     * Updates snake's position
     * @private
     * @param {Event} e 
     */
    onSnakePositionChanged_(e) {
        const snakeObject = {
            properties: OBJECTS_TYPE.snake,
            elements: e.detail
        };

        this.snakeBody = snakeObject;
        this.snakeEatingFood_();
        this.rePaintBoard_();
    }

    /**
     * Executes action of eating food
     * @private
     */
    snakeEatingFood_() {
        const head = this.snakeBody.elements[0];
        const foodElement = this.foodBody.elements[0];
        const foodEaten = head.x === foodElement.x &&
            head.y === foodElement.y;
        if (foodEaten) {
            this.score++;
            this.scoreElement.innerText = this.score;
            this.placeFood_();
            clearTimeout(this.randomFoodTimeOut);
            this.placeRandomFood_();
            this.snake.growTail();
        }
    }

    /**
     * Analyzes future position
     * and takes action accordingly
     * @param {Event} e
     */
    onSnakeMoving_(e) {
        const newHead = e.detail;
        if (!this.isSnakeOverpassing_(newHead)) {
            this.snake.move(newHead);
        } else {
            this.changeBoardArea_(newHead);
        }
        this.rePaintBoard_();
    }

    /**
     * Handles actions when game lost
     * @private
     */
    gameLost_() {
        const details = {
            score: this.score
        }

        this.resume.show(details);
    }

    /**
     * @param {Object} newHead head element with positions
     * @returns {Boolean} True if snake overpassing boundaries
     */
    isSnakeOverpassing_(newHead) {
        const boardSize = this.board.getSize();
        const greaterThanWidth = newHead.x >= boardSize.width;
        const greaterThanHeight = newHead.y >= boardSize.height;
        const lessThanWidth = newHead.x < 0;
        const lessThanHeight = newHead.y < 0;

        return greaterThanWidth || greaterThanHeight ||
        lessThanWidth || lessThanHeight;
    }

    /**
     * Validates whether chose position
     * is available to place food
     * @param {Object} foodObj
     * @return {Boolean} True if valid position
     */
    isFoodPositionValid_(foodObj) {
        let isValid = true;

        this.snakeBody.elements.forEach(element => {
            if (element.x === foodObj.x && element.y === foodObj.y) {
                isValid = false;
                return;
            }
        });
        return isValid;
    }

    /**
     * Places food on board
     * @private
     */
    placeFood_() {
        const boardSize = this.board.getSize();
        const newFood = this.food.create(boardSize);

        if (!this.isFoodPositionValid_(newFood)) {
            this.placeFood_();
        }

        this.foodBody = newFood;
    }

    /**
     * Handles random timeout to place food
     * @private
     */
    placeRandomFood_() {
        //Between 4 and 10 secs
        const randomTimeOut = Math.ceil(Math.random() * (10 - 3) + 3) * 1000;

        this.randomFoodTimeOut = setTimeout(() => {
            this.placeFood_();
            this.rePaintBoard_();
            this.placeRandomFood_();
        }, randomTimeOut);
    }

    /**
     * Cleans environment
     * @private
    */
    clean_(){
        clearTimeout(this.randomFoodTimeOut);
        this.placeFood_();
        this.placeRandomFood_();
        this.rePaintBoard_();
    }

    /**
     * Starts game
     */
    start() {
        this.score = 0;
        this.scoreElement.innerText = this.score;
        this.snakeBody = this.snake.create();
        this.clean_();
    }
}

/**
 * Game Events.
 * @enum {string}
 */
const GameEvents = {
    REPAINT: 'repaint',
    FOOD_CHANGED: 'food_changed',
}

/**
 * Game Selectors.
 * @enum
 */
const Selectors = {
    SCORE: '.game__score'
}