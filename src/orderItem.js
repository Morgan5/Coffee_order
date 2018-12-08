import menu from "./config/menu.json";

class orderItem {

    constructor(type, size, extras) {
        this.type = type;
        this.size = size;
        this.extras = extras;

        // Function bindings
        this.calculatePrice = this.calculatePrice.bind(this);
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

        return base + sizePrice + extrasPrice;
    }

}

module.exports = orderItem;