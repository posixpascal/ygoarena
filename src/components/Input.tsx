import {InputHTMLAttributes, useId} from "react";

interface InputProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
    label: string;
    name: string;
    type: string;
}

export const Input: React.FC<InputProps> = ({label, name, type, ...otherArgs}) => {
    const link = useId();
    return <div className="rounded-md px-3 bg-slate-600 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-blue-300 focus-within:ring-2 focus-within:ring-blue-400">
        <label htmlFor={link} className="block text-xs text-headline font-black md:text-lg">
            {label}
        </label>
        <input
            id={link}
            name={name}
            type={type}
            className="block w-full border-0 p-0 bg-slate-600 outline-none placeholder-headline text-paragraph placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 md:text-lg" {...otherArgs} />
    </div>
}