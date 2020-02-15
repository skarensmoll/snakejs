/**
 * GameTools class
 */
class GameTools {
    /**
     * Generates random color
     * @return {string}
     */
    static getRandomColor() {
        return `#${Math.floor(Math.random()*16777215).toString(16)}`;
    }

    /**
     * Generates random position based on a range of numbers
     * @param {number} size
     * @param {number} to
     */
    static generateRandomPosition (size, to) {
        return Math.ceil(Math.random() * ((size-to)/to) ) * to;
    }
}