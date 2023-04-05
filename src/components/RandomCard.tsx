import {trpc} from "@/utils/trpc";
import React from "react";
import {Card} from "@/components/Card";

export const RandomCard = () => {
    const card = trpc.cards.random.useQuery();

    if (card.isLoading){
        return <div>
            Loading...
        </div>
    }

    if (card.data === null){
        return <div>Keine Karten gefunden.</div>
    }

    return <Card card={card.data!} />
}