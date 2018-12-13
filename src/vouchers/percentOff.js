import voucher from "./superclass/voucher.js";

class percentOff extends voucher {

    constructor(name, percent) {
        super(name);
        this.percent = percent;        
    }

    /**
     * Sets the price of the items according to the voucher
     * @param {Array.<orderItem>} items 
     *      A list of all the items in the order
     */
    apply(items) {
        items.map((item) => (
            item.setPrice(item.getPrice() * (1 - (this.percent/Math.pow(10, 2))))
        ));
        return items;
    }
}

module.exports = percentOff;
