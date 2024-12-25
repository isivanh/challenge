import { Item } from "@models/item";

export abstract class ItemBehavior {
    constructor(protected item: Item) {
        // Validating the item class here because if I do it in the item class, the goblin will kill me.
        if (typeof item.quality !== 'number' || isNaN(item.quality)) {
            throw new Error('Quality must be a number');
        }
        if (typeof item.sellIn !== 'number' || isNaN(item.sellIn)) {
            throw new Error('SellIn must be a number');
        }
        this.constrain();
    }

    constrain(): void {
        this.item.quality = Math.max(0, this.item.quality);
        this.item.quality = Math.min(50, this.item.quality);
    }

    updateQualityBehavior(): void {
        this.item.quality -= this.item.sellIn < 0 ? 2 : 1;
    }

    updateQuality(): void {
        this.updateQualityBehavior();
        this.constrain();
    }

    updateSellIn(): void {
        this.item.sellIn -= 1;
    }

    updateItem(): void {
        this.updateSellIn();
        this.updateQuality();
    }
}