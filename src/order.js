import menu from "./config/menu.json";
import vouchers from "./config/vouchers.json";
import orderItem from "./orderItem.js";
import dynamicVoucher from "./dynamicVoucher.js";

class order {

    constructor() {
        this.items = [];
        this.vouchers = [];

        // Function bindings
        this.add = this.add.bind(this);
        this.calculateTotal = this.calculateTotal.bind(this);
        this.clearOrder = this.clearOrder.bind(this);
        this.getItems = this.getItems.bind(this);
        this.gst = this.gst.bind(this);
        this.isOrderValid = this.isOrderValid.bind(this);
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
        // Check the validity of the order, make it if its valid
        if (this.isOrderValid(type, size, extras)) {
            this.items.push(new orderItem(type, size, extras));
        } else {
            return null;
        }
    }

    addVoucher(type) {
        // Three conditions
        // 1. type must be a string
        // 2. Voucher must be on the list of valid vouchers from vouchers.json
        // 3. Must not already be a voucher of that type applied
        if (typeof(type) === "string" &&
            Object.keys(vouchers).some((voucher) => (type === voucher)) &&
            !this.vouchers.some((voucher) => (type === voucher.getName()))) {
            const newVoucher = new dynamicVoucher(vouchers[type].class, vouchers[type].parameters);
            
            // Make sure the voucher was actually created, as the dynamicVoucher will return null
            // if an invalid class is passed
            if (newVoucher !== null) {
                this.vouchers.push(newVoucher);
            }
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
            totalPrice += item.getPrice();
        });

        return totalPrice;
    }

    /**
     * Completly wipes all items and vouchers from the order
     */
    clearOrder() {
        this.items = [];
        this.vouchers = [];
    }

    /**
     * Get the list of items in the order
     */
    getItems() {
        return this.items;
    }

    /**
     * Get the list of vouchers applied to the order
     */
    getVouchers() {
        return this.vouchers;
    }

    /**
     * Returns the total gst of the order
     */
    gst() {
        this.vouchers.forEach((voucher) => (
            this.items = voucher.apply(this.items)
        ));
        // Clear the vouchers list after they have been applied so we don't accidentally apply them twice
        this.vouchers = [];
        return "$" + (this.calculateTotal() * menu.gst).toFixed(2);
    }

    /**
     * Checks if all the order paramters are valid
     * @param {string} type 
     *      Type of the object being ordered
     * @param {string} size 
     *      Size of the object being ordered
     * @param {Array.<string>} extras
     *      Array of extra options to be applied to the order
     */
    isOrderValid(type, size, extras) {
        // Deal with invalid input types
        if (typeof(type) !== "string" || typeof(size) !== "string") {
            return false;
        }
        // Also deal with the trying to order an 'extra' that doesnt exist on the menu
        // We use a for loop here instead of the forEach Array method because we can 
        // directly return false from inside the for loop but cannot from inside the
        // forEach method due to scoping
        for (let i = 0; i < extras.length; i++) {
            if (typeof(extras[i]) !== "string" || !Object.keys(menu.extras).includes(extras[i])) {
                return false;
            }
        }
        // Check if the order is a valid type with a valid size
        if (!Object.keys(menu.items).includes(type.toLowerCase()) ||
            !menu.items[type.toLowerCase()].sizes.includes(size.toLowerCase())) {
                return false;
        }
        
        return true;
    }

    /**
     * Returns the total cost of the order in string form to two decimal places
     */
    total() {
        this.vouchers.forEach((voucher) => (
            this.items = voucher.apply(this.items)
        ));
        // Clear the vouchers list after they have been applied so we don't accidentally apply them twice
        this.vouchers = [];
        return "$" + this.calculateTotal().toFixed(2);
    }
}

module.exports = order;