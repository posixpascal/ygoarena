"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const react_1 = __importDefault(require("react"));
const Sidebar_1 = require("@/components/Sidebar");
const Layout = ({ children }) => {
    return <div className={'bg-background text-black'}>
        <div className={'flex'}>
            <Sidebar_1.Sidebar />
            <div className={'w-full h-screen overflow-auto'}>
                {children}
            </div>
        </div>
    </div>;
};
exports.Layout = Layout;
