import { Chance } from "chance";


export class ChanceService {
    private chance: Chance.Chance;

    constructor() {
        this.chance = new Chance();
    }

    generateFullName(): {name: string, lastname: string} {
        return {name: this.chance.name(), lastname: this.chance.name()}
    }

    generateSentence(): string {
        return this.chance.sentence({words: 2});
    }
}