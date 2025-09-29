'use client'
import React from "react";
import { JSX } from "react";
import { CardIds } from "./memoryContainer";

type Props = {
    ids: CardIds
    isFlipped: boolean;
    onClick: (cardIds: CardIds) => void
    content: JSX.Element;
    className?: string,
};

export default function MemoryCard({ ids, isFlipped, onClick, content, className }: Props) {
    const handleClick = () => {
        onClick(ids);
    }

    return <div
        onClick={handleClick}
        className={`${isFlipped ? "rotate-y-180" : ""} cursor-pointer absoulute w-[150px] h-[150px] duration-700 transform-style-preserve-3d hover:shadow-xl hover:scale-105 ${className}`}
    >
        <div className="absolute inset-0 bg-[#BEB7A4] backface-hidden" />

        <div className="absolute inset-0 flex items-center justify-center backface-hidden text-white rotate-y-180">
            {content}
        </div>
    </div>

}