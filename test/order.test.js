import { expect } from "chai";
import order from "../src/order.js";

describe("order - functionality", function () {

  const testOrder = new order();

  it("should order a  normal coffee", function () {

    testOrder.add("espresso");

    expect(testOrder.getItems().length).to.be.equal(1);

  });

  it("should clear all items from the order", function () {

    testOrder.clearOrder();

    expect(testOrder.getItems().length).to.be.equal(0);

  });

  it("shouldn't order off menu", function () {

    testOrder.add("puppies");

    expect(testOrder.getItems().length).to.be.equal(0);

  });

  it("should hold multiple items", function () {

    testOrder.add("espresso");
    testOrder.add("cappuccino");
    testOrder.add("latte");
    testOrder.add("flat white");

    expect(testOrder.getItems().length).to.be.equal(4);

    testOrder.clearOrder();

  });

  it("should order a large cappuccino", function () {

    testOrder.add("cappuccino", "large");

    expect(testOrder.getItems().length).to.be.equal(1);
    const item = testOrder.getItems()[0]
    expect(item.type).to.be.equal("cappuccino");
    expect(item.size).to.be.equal("large");

    testOrder.clearOrder();

  });

  it("shouldn't order a large espresso", function () {

    testOrder.add("espresso", "large");

    expect(testOrder.getItems().length).to.be.equal(0);

  });

  it("should calculate the price of a single coffee", function () {

    testOrder.add("cappuccino");

    expect(testOrder.total()).to.be.equal("$3.50");

    testOrder.clearOrder();

  });

  it("should calculate the price of a single coffee, taking size into account", function () {

    testOrder.add("cappuccino", "large");

    expect(testOrder.total()).to.be.equal("$4.00");

    testOrder.clearOrder();

  });

  it("should calculate the price of a single coffee, taking extras into account", function () {

    testOrder.add("cappuccino", "regular", ["soy"]);

    expect(testOrder.total()).to.be.equal("$4.00");

    testOrder.clearOrder();

  });

  it("should calculate the total price of a large, mixed order", function () {

    testOrder.add("cappuccino", "regular", ["soy"]);
    testOrder.add("cappuccino", "large");
    testOrder.add("latte", "regular", ["soy"]);
    testOrder.add("espresso", "regular", ["soy"]);
    testOrder.add("flat white", "large");

    expect(testOrder.total()).to.be.equal("$19.50");

    testOrder.clearOrder();

  });

  it("should calculate the gst of a large, mixed order", function () {

    testOrder.add("cappuccino", "regular", ["soy"]);
    testOrder.add("cappuccino", "large");
    testOrder.add("latte", "regular", ["soy"]);
    testOrder.add("espresso", "regular", ["soy"]);
    testOrder.add("flat white", "large");

    expect(testOrder.gst()).to.be.equal("$1.95");

    testOrder.clearOrder();

  });
});

describe("order - invalid inputs", function () {

  const testOrder = new order();

  it("should handle an invalid coffee", function () {

    const result = testOrder.add(1);

    expect(testOrder.getItems().length).to.be.equal(0);
    expect(result).to.be.equal(null);

  });

  it("should handle ordering a coffee with an invalid extra", function () {

    const result = testOrder.add("latte", "regular", ["sprinkles"]);

    expect(testOrder.getItems().length).to.be.equal(0);
    expect(result).to.be.equal(null);

  });

  it("should handle ordering a coffee with an invalid size", function () {

    const result = testOrder.add("latte", "small");

    expect(testOrder.getItems().length).to.be.equal(0);
    expect(result).to.be.equal(null);

  });
});