import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const ItemEditingContext = createContext();

export default function ItemEditingProvider(props) {

    const [state, setState] = createStore({
        isLocked: true,
        isEditing: true,
        isReadyToSave: false,
        isASC: true, 
    });

    const itemEditingValue = [
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
            }
        }
    ];

    return (
        <ItemEditingContext.Provider value={itemEditingValue}>
            {props.children}
        </ItemEditingContext.Provider>
    )
}