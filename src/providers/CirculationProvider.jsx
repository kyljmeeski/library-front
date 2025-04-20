import { createContext } from "solid-js";

export const CirculationContext = createContext();

export default function CirculationProvider(props) {

    // const [operation, setOperation] = ()

    const circulationValue = {

    }

    return (
        <CirculationContext.Provider value={props.circulationValue}>
            {props.children}
        </CirculationContext.Provider>
    )
}