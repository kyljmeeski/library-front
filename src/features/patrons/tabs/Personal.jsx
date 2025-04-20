import { HStack, Heading, Input, VStack, SimpleOption, SimpleSelect } from "@hope-ui/solid";
import { onMount, useContext } from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function Personal() {
    const [state, { handleInput, handleSelect }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    onMount(() => {
        
    });

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"} px={"$7"} py={"$5"} gap={"$3"}>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Идентификаторы
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="birthDate">
                            Дата рождения
                        </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="birthDate"
                            onInput={(e) => handleInput(e)}
                            type="date"
                            id="birthDate"
                            value={state.newPatron.birthDate}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label>
                            Пол
                        </label>
                        <SimpleSelect
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            onChange={(value) => handleSelect("sex", value)}
                            placeholder="Выберите"
                            value={state.newPatron.sex}
                        >
                            <SimpleOption value={"MALE"}>Мужской</SimpleOption>
                            <SimpleOption value={"FEMALE"}>Женский</SimpleOption>
                        </SimpleSelect>
                    </VStack>
                </HStack>
            </VStack>

            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Адрес
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"}>
                    <VStack alignItems={"start"} flexBasis={"100%"}>
                        <label for="address">
                            Адрес
                        </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="address"
                            onInput={(e) => handleInput(e)}
                            type="text"
                            id="address"
                            value={state.newPatron.address}
                        />
                    </VStack>
                </HStack>
            </VStack>

            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Даты
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="graduationDate">
                            Дата выдачи
                        </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="graduationDate"
                            onInput={(e) => handleInput(e)}
                            type="date"
                            id="graduationDate"
                            value={state.newPatron.graduationDate}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="accountExpiration">
                            Истечение срока
                        </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="accountExpiration"
                            onInput={(e) => handleInput(e)}
                            type="date"
                            id="accountExpiration"
                            value={state.newPatron.accountExpiration}
                        />
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}

