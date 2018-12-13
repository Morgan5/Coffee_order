import { expect } from "chai";
import orderItem from "../src/orderItem.js";

describe("orderItem", function () {

  const testRegularLatte = new orderItem("latte", "regular", []);

  it("should calculate the price of a regular latte", function () {

    expect(testRegularLatte.getPrice()).to.be.equal(3.5);

  });

  const testLargeLatteSoy = new orderItem("latte", "large", ["soy"]);

  it("should calculate the price of a large soy latte", function () {

    expect(testLargeLatteSoy.getPrice()).to.be.equal(4.5);

  });

  const testLargeLatteSoySprinkles = new orderItem("latte", "large", ["soy", "sprinkles"]);

  it("should ignore extras not on the menu", function () {

    // Compare price of two nearly identical coffees, 1 with an offmenu extra, 1 without
    expect(testLargeLatteSoySprinkles.getPrice()).to.be.equal(testLargeLatteSoy.getPrice());

  });
});