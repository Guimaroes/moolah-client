import { Type } from "./type";

export class Finance {
    id: number;
    name: string;
    value: number;
    type: Type;

    constructor(id: number, name: string, value: number, type: Type) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.type = type;
    }
}