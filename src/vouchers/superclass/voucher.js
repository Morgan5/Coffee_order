class voucher {

    constructor(name) {
        this.name = name;
        this.applied = false;

        // Function bindings
        this.getName = this.getName.bind(this);
        this.apply = this.apply.bind(this);
    }

    /**
     * Returns the name of the voucher
     */
    getName() {
        return this.name;
    }

    /**
     * Apply function for the superclass that just returns the items
     * Meant to be overridden by child class
     * @param {Array.<orderItem>} items 
     *      A list of all the items in the order
     */
    apply(items) {
        return items;
    }
    
}

module.exports = voucher;