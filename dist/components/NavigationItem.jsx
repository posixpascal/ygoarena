"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationItem = void 0;
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const NavigationItem = ({ item: { to, name } }) => {
    const router = (0, router_1.useRouter)();
    const isActive = router.pathname === to || router.pathname.includes(to);
    return <link_1.default href={to} className={`
        ${isActive ? 'bg-amber-100 text-amber-900 p-1.5 px-5 rounded-lg' : "p-1.5 px-5"}
    `}>
        {name}
    </link_1.default>;
};
exports.NavigationItem = NavigationItem;
