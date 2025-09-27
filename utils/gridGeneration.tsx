
import { JSX } from "react";

export type GridCard = {
    id: number;
    content: JSX.Element;
};


export function GenerateGridCards(gridSize: number, contentGenerator: () => JSX.Element): GridCard[] {
    const cards = [];
    const numberOfPairs = (gridSize * gridSize) / 2;
    for (let i = 0; i < numberOfPairs; i++) {
        const card = { id: i, content: contentGenerator() };
        cards.push(card);
        cards.push({ ...card })
    }
    return ShuffleArray(cards);

}

export function ValidateGridSize(size: number): boolean {
    return size >= 2 && size <= 8 && size % 2 === 0;
}

function ShuffleArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

export function GenerateColourCardContent(): JSX.Element {
    const rndColor = getRandomHexColor()

    return <div className="w-full h-full" style={{ backgroundColor: rndColor }}> </div>
}

function getRandomHexColor(): string {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, "0")}`; // ensures 6 digits
}


