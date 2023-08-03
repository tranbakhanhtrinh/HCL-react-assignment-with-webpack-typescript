import React, { MouseEventHandler, ReactNode } from "react";
import Button from "../Button/Button";
import "./Modal.scss";

interface Props {
    children: ReactNode;
    onCloseModal: MouseEventHandler<HTMLButtonElement>;
    onAccept: MouseEventHandler<HTMLButtonElement>;
}

const Modal: React.FC<Props> = ({ children, onCloseModal, onAccept }): JSX.Element => {
    return (
        <div id="myModal" className="modal" data-testid="modal-testid">
            <div className="modal-content">
                {children}
                <div className="me-0 ms-auto">
                    <Button onClick={onAccept} className="me-2" primary>
                        <span data-testid="modal-btn-ok">OK</span>
                    </Button>
                    <Button onClick={onCloseModal} danger>
                        <span data-testid="modal-btn-cancel">Cancel</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
