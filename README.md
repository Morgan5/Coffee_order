# Coffee Order:

This is a solution to help customers order coffee at a coffee store

## Setup and running the tests

Dependencies:
* node v8.11.3
* npm v6.4.1

1. Run `npm install`
2. Run `npm test` to run the tests

## Usage

1. Import the `order` class from the `order.js` file
2. Create a new `order` via `const myNewOrder = new order();`
3. Add items to your order via the `add` function:
    * `add()` takes between 1 and 3 parameters - type of coffee, size of coffee and extras (like soy)
        1. type - string (required)
        2. size - string
        3. extras - Array of strings
    * Examples of valid input:
        * `order.add("espresso");`
        * `order.add("cappuccino", "large");`
        * `order.add("cappuccino", "regular", ["soy"]);`
    * Examples of invalid input:
        * `order.add(23);`
        * `order.add("cappuccino", true);`
    * Invalid input or ordering an item not on the menu will cause the add function to return `null`
4. Check the total of your order via the `total` function
    * `order.total();`
5. Check the gst of your order via the `gst` function
    * `order.gst();`

## Menu

| Coffee     | Sizes          | Price |
| ---------- | -------------- | ----- |
| Espresso   | regular        | $3.00 |
| Cappuccino | regular, large | $3.50 |
| Latte      | regular, large | $3.50 |
| Flat White | regular, large | $3.50 |

Optional extras:
* soy - 50c

gst: 10%

## Vouchers

1. You can apply a voucher to your order using the `addVoucher` function and passing the name of the voucher
    * Examples of valid input:
        * `order.addVoucher("10 percent off")`;
        * `order.addVoucher("2 for 1")`;
2. Note that only one voucher of each type may be applied to an order

## Voucher types

| Voucher name     | effect         |
| ---------------- | -------------- |
| 10 percent off   | 10% of the total price of your order |
| 2 for 1          | If you have ordered at least 2 coffees, the cheapest is free |
