import {toast} from "react-toastify";

export const notify = (text: string) =>toast.success ( text, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
})
