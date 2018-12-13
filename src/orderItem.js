import menu from "./config/menu.json";

class orderItem {

    constructor(type, size, extras) {
        this.type = type;
        this.size = size;
        this.extras = extras;
        this.price = null;

        // Function bindings
        this.calculatePrice = this.calculatePrice.bind(this);
        this.getPrice = this.getPrice.bind(this);
        this.setPrice = this.setPrice.bind(this);
    }

    /**
     * Calculates the price of the orderItem, including any extra cost due to size or extras
     */
    calculatePrice() {
        const base = menu.items[this.type].base_price;
        const sizePrice = menu.sizes[this.size];

        let extrasPrice = 0;
        this.extras.forEach((extra) => {
            if (Object.keys(menu.extras).includes(extra)) {
                extrasPrice += menu.extras[extra];
            }
        });

        this.price = base + sizePrice + extrasPrice;
    }

    /**
     * Returns the price of the order item
     */
    getPrice() {
        // If the price hasn't been set, then calculate it
        if (this.price === null) {
            this.calculatePrice();
        }
        return this.price;
    }

    /**
     * Set the price of the item - to be used when applying vouchers
     * @param {number} newPrice 
     */
    setPrice(newPrice) {
        this.price = newPrice;
    }

}

module.exports = orderItem;