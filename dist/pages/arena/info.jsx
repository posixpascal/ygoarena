"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const Container_1 = require("@/components/Container");
const react_1 = __importDefault(require("react"));
const Button_1 = require("@/components/Button");
const router_1 = require("next/router");
const Headline_1 = require("@/components/Headline");
function Info() {
    const router = (0, router_1.useRouter)();
    const start = () => {
        router.push(router.asPath.replace('/info', '/play'));
    };
    return (<>
            <head_1.default>
                <title>Arena Play | ygobattle.city</title>
            </head_1.default>
            <main>
                <Container_1.Container>
                    <div className={'grid grid-cols-5  mb-10 items-center'}>
                        <div className={'col-span-3'}><Headline_1.Headline>Arena Mode</Headline_1.Headline>
                            <p className={'text-lg text-sky-800'}>
                                Copy this link and share it with other players:
                            </p>
                            <br />
                            <pre><code className={'block overflow-auto bg-sky-100 text-xl rounded p-3 text-sky-900 mb-10'}>
                                https://arena.ygobattle.city{router.asPath.replace('/info', '/play')}
                            </code></pre>
                        </div>
                        <aside className={'col-span-2 flex justify-end'}>

                        </aside>
                    </div>

                    You can build a deck yourself by clicking on this link:<br />
                    <Button_1.Button onClick={() => start()} size={'xl'} title={'Start Deck Building'}/>
                </Container_1.Container>
            </main>
        </>);
}
exports.default = Info;
