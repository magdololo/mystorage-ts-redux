 import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';

import {
    Header,
    Wrapper,
    StyledModal,
    HeaderText,
    Content,
    Backdrop,

} from './modalStyle';
 import {faClose} from "@fortawesome/free-solid-svg-icons";
 import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    modalHeaderText: string | null;
    className?: string | null;

}

export const Modal: FunctionComponent<ModalProps> = ({
                                                         isShown,
                                                         hide,
                                                         modalContent,
                                                         modalHeaderText,
className
                                                     }) => {

    const modal = (
        <React.Fragment>
            <Backdrop onClick={() => {
                hide();


            }}/>
            <Wrapper data-testid={'modal'} tabIndex={-1} className={className ?? ""}>
                <StyledModal>
                    <Header>
                        <HeaderText>{modalHeaderText}</HeaderText>
                        <FontAwesomeIcon className=" text-md text-purple self-center pb-2 cursor-pointer  sm:text-lg"
                                         icon={faClose} onClick={() => hide()}/>
                    </Header>
                    <Content>{modalContent}</Content>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};


