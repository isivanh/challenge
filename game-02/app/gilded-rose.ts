import { ItemBehavior } from "./behavior/item-behavior";
import { AgedBrieItem } from "./behavior/aged-brie-item";
import { BackstagePassesItem } from "./behavior/backstage-passes-item";
import { ConjuredItem } from "./behavior/conjured-item";
import { NormalItem } from "./behavior/normal-item";
import { SulfurasItem } from "./behavior/sulfuras-item";
import { ITEM_TYPES } from "./constants/item-types";
import { Item } from "./models/item";

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }
    getBehavior(item: Item): ItemBehavior {
        switch (item.name) {
            case ITEM_TYPES.AGED_BRIE:
                return new AgedBrieItem(item);
            case ITEM_TYPES.BACKSTAGE_PASSES:
                return new BackstagePassesItem(item);
            case ITEM_TYPES.SULFURAS:
                return new SulfurasItem();
            case ITEM_TYPES.CONJURED:
                return new ConjuredItem(item);
            default:
                return new NormalItem(item);
        }
    }
    updateQuality() {
        for (const item in this.items) {
            this.getBehavior(this.items[item]).updateItem();
        }
        return this.items;
    }
    updateQualityLeeroy() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }
        return this.items;
    }
}
