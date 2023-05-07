import Head from 'next/head'
import {Container} from "@/components/Container";
import React, {useState} from "react";
import {SetSelection} from "@/components/SetSelection";
import {useRouter} from "next/router";
import {Headline} from "@/components/Headline";
import {SetSelectionSummary} from "@/components/SetSelectionSummary";
import {Input} from "@/components/Input";
import {useDebounce} from "@/hooks/useDebounce";
import {Button} from "@/components/Button";


export default function Index() {
    const router = useRouter();
    const [selected, setSelected] = useState<string[]>([])
    const [query, setQuery] = useState<string | undefined>(undefined);

    // Wait for 300ms before changing the variable
    const debouncedQuery = useDebounce(query, 200);

    const handleSelection = async () => {
        const queryString = new URLSearchParams();
        queryString.append('sets', selected.join('|'));
        await router.push('/arena/info?' + queryString.toString())
    }


    return (
        <>
            <Head>
                <title></title>
            </Head>
            <main>
                <Container>
                    <div className={'grid grid-cols-5  mb-10 items-center'}>
                        <div className={'col-span-3'}><Headline>Arena Mode</Headline>
                            <p className={'text-lg text-sky-800'}>
                                In Battle City Arena each player draws 4 random cards and may add one of those card to their
                                deck.<br/>
                                Then they can draw 4 more random cards until they complete their deck.
                                You can add sets to the arena card pool by clicking on them. Once ready, press continue.
                            </p>
                        </div>
                        <aside className={'col-span-2 flex justify-end'}>
                            <Button size={'xl'} disabled={selected.length === 0} onClick={handleSelection} title={
                                selected.length ? `Continue with ${selected.length} Sets` : "Select Sets to Continue"
                            }></Button>
                        </aside>
                    </div>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-5'}>
                            <SetSelection query={query} selected={selected} setSelected={setSelected}/>
                        </div>
                        <div className={'col-span-2'}>
                            <div>
                                <div className={'col-span-7'}>
                                    <Input
                                        onChange={(ev) => setQuery(ev.target.value)}
                                        label={'Search Set'}
                                        placeholder="Search by name (i.e. Legend of Blue Eyes) or code (i.e. LOB)"
                                        name={'set'}
                                        type={'text'}/>
                                </div>
                            </div>
                            <SetSelectionSummary setSelected={setSelected} readonly={false} setIds={selected}/>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}
