import { useState } from "react"
import classNames from "classnames"

import "./index.css"
import { iconCloseButton } from "../../../assets/icons/buttons"

type OwnPropsType = {
    title?: string
    onClose?: () => void
    children: React.ReactNode
    allowFullScreen?: boolean
    fullScreenMode?: boolean
    allowAnimation?: boolean
}

export default function Modal({ title, onClose, allowFullScreen, children, fullScreenMode, allowAnimation = true }: OwnPropsType) {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(!!fullScreenMode)

    const fullScreenHandler = () => {
        setIsFullScreen(true)
    }

    return (
        <div className={classNames("modal__container", { "animated": allowAnimation })}>
            <div className={classNames("modal", { "full-screen": isFullScreen, "animated": allowAnimation })}>
                {allowFullScreen && <span className="modal__before" onClick={fullScreenHandler} />}
                {!fullScreenMode && (<div className="modal__header">
                    <div className={classNames("header", { "justify-end": !title })}>
                        {title && <div>{title}</div>}
                        <img src={iconCloseButton} className="close-button" onClick={onClose} />
                    </div>
                </div>)}
                <div className="modal__content">
                    {children}
                </div>        
            </div>
            
        </div>
    )
}