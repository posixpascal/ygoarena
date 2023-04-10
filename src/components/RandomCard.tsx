import {trpc} from "@/utils/trpc";
import React from "react";
import { CardContainer } from "./CardContainer";

export const RandomCard = () => {
    const card = trpc.cards.random.useQuery({ amount: 1 });

    if (card.isLoading){
        return <div>
            Loading...
        </div>
    }

    if (card.data === null){
        return <div>Keine Karten gefunden.</div>
    }

    return <CardContainer card={card.data![0]} />
}
