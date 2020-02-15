
/**
 * Food Class
 */
class Food extends BaseComponent {
    /**
     * Creates instance of Food Component
     */
    constructor() {
        super();
        this.events = {};
        this.food = { x: 0, y: 0, color: FoodConsts.COLOR }
    }

    /**
     * Creates food object
     * @param {Object} boardSize contains width and height of board
     */
    create({width, height}) {
        const xPosition = GameTools.generateRandomPosition(width, 16);
        const yPosition = GameTools.generateRandomPosition(height, 16);

        this.food = { x: xPosition, y: yPosition };

        return {
            properties: OBJECTS_TYPE.food,
            elements: [{ ...this.food }]
        };
    }
}

/**
 * Group of consts
 * @enum
 */
const FoodConsts = {
    COLOR: '#FF9800'
}