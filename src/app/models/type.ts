import { Category } from "./category";

export class Type {
    id: number;
    name: string;
    category: Category;

    constructor(id: number, name: string, category: Category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}
