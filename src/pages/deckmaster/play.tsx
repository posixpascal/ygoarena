import Head from 'next/head'

import {Container} from "@/components/Container";
import React, {useState} from "react";
import {DeckMasterSelection} from "@/components/DeckMasterSelection";
import {useRouter} from "next/router";


export default function Play() {
    const router = useRouter();
    const {sets} = router.query;
    const setIds = (sets! as string).split('|');
    const [cards, setCards] = useState([]);
    return (
        <>
            <Head>
                <title>DeckMaster Play | ygobattle.city</title>
            </Head>
            <main >
                <Container>
                    <DeckMasterSelection setIds={setIds}/>
                </Container>
            </main>
        </>
    )
}
