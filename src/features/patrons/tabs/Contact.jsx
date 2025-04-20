import { HStack, Heading, Input, InputGroup, InputLeftAddon, Textarea, VStack } from "@hope-ui/solid";
import { onMount, useContext } from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function Contact() {

    const [state, { handleInput }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    onMount(() => {
    })

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"}  px={"$7"} py={"$5"} gap={"$3"}>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Электронная почта
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="primaryEmail">
                            Основной Email
                        </label>
                        <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="primaryEmail" onInput={(e) => handleInput(e)} id="primaryEmail" placeholder="email@example.com" value={state.newPatron.primaryEmail} />
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="instituteEmail">
                            Почта библиотеки
                        </label>
                        <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="instituteEmail" onInput={(e) => handleInput(e)} id="instituteEmail" placeholder="email@.kg" value={state.newPatron.instituteEmail} />
                    </VStack>
                </HStack>
            </VStack>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Телефон
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="primaryPhone">
                            Основной телефон
                        </label>
                        <InputGroup>
                            <InputLeftAddon>
                                +996
                            </InputLeftAddon>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="primaryPhone" onInput={(e) => handleInput(e)} id="primaryPhone" type="tel" class="patron-phone" value={state.newPatron.primaryPhone} />
                        </InputGroup>
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="mobile">
                            Мобильный
                        </label>
                        <InputGroup>
                            <InputLeftAddon>
                                +996
                            </InputLeftAddon>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="mobile" onInput={(e) => handleInput(e)} id="mobile" type="tel" class="patron-phone" value={state.newPatron.mobile} />
                        </InputGroup>
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="messengers">
                            Мессенджеры
                        </label>
                        <InputGroup>
                            <InputLeftAddon>
                                +996
                            </InputLeftAddon>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="messengers" onInput={(e) => handleInput(e)} id="messengers" type="tel" class="patron-phone" value={state.newPatron.messengers} />
                        </InputGroup>
                    </VStack>
                </HStack>
            </VStack>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Прочее
                </Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$1"} alignItems={"start"} h={"$full"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <VStack alignItems={"start"} w={"$full"}>
                            <label for="address1">
                                Адрес 1
                            </label>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="address1" onInput={(e) => handleInput(e)} id="address1" value={state.newPatron.address1} />
                        </VStack>
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <VStack alignItems={"start"} w={"$full"}>
                            <label for="address2">
                                Адрес 2
                            </label>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="address2" onInput={(e) => handleInput(e)} id="address2" value={state.newPatron.address2} />
                        </VStack>
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"} h={"$full"}>
                        <VStack alignItems={"start"} w={"$full"} h={"$full"}>
                            <label for="contactNotes">
                                Примечания к контактам
                            </label>
                            <Textarea disabled={patronEditingState.isLocked} name="contactNotes" onInput={(e) => handleInput(e)} id="contactNotes" h={"$full"} value={state.newPatron.contactNotes} />
                        </VStack>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    )
}
