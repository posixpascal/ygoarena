import {ReactNode} from "react";

export const Container : React.FC<{children: ReactNode}> = ({children}) => {
    return <div className={'px-8 mx-auto py-8'}>
        {children}
    </div>
}