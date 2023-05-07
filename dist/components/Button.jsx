"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const Button = ({ size = "", ...props }) => {
    let extraClassNames = [];
    if (props.disabled) {
        extraClassNames.push('pointer-events-none', 'bg-gray-300', 'opacity-50');
    }
    switch (size) {
        case "xl":
            extraClassNames.push('text-xl px-8 py-3');
            break;
        default:
            extraClassNames.push('text-sm px-3.5 py-2.5');
    }
    return <button {...props} className={`
            rounded-md bg-red-200 text-red-900
            font-semibold shadow-sm hover:bg-red-300 ${props.className} ${extraClassNames.join(' ')}
        `}>
        {props.title}
    </button>;
};
exports.Button = Button;
