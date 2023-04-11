import {trpc} from "@/utils/trpc";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {Input} from "@/components/Input";
import {useDebounce} from "@/hooks/useDebounce";
import {CardSet as PrismaCardSet} from "@prisma/client";
import {CardSet} from "@/components/CardSet";
import {Button} from "@/components/Button";
import {SetSelectionSummary} from "@/components/SetSelectionSummary";

interface SetSelectionProps {
    onSelection: (sets: string[]) => void
}
export const SetSelection : React.FC<SetSelectionProps> = ({ onSelection }) => {
    const loadMoreRef = useRef<HTMLDivElement | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    const [name, setName] = useState('');
    const nameQuery = useDebounce<string>(name, 300);
    const {data, fetchNextPage, isLoading, isError} = trpc.sets.list.useInfiniteQuery({
        name: nameQuery,
        limit: 20
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialCursor: 1
    });

    const addSet = (set: PrismaCardSet) => {
        setSelected(sets => [...sets, set.id]);
    }

    const removeSet = (set: PrismaCardSet) => {
        setSelected(sets => [...sets.filter(s => s !== set.id)]);
    }

    const setsDisplay = useMemo(() => {
        if (!data || !data?.pages) {
            return <div></div>
        }
        // concat pages
        const sets = nameQuery ? data!.pages![0].items : data!.pages!.reduce((acc: PrismaCardSet[], page) => {
            return [...acc, ...page.items]
        }, []);

        if (sets.length === 0) {
            return <div>Keine Sets gefunden</div>
        }

        return <div className={'grid grid-cols-5 gap-8'}>
            {sets.map((set: PrismaCardSet) => {
                return <div
                    className={selected.includes(set.id) ? "scale-105 transition-transform" : "transition-transform"}
                    key={set.id}>
                    <CardSet cardSet={set} key={set.id}>
                        <div className={'grid place-items-center h-full'}>
                            {!selected.includes(set.id) && <Button onClick={() => addSet(set)} title={'Add'}></Button>}
                            {selected.includes(set.id) &&
                                <Button onClick={() => removeSet(set)} title={'Remove'}></Button>}
                        </div>
                    </CardSet>
                </div>
            })}
        </div>
    }, [data, selected]);

    useEffect(() => {
        if (!loadMoreRef.current) {
            return;
        }

        const observer = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                fetchNextPage();
            }
        }, {root: null, threshold: 0.1});

        observer.observe(loadMoreRef.current);
        return () => {
            observer.disconnect();
        }
    }, [fetchNextPage, loadMoreRef])

    return <div>
        <div className={'flex justify-between mb-10'}>
            <Input name={'name'} type={'name'} label={'Filter by Name or Code'} placeholder={'E.g. LOB'}
                   onInput={(ev) => setName(ev.target.value)}/>
            <div className={'max-w-2xl flex items-center gap-8 text-right'}>
                <SetSelectionSummary setIds={selected}/>
                <Button title={'Create Link'} onClick={() => onSelection(selected)}>

                </Button>
            </div>
        </div>

        {setsDisplay}

        {/*Load more sets on scroll */}
        <div className={'h-[30px]'} ref={loadMoreRef}/>
    </div>
}