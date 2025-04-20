import { HStack, Image, Input, SimpleGrid, SimpleOption, SimpleSelect, Text, VStack } from "@hope-ui/solid";
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
            <Image src="https://fakeimg.pl/155x200" h={"200px"} w={"155px"} fit="cover" />
            <VStack w={"$full"} alignItems={"start"}>
                <Text>
                    ФИО
                </Text>
                <HStack w={"$full"} gap={"$1"}>
                    <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} invalid={!isInputValid("firstName")} name="firstName" onInput={(e) => handleInput(e)} backgroundColor={"$blackAlpha5"} value={state.newPatron.firstName} />
                    <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="middleName" onInput={(e) => handleInput(e)} backgroundColor={"$blackAlpha5"} value={state.newPatron.middleName} />
                    <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} invalid={!isInputValid("lastName")} name="lastName" onInput={(e) => handleInput(e)} backgroundColor={"$blackAlpha5"} value={state.newPatron.lastName} />
                </HStack>
                <HStack w={"$full"} gap={"$1"}>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="studentNumber">
                            ID читателя
                        </label>
                        <Input onClick={() => setEditing(true)} disabled={!state.isCurrentPatronNew || patronEditingState.isLocked} invalid={!isInputValid("studentNumber")} name="studentNumber" onInput={(e) => handleInput(e)} type="text" id="studentNumber" backgroundColor={"$blackAlpha5"} value={state.newPatron.studentNumber} />
                    </VStack>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="library">
                            Библиотека
                        </label>
                        <SimpleSelect onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} placeholder="Выбрать" onChange={(value) => handleSelect("library", value)} id="library" backgroundColor={"$blackAlpha5"} value={state.newPatron.library}>
                            <SimpleOption value={"INAI_KG"}>
                                INAI.KG
                                
                            </SimpleOption>
                        </SimpleSelect>
                    </VStack>
                </HStack>
                <HStack w={"$full"} gap={"$1"}>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="status">
                            Статус
                        </label>
                        <SimpleSelect onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} placeholder="Выбрать" onChange={(value) => handleSelect("status", value)} id="status" backgroundColor={"$blackAlpha5"} value={state.newPatron.status}>
                            <SimpleOption value={"ACTIVE"}>
                                Активен
                            </SimpleOption>
                        </SimpleSelect>
                    </VStack>
                    <VStack alignItems={"start"} flex={"1"}>
                        <label for="policy">
                            Политика
                        </label>
                        <SimpleSelect onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} placeholder="Выбрать" onChange={(value) => handleSelect("policy", value)} id="policy" backgroundColor={"$blackAlpha5"} value={state.newPatron.policy}>
                            <SimpleOption value={"BASIC_STUDENT"}>
                                Базовый студент
                            </SimpleOption>
                        </SimpleSelect>
                    </VStack>
                </HStack>
            </VStack>
        </HStack>
    )
}
