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
function Info() {
    const router = (0, router_1.useRouter)();
    const start = () => {
        router.push(router.asPath.replace('/info', '/play'));
    };
    return (<>
            <head_1.default>
                <title>DeckMaster Play | ygobattle.city</title>
            </head_1.default>
            <main>
                <Container_1.Container>
                    <div className={'my-20 mb-10 flex justify-between items-center'}>
                        <h1 className={'font-black text-6xl uppercase'}>
                            Deckmaster
                        </h1>
                        <div className={'text-sm'}>
                            <h2 className={'text-xl'}>Share this link with other players:</h2>
                            <pre><code className={'block overflow-auto max-w-xl bg-blue-100 rounded p-3 text-blue-900 mb-10'}>
                                https://ygobattle.city{router.asPath.replace('/info', '/play')}
                            </code></pre>
                        </div>
                    </div>

                        <Button_1.Button onClick={() => start()} title={'Start Deck Building'}/>
                </Container_1.Container>
            </main>
        </>);
}
exports.default = Info;
