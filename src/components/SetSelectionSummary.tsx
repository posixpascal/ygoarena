import {trpc} from "@/utils/trpc";

interface SetSelectionSummaryProps {
    setIds: string[]
}

export const SetSelectionSummary = ({setIds}) => {
    const {data, isLoading} = trpc.sets.summary.useQuery({
        setIds
    });

    if (isLoading) {
        return <div>
            Loading...
        </div>
    }

    return <div>
        <div>
            <strong>{data!.totalCards} Cards from {data!.names.length} Sets</strong>
        </div>
        <div className={'line-clamp-3 max-w-lg text-xs'}>
            {data!.names.join(', ')}
        </div>
    </div>
}