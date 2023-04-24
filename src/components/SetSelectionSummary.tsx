import {trpc} from "@/utils/trpc";
import {Button} from "@/components/Button";
import React, {useState} from "react";
import {useRouter} from "next/router";

interface SetSelectionSummaryProps {
    setIds: string[],
    readonly: boolean;
}

type CardSetCountOutputType = { cards: number }
type SetsState = { name: string; id: string; image: string; _count: CardSetCountOutputType; }[]

export const SetSelectionSummary: React.FC<SetSelectionSummaryProps> = ({readonly = false, setIds}) => {
    const router = useRouter();
    const [sets, setSets] = useState<SetsState>([]);
    const {data, isLoading} = trpc.sets.summary.useQuery({
        setIds,
    }, {
        onSuccess(data) {
            setSets(data.sets)
        }
    });

    const handleSelection = async () => {
        const queryString = new URLSearchParams();
        queryString.append('sets', setIds.join('|'));
        await router.push('/arena/info?' + queryString.toString())
    }


    return <div className={`${readonly ? '' : 'h-full'} bg-slate-700`}>
        {!readonly && <div className={'top-0 sticky bg-black/20 p-5 backdrop-blur-xl py-8 '}>
            <Button disabled={setIds.length === 0} onClick={handleSelection} title={
                isLoading ? "Loading..." : `Continue with ${setIds.length} Sets (${data?.totalCards} cards)`} className={'w-full'}></Button>
        </div>}
        <div>
            {sets.map(set => {
                return <div className={'flex items-center py-4 gap-4 px-5'} key={set.id}>
                    <img alt={set.name} width={'32px'} src={set.image}/>
                    <div className={'flex-col flex'}>
                        <h3 className={'text-lg font-bold'}>
                            {set.name}
                        </h3>
                        <span className={'text-slate-400'}>
                                {set._count.cards} Cards
                        </span>
                    </div>
                </div>
            })}
        </div>
    </div>
}