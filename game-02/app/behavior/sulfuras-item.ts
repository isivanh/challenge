import { Item } from "@models/item";
import { ItemBehavior } from "./item-behavior";
import { ITEM_TYPES } from "../constants/item-types";

export class SulfurasItem extends ItemBehavior {
    constructor() {
        const item = new Item(ITEM_TYPES.SULFURAS, 0, 80);
        super(item);
    }
    constrain(): void {
    }
    updateItem(): void {
    }
}