import {ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<any> {

}

export const Button : React.FC<ButtonProps> = ({ ...props }) => {
    return <button className={'rounded-md bg-blue-200 text-blue-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-300'} {...props}>
        {props.title}
    </button>
}