import React from "react";
import { Card, CardProps } from "./Card";

// WIP: Show card attributes in more detail like here: https://ygoprodeck.com/card/blue-eyes-white-dragon-7485
export const CardContainer : React.FC<CardProps> = ({card}) => {
    const isMonsterCard = card.type.includes("MONSTER");

    return <div className={'flex flex-row gap-4 justify-center'}>
        <Card card={card} />
        <div className={'flex flex-col '}>
          {<h1 className={'text-2xl font-black mb-4'}>{card.name}</h1>}
          <div>Type: {card.type}</div>
          <div>Subtype: {card.race}</div>
          {isMonsterCard && <div>Attribute: {card.attribute}</div>}
          {isMonsterCard && <div>Level: {card.level}</div>}
          {isMonsterCard && <div>ATK: {card.atk}</div>}
          {isMonsterCard && <div>DEF: {card.def}</div>}
          <div><br />{card.desc}</div>
        </div>
    </div>
}
