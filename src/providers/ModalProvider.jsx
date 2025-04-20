import { createDisclosure } from "@hope-ui/solid";
import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const ModalContext = createContext();

export default function ModalProvider(props) {

    const { isOpen, onOpen, onClose } = createDisclosure();

    const modalValue = [
        {
            isOpen, onOpen, onClose
        }, 
    ]

    return (
        <ModalContext.Provider value={modalValue}>
            {props.children}
        </ModalContext.Provider>
    )
}