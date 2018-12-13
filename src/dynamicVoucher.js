import percentOff from "./vouchers/percentOff";
import twoForOne from "./vouchers/twoForOne";

const vouchers = {
    percentOff,
    twoForOne
};

class dynamicVoucher {
    constructor(className, params) {
        if (Object.keys(vouchers).includes(className)) {
            // Use the spread syntax to expand the params list
            return new vouchers[className](...params);
        }
        return null;
    }
}

module.exports = dynamicVoucher;
