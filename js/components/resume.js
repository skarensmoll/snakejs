/**
 * Resume class
 */
class Resume extends BaseComponent {
    /**
     * Creates instance of Resume component
     */
    constructor(){
        super();

        this.storage = new Storage();

        this.resumeScoreElement = document.querySelector(SelectorsResume.SCORE);
        this.modalElement = document.querySelector(SelectorsResume.MODAL);
        this.playAgainBtn =
            document.querySelector(SelectorsResume.PLAY_AGAIN_BTN);

        this.playAgainBtn.onclick = ()=> {
            this.hide();
            this.triggerEvent(ResumeEvents.PLAY_AGAIN);
        }
    }

    /**
     * Displays resume modal
     * @param {number} Score
     */
    show({ score }){
        if(this.isScoreGreaterThanPrevious(score)){
            console.log('scoregreater')
            const newColor = GameTools.getRandomColor();
            this.resumeScoreElement.style.color = newColor;
        }

        this.modalElement.classList.add(ResumeClasses.SHOW_MODAL)
        this.resumeScoreElement.innerHTML = score;
        this.storage.setValue(ResumeConsts.SCORE_KEY, score);
    }

    /**
     * Hides resume modal
     */
    hide(){
        this.modalElement.classList.remove(ResumeClasses.SHOW_MODAL)
    }

    /**
     * Validates whether current
     * score is greater than previous one
     * @param {number} currentScore
     * @return {Boolean}
     */
    isScoreGreaterThanPrevious(currentScore) {
        const value = this.storage.getValue(ResumeConsts.SCORE_KEY)

        return currentScore > (!value ? 0 : value);
    }
}

/**
 * Group of selectors
 * @enum
 */
const SelectorsResume = {
    MODAL: '.modal',
    SCORE: '.resume-board__score',
    PLAY_AGAIN_BTN: '.resume-board__btn'
}

/**
 * Group of classes
 * @enum
 */
const ResumeClasses = {
    SHOW_MODAL: 'modal--show'
}

/**
 * Group of Events
 * @enum
 */
const ResumeEvents = {
    PLAY_AGAIN: 'playagain'
}

/**
 * Group of consts
 * @enum
 */
const ResumeConsts = {
    SCORE_KEY: 'score'
}