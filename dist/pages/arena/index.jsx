"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const Container_1 = require("@/components/Container");
const react_1 = __importStar(require("react"));
const SetSelection_1 = require("@/components/SetSelection");
const router_1 = require("next/router");
const Headline_1 = require("@/components/Headline");
const SetSelectionSummary_1 = require("@/components/SetSelectionSummary");
const Input_1 = require("@/components/Input");
const useDebounce_1 = require("@/hooks/useDebounce");
const Button_1 = require("@/components/Button");
function Index() {
    const router = (0, router_1.useRouter)();
    const [selected, setSelected] = (0, react_1.useState)([]);
    const [query, setQuery] = (0, react_1.useState)(undefined);
    // Wait for 300ms before changing the variable
    const debouncedQuery = (0, useDebounce_1.useDebounce)(query, 200);
    const handleSelection = async () => {
        const queryString = new URLSearchParams();
        queryString.append('sets', selected.join('|'));
        await router.push('/arena/info?' + queryString.toString());
    };
    return (<>
            <head_1.default>
                <title></title>
            </head_1.default>
            <main>
                <Container_1.Container>
                    <div className={'grid grid-cols-5  mb-10 items-center'}>
                        <div className={'col-span-3'}><Headline_1.Headline>Arena Mode</Headline_1.Headline>
                            <p className={'text-lg text-sky-800'}>
                                In Battle City Arena each player draws 4 random cards and may add one of those card to their
                                deck.<br />
                                Then they can draw 4 more random cards until they complete their deck.
                                You can add sets to the arena card pool by clicking on them. Once ready, press continue.
                            </p>
                        </div>
                        <aside className={'col-span-2 flex justify-end'}>
                            <Button_1.Button size={'xl'} disabled={selected.length === 0} onClick={handleSelection} title={selected.length ? `Continue with ${selected.length} Sets` : "Select Sets to Continue"}></Button_1.Button>
                        </aside>
                    </div>
                    <div className={'grid grid-cols-7 gap-8'}>
                        <div className={'col-span-5'}>
                            <SetSelection_1.SetSelection query={query} selected={selected} setSelected={setSelected}/>
                        </div>
                        <div className={'col-span-2'}>
                            <div>
                                <div className={'col-span-7'}>
                                    <Input_1.Input onChange={(ev) => setQuery(ev.target.value)} label={'Search Set'} placeholder="Search by name (i.e. Legend of Blue Eyes) or code (i.e. LOB)" name={'set'} type={'text'}/>
                                </div>
                            </div>
                            <SetSelectionSummary_1.SetSelectionSummary setSelected={setSelected} readonly={false} setIds={selected}/>
                        </div>
                    </div>
                </Container_1.Container>
            </main>
        </>);
}
exports.default = Index;
