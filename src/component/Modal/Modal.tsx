 import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';

import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    Content,
    Backdrop,

} from './modalStyle';

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
            <Wrapper tabIndex={-1} className={className??""}>
                <StyledModal>
                    <Header>
                        <HeaderText>{modalHeaderText}</HeaderText>
                    </Header>
                    <Content>{modalContent}</Content>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};


