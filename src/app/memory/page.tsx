"use client"

import { useEffect, useState } from "react";
import { GenerateColourCardContent, GenerateGridCards, GridCard } from "../../../utils/gridGeneration";
import MemoryContainer from "./components/memoryContainer";
import GameOverDrawer from "./components/gameOverDrawer";
import ResetButton from "./components/resetButton";
import PointsIndicator from "./components/pointsIndicator";

export default function MemoryPage() {
    const [cards, setCards] = useState<GridCard[]>([]);
    const [points, setPoints] = useState(0);
    const [endOfGameModalOpen, setEndOfGameModalOpen] = useState(false);
    const gridSize = 4;

    useEffect(() => {
        const generatedCards = GenerateGridCards(gridSize, GenerateColourCardContent);
        setCards(generatedCards);
    }, []);

    const onMatch = (didMatch: boolean) => {
        if (didMatch) {
            setPoints(points + 1);
        } else {
            setPoints(points - 1);
        }
    }

    const onGameEnd = () => {
        setEndOfGameModalOpen(true);
    }

    const resetGame = () => {
        const generatedCards = GenerateGridCards(gridSize, GenerateColourCardContent);
        setCards(generatedCards);
        setPoints(0);
    }

    return (
        <div className="relative font-sans items-center justify-items-center gap-8 grid p-8">
            <h1 className="text-[42px]">Kul me memory!</h1>
            <ResetButton onClick={resetGame} />
            <PointsIndicator points={points} />
            <GameOverDrawer
                points={points}
                onReset={resetGame}
                isOpen={endOfGameModalOpen}
                onCloseModal={() => setEndOfGameModalOpen(false)} />
            {cards.length !== 0 && <MemoryContainer gridSize={gridSize} cards={cards} onMatch={onMatch} onGameEnd={onGameEnd} />}
        </div>
    );
}


