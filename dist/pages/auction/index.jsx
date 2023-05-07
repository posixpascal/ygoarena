"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const Container_1 = require("@/components/Container");
const react_1 = __importDefault(require("react"));
const router_1 = require("next/router");
function Index() {
    const router = (0, router_1.useRouter)();
    return (<>
            <head_1.default>
                <title>Actions Setup | ygobattle.city</title>
            </head_1.default>
            <main>
                <Container_1.Container>
                    <h1 className={'text-6xl my-20 font-black uppercase'}>
                        Coming soon
                    </h1>
                </Container_1.Container>
            </main>
        </>);
}
exports.default = Index;
