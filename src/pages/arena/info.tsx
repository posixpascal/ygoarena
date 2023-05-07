import Head from 'next/head'
import {Container} from "@/components/Container";
import React from "react";
import {Button} from "@/components/Button";
import {useRouter} from "next/router";
import {Headline} from "@/components/Headline";


export default function Info() {
    const router = useRouter();

    const start = () => {
        router.push(
            router.asPath.replace('/info', '/play')
        )
    }

    return (
        <>
            <Head>
                <title>Arena Play | ygobattle.city</title>
            </Head>
            <main>
                <Container>
                    <div className={'grid grid-cols-5  mb-10 items-center'}>
                        <div className={'col-span-3'}><Headline>Arena Mode</Headline>
                            <p className={'text-lg text-sky-800'}>
                                Copy this link and share it with other players:
                            </p>
                            <br/>
                            <pre><code
                                className={'block overflow-auto bg-sky-100 text-xl rounded p-3 text-sky-900 mb-10'}>
                                https://arena.ygobattle.city{router.asPath.replace('/info', '/play')}
                            </code></pre>
                        </div>
                        <aside className={'col-span-2 flex justify-end'}>

                        </aside>
                    </div>

                    You can build a deck yourself by clicking on this link:<br/>
                    <Button onClick={() => start()} size={'xl'} title={'Start Deck Building'}/>
                </Container>
            </main>
        </>
    )
}
