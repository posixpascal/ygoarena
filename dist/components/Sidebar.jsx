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
exports.Sidebar = void 0;
const swords_svg_1 = __importDefault(require("@/icons/swords.svg"));
const money_svg_1 = __importDefault(require("@/icons/money.svg"));
const crown_svg_1 = __importDefault(require("@/icons/crown.svg"));
const react_1 = __importStar(require("react"));
const web_1 = require("@react-spring/web");
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const Logo = () => (<div className={'p-1'}>
    <svg viewBox="0 0 272 364" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" fontFamily="Inter-Regular_Black, Inter, Arial" fontWeight="800">
            <g id="Artboard" transform="translate(12.000000, 62.000000)">
                <g id="Group" transform="translate(-12.000000, -62.000000)">
                    <text id="C" font-size="227" fill="#B0C4CB">
                        <tspan x="96.7791193" y="309">C</tspan>
                    </text>
                    <text id="B" font-size="253" fill="#1E202C">
                        <tspan x="0.546875" y="245">B</tspan>
                    </text>
                </g>
            </g>
        </g>
    </svg>
</div>);
const MenuItem = ({ to, titleClassName = 'text-lg', soon = false, icon, name, expand }) => {
    const router = (0, router_1.useRouter)();
    const isActive = router.pathname.includes(to) && to && to !== '/';
    const expandTransition = (0, web_1.useSpring)({ opacity: expand ? 1 : 0 });
    return <link_1.default href={to} className={`flex items-center gap-3 min-w-[250px] p-3 px-5 w-full overflow-hidden ${soon ? 'opacity-50 grayscale pointer-events-none' : ''} ${isActive ? 'bg-sky-200/50' : ''}`}>
        <div className={'w-16'}>
            {icon}
        </div>
        <web_1.animated.div style={expandTransition} className={`w-full flex text-center ${titleClassName}`}>
            {name} {soon && <div>(soon)</div>}
        </web_1.animated.div>
    </link_1.default>;
};
const Sidebar = () => {
    const [isHover, setHover] = (0, react_1.useState)(false);
    const expandTransition = (0, web_1.useSpring)({
        width: isHover ? 280 : 85, config: {
            duration: 200
        }
    });
    return <web_1.animated.div onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} style={expandTransition} className={`bg-white border-r overflow-hidden h-screen shadow-2xl flex flex-col`}>
        <MenuItem icon={<Logo />} to="/" titleClassName={'font-black text-2xl'} name={"Battle City"} expand={isHover}/>
        <hr />
        <nav className={'w-full flex flex-col gap-2'}>
            <MenuItem to="/arena" icon={<swords_svg_1.default />} name={"Arena Mode"} expand={isHover}/>
            <MenuItem to="/auction" soon={true} icon={<money_svg_1.default />} name={"Auctions"} expand={isHover}/>
            <MenuItem to="/deckmaster" soon={true} icon={<crown_svg_1.default />} name={"DM"} expand={isHover}/>
        </nav>
    </web_1.animated.div>;
};
exports.Sidebar = Sidebar;
