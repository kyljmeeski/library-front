import { HStack, Image, Input, SimpleOption, SimpleSelect, Text, VStack } from "@hope-ui/solid";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { onMount, useContext } from "solid-js";
import { InputValidationContext } from "../../../providers/InputValidationProvider";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function GeneralInfo() {

    const [state, { handleInput, handleSelect }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);
    const [inputValidateState, { isInputValid }] = useContext(InputValidationContext);
       
    return (
        <HStack w={"$full"} justifyContent={"space-between"} gap={"$3"} backgroundColor={"white"} p={"$3"}>
            <VStack w={"$full"} alignItems={"start"}>
                <HStack w={"$full"} gap={"$1"}>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="firstName">Имя</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            invalid={!isInputValid("firstName")}
                            name="firstName"
                            onInput={(e) => handleInput(e)}
                            backgroundColor={"$blackAlpha5"}
                            value={state.newPatron.firstName}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="middleName">Отчество</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="middleName"
                            onInput={(e) => handleInput(e)}
                            backgroundColor={"$blackAlpha5"}
                            value={state.newPatron.middleName}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="lastName">Фамилия</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            invalid={!isInputValid("lastName")}
                            name="lastName"
                            onInput={(e) => handleInput(e)}
                            backgroundColor={"$blackAlpha5"}
                            value={state.newPatron.lastName}
                        />
                    </VStack>
                </HStack>

                <HStack w={"$full"} gap={"$1"}>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="studentNumber">
                            ID читателя
                        </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={!state.isCurrentPatronNew || patronEditingState.isLocked}
                            invalid={!isInputValid("studentNumber")}
                            name="studentNumber"
                            onInput={(e) => handleInput(e)}
                            type="text"
                            id="studentNumber"
                            backgroundColor={"$blackAlpha5"}
                            value={state.newPatron.studentNumber}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </HStack>
    );
}


