import {trpc} from "@/utils/trpc";
import React from "react";
import {Card} from "@/components/Card";
import {CardSet} from "@/components/CardSet";

export const RandomSet = () => {
    const set = trpc.sets.random.useQuery();

    if (set.isLoading){
        return <div>
            Loading...
        </div>
    }

    if (set.data === null){
        return <div>Kein Set gefunden.</div>
    }

    return <CardSet cardSet={set.data!} />
}