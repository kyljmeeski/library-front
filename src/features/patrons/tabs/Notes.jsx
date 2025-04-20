import { Textarea, VStack } from "@hope-ui/solid";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { useContext } from "solid-js";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function Notes() {

    const [state, { handleInput }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"}  px={"$7"} py={"$5"} gap={"$3"}>
            <VStack alignItems={"start"} w={"$full"} flexGrow={"1"}>
                <label for="generalNotes">
                    Общие заметки
                </label>
                <Textarea onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="generalNotes" onInput={(e) => handleInput(e)} id="generalNotes" flexGrow={"1"} value={state.newPatron.generalNotes} />
            </VStack>
            <VStack alignItems={"start"} w={"$full"} flexGrow={"1"}>
                <label for="alertNotes">
                    Заметки для оповещений
                </label>
                <Textarea onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="alertNotes" onInput={(e) => handleInput(e)} id="alertNotes" flexGrow={"1"} value={state.newPatron.alertNotes} />
            </VStack>
        </VStack>
    )
}
