/**
 * Class that behaves as a basic building block for components
 */
class BaseComponent {

    constructor() {
        document.addEventListener('DOMContentLoaded', (event) => {
            this.bindEvents();
        });
    }

    /**
     * Bind all the events set in the events property.
    */
    bindEvents() {
        let events = this.events;
        for (const key in events) {
            if (events.hasOwnProperty(key)) {
                const element = events[key];
                window.addEventListener(key, element);
            }
        }
    }

    /**
     * Triggers a custom event.
     * @param  {!string} eventName Custom event to dispatch.
     * @param  {?Object} data Additional data to pass in the event object.
   */
    triggerEvent(eventName, data) {
        let event = new CustomEvent(eventName, {
            detail: data,
        });

        window.dispatchEvent(event);
    }
}


