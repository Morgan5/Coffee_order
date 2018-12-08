import menu from "./config/menu.json";
import orderItem from "./orderItem.js";

class order {

    constructor() {
        this.items = [];

        // Function bindings
        this.add = this.add.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.clearOrder = this.clearOrder.bind(this);
        this.getItems = this.getItems.bind(this);
        this.gst = this.gst.bind(this);
        this.total = this.total.bind(this);
    }

    /**
     * Adds an item to the list of items in the order
     * Defaults to adding a 'type' of size regular with no extras
     * @param {string} type 
     *      Type of the object being ordered
     * @param {string} size 
     *      Size of the object being ordered
     * @param {Array.<string>} extras
     *      Array of extra options to be applied to the order
     */
    add(type, size = "regular", extras = []) {
        let valid = true;
        // Deal with invalid input types
        if (typeof(type) !== "string" || typeof(size) !== "string") {
            valid = false;
        }
        // Also deal with the trying to order an 'extra' that doesnt exist on the menu
        extras.forEach((extra) => {
            if (typeof(extra) !== "string" || !Object.keys(menu.extras).includes(extra)) {
                valid = false;
            }
        });
        if (!valid) {
            return null;
        }

        // Passed invalid input type check - now we check if they have ordered
        // a valid menu item and if the size they have ordered exists
        if (Object.keys(menu.items).includes(type.toLowerCase()) &&
            menu.items[type.toLowerCase()].sizes.includes(size.toLowerCase())) {
            this.items.push(new orderItem(type, size, extras));
        } else {
            return null;
        }
    }

    /**
     * Calculates the total cost of the order
     */
    calculateTotal() {
        let totalPrice = 0;
        this.items.forEach((item) => {
            totalPrice += item.calculatePrice();
        });

        return totalPrice;
    }

    /**
     * Completly wipes all items from the order
     */
    clearOrder() {
        this.items = [];
    }

    /**
     * Get the list of items in the order
     */
    getItems() {
        return this.items;
    }

    /**
     * Returns the total gst of the order
     */
    gst() {
        return "$" + (this.calculateTotal() * menu.gst).toFixed(2);
    }

    /**
     * Returns the total cost of the order in string form to two decimal places
     */
    total() {
        return "$" + this.calculateTotal().toFixed(2);
    }
}

module.exports = order;