'use client';

import { useEffect, useState } from "react";
import { GridCard } from "../../../utils/gridGeneration";
import MemoryCard from "./memoryCard";

type Props = {
    gridSize?: number;
    cards: GridCard[];
    onMatch: (didMatch: boolean) => void;
    onGameEnd: () => void;
};

export type CardIds = {
    id: number;
    pairId: number;
}

export default function MemoryContainer({ gridSize = 4, cards, onMatch, onGameEnd }: Props) {
    const [selectedCards, setSelectedCards] = useState<CardIds[]>([]);
    const [removedCards, setRemovedCards] = useState<number[]>([]);

    const gridColsStyle = { gridTemplateColumns: `repeat(${gridSize}, 1fr` };
    const canInteractStyle = selectedCards.length < 2 ? "" : "pointer-events-none";

    const onCardClick = (cardIds: CardIds) => {
        if (selectedCards.some(ids => ids.id === cardIds.id)) return;
        setSelectedCards([...selectedCards, cardIds]);
    }

    useEffect(() => {
        const falsyMatch = async (time: number) => {
            const _ = await new Promise<string>((resolve) =>
                setTimeout(() => resolve(""), time)
            );
            setSelectedCards([]);
            onMatch(false);
        };

        const correctMatch = async (time: number) => {
            const _ = await new Promise<string>((resolve) =>
                setTimeout(() => resolve(""), time)
            );
            setRemovedCards([...removedCards, ...selectedCards.map(c => c.id)]);
            setSelectedCards([]);
            onMatch(true);
        };

        if (selectedCards?.length === 2) {
            if (selectedCards[0].pairId === selectedCards[1].pairId) {

                correctMatch(2000);
            }
            else {
                falsyMatch(1000);
            }
        }

    }, [selectedCards]);

    useEffect(() => {
        if (removedCards.length === cards.length) {
            onGameEnd();
        }
    }, [removedCards]);

    useEffect(() => {
        // reset board if new cards are generated
        setSelectedCards([]);
        setRemovedCards([]);
    }, [cards]);

    return <div style={gridColsStyle} className="relative grid max-w-[80%] bg-gray-200 rounded-lg gap-4 p-4">
        {cards.map((card, i) => (
            <MemoryCard
                key={i}
                className={removedCards.includes(i) ? "opacity-0 pointer-events-none" : "" + canInteractStyle}
                ids={{ id: i, pairId: card.id }}
                content={card.content}
                onClick={onCardClick}
                isFlipped={selectedCards.map(ids => ids.id).includes(i)} />
        ))}
    </div>;
}