import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<any> {

}

export const Button : React.FC<ButtonProps> = ({ ...props }) => {
    return <button
        {...props}
        className={'rounded-md bg-blue-200 text-blue-900 text-black px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-blue-300 ' + props.className}
    >
        {props.title}
    </button>
}