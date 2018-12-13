import voucher from "./superclass/voucher.js";

class twoForOne extends voucher {

    constructor(name) {
        super(name);
    }

    /**
     * Sets the price of the items according to the voucher
     * @param {Array.<orderItem>} items 
     *      A list of all the items in the order
     */
    apply(items) {
        if (items.length >= 2) {
            // Sort all the items by price
            items.sort((a, b) => (a.getPrice() - b.getPrice()));
            // Set the price of the cheapest to 0
            items[0].setPrice(0);
        }

        return items;
    }
}

module.exports = twoForOne;