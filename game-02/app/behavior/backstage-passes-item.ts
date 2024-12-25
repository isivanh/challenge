import { ItemBehavior } from "./item-behavior";

export class BackstagePassesItem extends ItemBehavior {
    updateQualityBehavior(): void {
        if (this.item.sellIn <= 0) {
            this.item.quality = 0;
            return;
        }
        if (this.item.sellIn <= 5) {
            this.item.quality += 3;
            return;
        }
        if (this.item.sellIn <= 10) {
            this.item.quality += 2;
            return;
        }
        this.item.quality += 1;
    }
}