import {useState} from "react";
import {set} from "react-hook-form";

// export const useModal = () => {
//     const [isShown, setIsShown] = useState<boolean>(false);
//     const toggle = () => {
//         setIsShown(!isShown);
//     }
//     return {
//         isShown,
//         toggle,
//     };
// };

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