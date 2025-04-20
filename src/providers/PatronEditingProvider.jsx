import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const PatronEditingContext = createContext();

export default function PatronEditingProvider(props) {

    const [state, setState] = createStore({
        isLocked: true,
        isEditing: false,
        isReadyToSave: true,
        isASC: true, 
        isPatronSelected: false, 
    });

    const patronEditing = [
        state, 
        {
            setLocked(isLocked) {
                setState("isLocked", isLocked);
            },
            setEditing(isEditing) {
                setState("isEditing", isEditing);
            },
            setReadyToSave(isReadyToSave) {
                setState("isReadyToSave", isReadyToSave);
            },
            setASC(isASC) {
                setState("isASC", isASC);
            }, 
            setPatronSelected(isPatronSelected) {
                setState("isPatronSelected", isPatronSelected);
            }, 
        }
    ]

    return (
        <PatronEditingContext.Provider value={patronEditing}>
            {props.children}
        </PatronEditingContext.Provider>
    )
}