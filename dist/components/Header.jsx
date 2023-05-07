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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importStar(require("react"));
const NavigationItem_1 = require("@/components/NavigationItem");
const Header = () => {
    const navItems = [
        {
            to: "/arena",
            name: "Arena"
        },
        // {
        //     to: "/deckmaster",
        //     name: "Deckmaster"
        // },
    ];
    const navigation = (0, react_1.useMemo)(() => {
        return <nav className={'flex gap-8 text-2xl'}>
            {navItems.map(item => (<>
              <NavigationItem_1.NavigationItem item={item} key={item.to}/>
            </>))}
        </nav>;
    }, [navItems]);
    return <header className={'min-h-[85px] shadow-xl px-5 border-b border-b-black/20 flex bg-white w-full justify-between items-center'}>
        <a href={'/'} className={'font-black text-4xl'}>
            YGO Battle City
        </a>
        {navigation}
    </header>;
};
exports.Header = Header;
