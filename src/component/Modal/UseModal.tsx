import {useState} from "react";


export const useModal = () => {
    const [isShown, setIsShown] = useState<boolean>(false);
    const handleShown = () => setIsShown(true);
    const handleClose = () => setIsShown(false);
    return {
        isShown,
        handleShown,
        handleClose
    };
};