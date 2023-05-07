"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const react_1 = require("react");
const Input = ({ label, name, type, ...otherArgs }) => {
    const link = (0, react_1.useId)();
    return <div className="rounded-md shadow shadow-sky-200 px-3 mb-5 bg-white pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-sky-300 focus-within:ring-2 focus-within:ring-sky-400">
        <label htmlFor={link} className="block text-sky-900 text-xs text-headline font-black md:text-lg">
            {label}
        </label>
        <input id={link} name={name} type={type} className="block w-full border-0 p-0 bg-white outline-none placeholder-headline text-paragraph placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 md:text-lg" {...otherArgs}/>
    </div>;
};
exports.Input = Input;
