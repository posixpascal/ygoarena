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
exports.Card = void 0;
const react_1 = __importStar(require("react"));
const web_1 = require("@react-spring/web");
// TODO: Add Rare/SR/UR effect
// TODO: cleanup this mess :D
const Card = ({ index = 0, flipped, flippable = false, card }) => {
    const [flip, setFlipped] = (0, react_1.useState)(false);
    const [showOverlay, setShowOverlay] = (0, react_1.useState)(false);
    const { transform, opacity } = (0, web_1.useSpring)({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        delay: 300 * index,
        config: { mass: 5, tension: 500, friction: 80 },
    });
    return <div>
        {showOverlay && <div className={`fixed z-20 isolation-auto bg-black/80 p-5 text-white isolate top-0 left-0`}>
            {card.desc}
        </div>}
        <div className={'relative w-full'}>
            <web_1.animated.div className={'absolute h-full w-full will-change-transform'} style={{ opacity: opacity.to(o => 1 - o), transform }}>
                <img src={'/images/CardBack.jpg'} className={`object-contain`} alt={card.name} width={'100%'}/>
            </web_1.animated.div>
            <web_1.animated.div className={'absolute h-full w-full will-change-transform'} style={{
            opacity,
            transform,
            rotateY: '180deg',
        }}>
                <img onMouseLeave={() => setShowOverlay(false)} onMouseEnter={() => setShowOverlay(true)} src={card.image} className={`object-contain`} alt={card.name} width={'100%'}/>
            </web_1.animated.div>
        </div>
    </div>;
};
exports.Card = Card;
