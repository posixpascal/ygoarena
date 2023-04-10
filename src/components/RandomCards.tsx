import {trpc} from "@/utils/trpc";
import {Card} from "@/components/Card";

export const RandomCards = () => {
    let cards = trpc.cards.random.useQuery({ amount: 4 });
    
    const handleClick = async () => {
        const setIDs: number[] = []; // TODO: Fetch sets and add IDs to setIDs...
        cards = trpc.cards.random.useQuery({ amount: 4, setIDs: setIDs }); // TODO: Fix "hook not inside body of function component" error
    };

    if (cards.isLoading){
        return <div>
            Loading...
        </div>
    }

    if (cards.data === null){
        return <div>Keine Karten gefunden.</div>
    }

    return (
        <div>
            <div className="flex flex-row flex-wrap gap-4 justify-center">
                {cards.data!.map(card => (
                    <Card key={card.id} card={card} />
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-center">
                    Draw
                </button>
            </div>
        </div>
    );
}
