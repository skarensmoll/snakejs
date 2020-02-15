/**
 * Snake Class
 */
class Snake extends BaseComponent {
    /**
     * Creates instance of snake class
     */
    constructor() {
        super();

        this.events = {
            'keydown': this.onKeyDown.bind(this)
        };
    }

    /**
     * Handles onKeyDown event
     * @param {Event} e
     */
    onKeyDown(e) {
        switch (e.which) {
            case Keys.UP:
                this.moveUp_();
                break;
            case Keys.DOWN:
                this.moveDown_();
                break;
            case Keys.LEFT:
                this.moveLeft_();
                break;
            case Keys.RIGHT:
                this.moveRight_();
                break;
        }
    }

    /**
     * @private
     */
    moveUp_() {
        let newHead = { ...this.head };
        newHead.y -= 16;
        this.onMoving(newHead, Keys.UP);
    }

    /**
     * @private
     */
    moveDown_() {
        let newHead = { ...this.head };
        newHead.y += 16;
        this.onMoving(newHead, Keys.DOWN);
    }

    /**
     * @private
     */
    moveLeft_() {
        let newHead = { ...this.head };
        newHead.x -= 16;
        this.onMoving(newHead, Keys.LEFT);
    }

    /**
     * @private
     */
    moveRight_() {
        let newHead = { ...this.head };
        newHead.x += 16;
        this.onMoving(newHead, Keys.RIGHT);
    }

    /**
     * Handles event moving of snake
     * @param {Object} newHead
     * @param {number} direction
     */
    onMoving(newHead, direction) {
        if (this.isValidMove_(newHead)) {
            this.direction = direction;
            this.triggerEvent(SnakeEvents.MOVING, newHead);
        }
    }

    /**
     * Execute update on snake to emulate movement.
     * @param {Object} newHead
     */
    move(newHead) {
        if (this.isSnakeEatingItself(newHead)) {
            this.triggerEvent(SnakeEvents.EATEN);
            return;
        }

        delete this.queue[0].color;
        this.removeTile_();
        this.addHead_(newHead);
        this.head = newHead;
        this.triggerEvent(SnakeEvents.POSITION_CHANGED, this.queue);
        this.keepMovingTowardsDirection_();
    }

    /**
     * Validates if move is related to going backwards
     * @private
     * @param {Object} newHead
     * @return {Boolean}
     */
    isValidMove_(newHead) {
        const neck = this.queue[1];
        const isNewMoveNeck =
            (newHead.x === neck.x
                && newHead.y === neck.y);

        return !isNewMoveNeck;
    }

    /**
     * Keeps snake moving
     * @private
     */
    keepMovingTowardsDirection_() {
        clearTimeout(this.directionInterval);
        this.directionInterval = setTimeout(() => {
            var event = { which: this.direction }
            this.onKeyDown(event)
        }, SnakeConsts.PEACE);
    }

    /**
     * Reverses snake's direction
     * @private
     */
    reverseDirection_() {
        switch (this.direction) {
            case Keys.UP:
                this.direction = Keys.DOWN;
                break;
            case Keys.DOWN:
                this.direction = Keys.UP;
                break;
            case Keys.LEFT:
                this.direction = Keys.RIGHT;
                break;
            case Keys.RIGHT:
                this.direction = Keys.LEFT;
                break;
        }
        this.keepMovingTowardsDirection_();
    }

    /**
     * @private
     * @param {Object} element
     */
    addHead_(element) {
        this.queue.unshift(element);
    }

    /**
     * @private
     * @param {Object} element
     */
    removeHead_() {
        return this.queue.shift();
    }

    /**
     * @private
     * @param {Object} element
     */
    removeTile_() {
        return this.queue.pop();
    }

    /**
     * @private
     * @param {Object} element
     */
    addTile_(element) {
        return this.queue.push(element);
    }

    /**
     * Validaes whether snakes movement leads to
     * eating itself
     * @param {Object} newHead
     */
    isSnakeEatingItself(newHead) {
        let eatingItself = false;
        this.queue.forEach((element) => {
            if (element.x === newHead.x
                && element.y === newHead.y) {
                eatingItself = true;
                return;
            }
        });
        return eatingItself;
    }

    /**
     * Increases snake's volume
     */
    growTail() {
        let newTail;
        const tail = this.queue[this.queue.length - 1];
        const preTail = this.queue[this.queue.length - 2];

        if (tail.x === preTail.x) {
            const newY = preTail.y > tail.y ? +16 : -16
            newTail = { x: tail.x, y: tail.y + newY };
        } else {
            const newX = preTail.x > tail.x ? +16 : -16
            newTail = { x: tail.x + newX, y: tail.y };
        }
        return this.queue.push(newTail)
    }

    /**
     * Reverses snake's position
     * @param {number} decreaseX
     * @param {number} decreaseY
     */
    reverse(decreaseX, decreaseY) {
        delete this.queue[0].color;
        this.queue = this.queue.reverse();

        if (decreaseX !== 0 || decreaseY !== 0) {
            this.queue.forEach((element) => {
                element.x += decreaseX;
                element.y += decreaseY;
            });
        }

        this.queue[0].color = Colors.HEAD_COLOR;
        this.head = { ...this.queue[0] };
        setTimeout(() => {
            this.reverseDirection_();
        }, 0)

        return {
            properties: OBJECTS_TYPE.snake,
            elements: this.queue
        };
    }

    /**
     * Crates snakes from scratch
     */
    create() {
        this.queue = [
            { x: 64, y: 0, color: Colors.HEAD_COLOR },
            { x: 48, y: 0 },
            { x: 32, y: 0 },
            { x: 16, y: 0 },
            { x: 0, y: 0 },
        ];
        this.head = { ...this.queue[0] };

        const snakeObj = {
            properties: OBJECTS_TYPE.snake,
            elements: this.queue
        };
        return snakeObj;
    }
}


/**
 * Keycode values
 * @enum
 */
const Keys = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}

/**
 * Group of colors
 * @enum
 */
const Colors = {
    HEAD_COLOR: 'black'
}

/**
 * Group of consts
 * @enum
 */
const SnakeConsts = {
    PEACE: 80,
}

/**
 * Group of events
 * @enum
 */
const SnakeEvents = {
    POSITION_CHANGED: 'snake_changed',
    EATEN: 'snake_eaten',
    MOVING: 'snake_moving'
}