 import React, {FunctionComponent} from 'react';
import ReactDOM from 'react-dom';

import {
    Wrapper,
    Header,
    StyledModal,
    HeaderText,
    CloseButton,
    Content,
    Backdrop,

} from './modalStyle';

export interface ModalProps {
    isShown: boolean;
    hide: () => void;
    modalContent: JSX.Element;
    modalHeaderText: string | null;
}

export const Modal: FunctionComponent<ModalProps> = ({
                                                         isShown,
                                                         hide,
                                                         modalContent,
                                                         modalHeaderText,
                                                     }) => {

    const modal = (
        <React.Fragment>
            <Backdrop onClick={() => {
                hide();

            }}/>
            <Wrapper tabIndex={-1} className="">
                <StyledModal>
                    <Header>
                        <HeaderText>{modalHeaderText}</HeaderText>
                        {/*<CloseButton onClick={hide}>X</CloseButton>*/}
                    </Header>
                    <Content>{modalContent}</Content>
                </StyledModal>
            </Wrapper>
        </React.Fragment>
    );

    return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};


