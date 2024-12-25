import 'module-alias/register';
import { strict as assert } from "assert";
import { expect } from 'chai';
import { Item } from '@models/item';
import { NormalItem } from '../app/behavior/normal-item';
import { ITEM_TYPES } from '../app/constants/item-types';
import { AgedBrieItem } from '../app/behavior/aged-brie-item';
import { SulfurasItem } from '../app/behavior/sulfuras-item';
import { BackstagePassesItem } from '../app/behavior/backstage-passes-item';
import { ConjuredItem } from '../app/behavior/conjured-item';
import { GildedRose } from '../app/gilded-rose';

describe("Normal Item", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item('Normal Item', 10, 20);
        const normalItem = new NormalItem(item);
        normalItem.updateItem();
    });
    it("should decrease quality by 1", () => {
        expect(item.quality).to.equal(19);
        expect(item.sellIn).to.equal(9);
    });
});
describe("Normal Item S = 0 Q = 0", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item('Normal Item', 0, 0);
        const normalItem = new NormalItem(item);
        normalItem.updateItem();
    });
    it("quality = 0 ", () => {
        expect(item.quality).to.equal(0);
        expect(item.sellIn).to.equal(-1);
    });
});

describe("Aged Bried Item sellIn > 0", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.AGED_BRIE, 10, 20);
        const normalItem = new AgedBrieItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 1", () => {
        expect(item.quality).to.equal(21);
        expect(item.sellIn).to.equal(9);
    });
});
describe("Aged Bried Item sellIn = 0, Q = 0", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.AGED_BRIE, 0, 0);
        const normalItem = new AgedBrieItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 1", () => {
        expect(item.quality).to.equal(2);
        expect(item.sellIn).to.equal(-1);
    });
});
describe("Aged Bried Item sellIn <= 0", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.AGED_BRIE, 0, 20);
        const normalItem = new AgedBrieItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 1", () => {
        expect(item.quality).to.equal(22);
    });
    it("should decrease sellIn by 1", () => {
        expect(item.sellIn).to.equal(-1);
    });
});
describe("Aged Bried Item quality > 50", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.AGED_BRIE, 10, 50);
        const normalItem = new AgedBrieItem(item);
        normalItem.updateItem();
    });
    it("should not increase quality", () => {
        expect(item.quality).to.equal(50);
    });
});
describe("Sulfuras Item", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.SULFURAS, 10, 80);
        const normalItem = new SulfurasItem();
        normalItem.updateItem();
    });
    it("should not change quality", () => {
        expect(item.quality).to.equal(80);
    });
    it("should not change sellIn", () => {
        expect(item.sellIn).to.equal(10);
    });
});
describe("Backstage Passes Item sellIn > 10", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.BACKSTAGE_PASSES, 15, 20);
        const normalItem = new BackstagePassesItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 1", () => {
        expect(item.quality).to.equal(21);
        expect(item.sellIn).to.equal(14);
    });
});
describe("Backstage Passes Item sellIn <= 10", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.BACKSTAGE_PASSES, 10, 20);
        const normalItem = new BackstagePassesItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 2", () => {
        expect(item.quality).to.equal(22);
        expect(item.sellIn).to.equal(9);
    });
});
describe("Backstage Passes Item sellIn <= 5", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.BACKSTAGE_PASSES, 5, 20);
        const normalItem = new BackstagePassesItem(item);
        normalItem.updateItem();
    });
    it("should increase quality by 3", () => {
        expect(item.quality).to.equal(23);
        expect(item.sellIn).to.equal(4);
    });
});
describe("Backstage Passes Item sellIn <= 0", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.BACKSTAGE_PASSES, 0, 20);
        const normalItem = new BackstagePassesItem(item);
        normalItem.updateItem();
    });
    it("should decrease quality to 0", () => {
        expect(item.quality).to.equal(0);
        expect(item.sellIn).to.equal(-1);
    });
});
describe("Conjured Item", () => {
    let item: Item;

    beforeEach(() => {
        item = new Item(ITEM_TYPES.CONJURED, 10, 20);
        const normalItem = new ConjuredItem(item);
        normalItem.updateItem();
    });
    it("should decrease quality by 2", () => {
        expect(item.quality).to.equal(18);
        expect(item.sellIn).to.equal(9);
    });
});
describe("Gilded Rose", () => {
    let items: Array<Item>;
    let gildedRose: GildedRose;

    beforeEach(() => {
        items = [
            new Item(ITEM_TYPES.NORMAL, 10, 20),
            new Item(ITEM_TYPES.AGED_BRIE, 10, 20),
            new Item(ITEM_TYPES.SULFURAS, 10, 80),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 10, 20),
            new Item(ITEM_TYPES.CONJURED, 10, 20),
            new Item(ITEM_TYPES.NORMAL, 0, 20),
            new Item(ITEM_TYPES.NORMAL, 0, 0),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 10, 50),
            new Item(ITEM_TYPES.SULFURAS, 10, 80),
            new Item(ITEM_TYPES.AGED_BRIE, 0, 20),
        ];
        gildedRose = new GildedRose(items);
        gildedRose.updateQuality();
    });
    it("Update to nomal", () => {
        expect(items[0].quality).to.equal(19);
        expect(items[0].sellIn).to.equal(9);
    });
    it("Update to aged brie", () => {
        expect(items[1].quality).to.equal(21);
        expect(items[1].sellIn).to.equal(9);
    });
    it("Update to sulfuras", () => {
        expect(items[2].quality).to.equal(80);
        expect(items[2].sellIn).to.equal(10);
    });
    it("Update to backstage passes", () => {
        expect(items[3].quality).to.equal(22);
        expect(items[3].sellIn).to.equal(9);
    });
    it("Update to conjured", () => {
        expect(items[4].quality).to.equal(18);
        expect(items[4].sellIn).to.equal(9);
    });
    it("Update to normal with sellIn <= 0", () => {
        expect(items[5].quality).to.equal(18);
        expect(items[5].sellIn).to.equal(-1);
    });
    it("Update to normal with quality = 0", () => {
        expect(items[6].quality).to.equal(0);
        expect(items[6].sellIn).to.equal(-1);
    });
    it("Update to backstage passes with quality = 50", () => {
        expect(items[7].quality).to.equal(50);
        expect(items[7].sellIn).to.equal(9);
    });
    it("Sulfuras quality always 80", () => {
        expect(items[8].quality).to.equal(80);
        expect(items[8].sellIn).to.equal(10);
    });
    it("Update to aged brie < 0", () => {
        expect(items[9].quality).to.equal(22);
        expect(items[9].sellIn).to.equal(-1);
    });
});