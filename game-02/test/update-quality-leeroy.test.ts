import 'module-alias/register';
import { strict as assert } from "assert";
import { expect } from 'chai';
import { Item } from '@models/item';
import { GildedRose } from '../app/gilded-rose';
import { ITEM_TYPES } from '../app/constants/item-types';

describe("Gilded Rose Leeroy", () => {
    let items: Array<Item>;
    let gildedRose: GildedRose;

    beforeEach(() => {
        items = [
            new Item(ITEM_TYPES.NORMAL, 10, 20),
            new Item(ITEM_TYPES.AGED_BRIE, 10, 20),
            new Item(ITEM_TYPES.SULFURAS, 10, 80),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 10, 20),
            new Item(ITEM_TYPES.NORMAL, 0, 20),
            new Item(ITEM_TYPES.NORMAL, 0, 0),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 10, 50),
            new Item(ITEM_TYPES.SULFURAS, 10, 50),
            new Item(ITEM_TYPES.AGED_BRIE, 0, 20),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 0, 20),
            new Item(ITEM_TYPES.BACKSTAGE_PASSES, 1, 20),
        ];
        gildedRose = new GildedRose(items);
        gildedRose.updateQualityLeeroy();
    });
    it("Update to normal", () => {
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
    it("Update to normal with sellIn <= 0", () => {
        expect(items[4].quality).to.equal(18);
        expect(items[4].sellIn).to.equal(-1);
    });
    it("Update to normal with quality = 0", () => {
        expect(items[5].quality).to.equal(0);
        expect(items[5].sellIn).to.equal(-1);
    });
    it("Update to backstage passes with quality = 50", () => {
        expect(items[6].quality).to.equal(50);
        expect(items[6].sellIn).to.equal(9);
    });
    it("Sulfuras quality unchage", () => {
        expect(items[7].quality).to.equal(50);
        expect(items[7].sellIn).to.equal(10);
    });
    it("Update to aged brie < 0", () => {
        expect(items[8].quality).to.equal(22);
        expect(items[8].sellIn).to.equal(-1);
    });
    it("Update to backstage passes sellin < 0", () => {
        expect(items[9].quality).to.equal(0);
        expect(items[9].sellIn).to.equal(-1);
    });
    it("Update to backstage passes sellin <= 5", () => {
        expect(items[10].quality).to.equal(23);
        expect(items[10].sellIn).to.equal(0);
    });
});