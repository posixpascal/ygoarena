"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const head_1 = __importDefault(require("next/head"));
const react_1 = __importDefault(require("react"));
function Home() {
    return (<>
            <head_1.default>
                <title></title>
            </head_1.default>
            <main>
                <div className={'grid grid-cols-2'}>

                </div>
            </main>
        </>);
}
exports.default = Home;
