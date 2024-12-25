import { ItemBehavior } from "./item-behavior";

export class AgedBrieItem extends ItemBehavior {
    updateQualityBehavior(): void {
        this.item.quality += this.item.sellIn < 0 ? 2 : 1;
    }
}