import { useState } from "react"
import classNames from "classnames"

import "./index.css"

type OwnPropsType = {
    title: string
    onClose: () => void
    children: React.ReactNode
    allowFullScreen?: boolean
}

export default function Modal({ title, onClose, allowFullScreen, children }: OwnPropsType) {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false)

    const fullScreenHandler = () => {
        setIsFullScreen(true)
    }

    return (
        <div className="modal__container">
            <div className={classNames("modal", { "full": isFullScreen })}>
                {allowFullScreen && <span className="modal__before" onClick={fullScreenHandler} />}
                <div className="modal__header">
                    <div className="header">
                        <div>{title}</div>
                        <div className="close-button" onClick={onClose}>
                            <span className="close-button_text">+</span>
                        </div>
                    </div>
                </div>
                <div className="modal__content">
                    {children}
                </div>        
            </div>
            
        </div>
    )
}