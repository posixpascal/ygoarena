import {Card as PrismaCard} from "@prisma/client";
import React from "react";
import {CardType} from "@/utils/enums";

interface DeckCardsSummaryProps {
    cards: PrismaCard[]
}

export const DecksCardSummary: React.FC<DeckCardsSummaryProps> = ({cards}) => {
    const monsterCount = cards.filter(card => {
        return card.type !== CardType.SPELL_CARD && card.type !== CardType.TRAP_CARD;
    }).length;

    const trapCount = cards.filter(card => {
        return card.type === CardType.TRAP_CARD;
    }).length;

    const spellCount = cards.filter(card => {
        return card.type === CardType.SPELL_CARD;
    }).length;

    return <div className={"flex gap-4 text-sm text-sky-300 mb-3"}>
        <div className={"flex gap-1"}>
            <span>{monsterCount}</span> Monsters
        </div>
        <div>
            &bull;
        </div>
        <div className={"flex gap-1"}>
            <span>{spellCount}</span> Spells
        </div>
        <div>
            &bull;
        </div>
        <div className={"flex gap-1"}>
            <span>{trapCount}</span> Traps
        </div>
    </div>;
}