import axios from "axios";
import { createContext, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const InputValidationContext = createContext();

export default function InputValidationProvider(props) {

    const [state, setState] = createStore({
        patron: {
            firstName: false, 
            lastName: false, 
            studentName: false, 
        }
    });

    const inputValidationValue = [
        state, 
        {
            validateInput (name, value) {
                if (value == null || value == undefined) {
                    setState("patron", name, false);
                    return;
                }
                if (name == "firstName") {
                    setState("patron", "firstName", value.trim() == "" ? false : true);
                }
                if (name == "lastName") {
                    setState("patron", "lastName", value.trim() == "" ? false : true);
                }
                if (name == "studentNumber") {
                    const isNotEmpty = value.trim() == "" ? false : true;
                    setState("patron", "studentNumber", isNotEmpty);
                }
            }, 
            isInputValid (name) {
                return state.patron[name];
            }, 
        }
    ];

    return (
        <InputValidationContext.Provider value={inputValidationValue}>
            {props.children}
        </InputValidationContext.Provider>
    )
}