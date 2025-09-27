"use client"

import { useEffect, useState } from "react";
import { GenerateColourCardContent, GenerateGridCards, GridCard } from "../../../utils/gridGeneration";
import MemoryContainer from "./memoryContainer";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";

export default function MemoryPage() {
    const [cards, setCards] = useState<GridCard[]>([]);
    const [points, setPoints] = useState(0);
    const [endOfGameModalOpen, setEndOfGameModalOpen] = useState(false);
    const gridSize = 2;

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
            <ResetButtton onClick={resetGame} />
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

type ResetButtonProps = {
    onClick: () => void;
};

const ResetButtton = ({ onClick }: ResetButtonProps) => {
    return (
        <button className="flex bg-[#E0E2DB] rounded-xl w-[150px] h-[75px] cursor-pointer" onClick={onClick}>
            <span className="text-black font-bold mx-auto my-auto material-symbols-outlined">
                restart_alt
            </span>

        </button>
    );
};

type PointsIndicatorProps = {
    points: number;
};

const PointsIndicator = ({ points }: PointsIndicatorProps) => {

    return <div className="flex bg-[#E0E2DB] rounded-xl w-[200px] h-[50px]  " >
        <p className="text-center text-black font-xl font-bold mx-auto my-auto">
            {points}
        </p>
    </div>
}

type GameOverDrawerProps = {
    points: number;
    onReset: () => void;
    onCloseModal: () => void;
    isOpen: boolean;
}

const GameOverDrawer = ({ points, onReset, isOpen, onCloseModal }: GameOverDrawerProps) => {
    const onResetClicked = () => {
        onReset();
        onCloseModal();
    }

    return <Dialog open={isOpen}>
        <DialogContent className="">
            <DialogHeader className="text-center justify-items-center grid gap-4">
                <DialogTitle>You got {points} points!!</DialogTitle>
                <DialogDescription>
                    <span>
                        Do you want to play again?
                    </span>
                </DialogDescription>
                <ResetButtton onClick={onResetClicked} />
            </DialogHeader>
            <DrawerFooter >
                <DrawerClose className="bg-gray-200 rounded-md p-2 cursor-pointer" onClick={onCloseModal} >
                    Close
                </DrawerClose>
            </DrawerFooter>
        </DialogContent>
    </Dialog>
}
