import { HStack, Heading, Input, VStack } from "@hope-ui/solid";
import { useContext } from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function Access() {

    const [state, { handleInput }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"}  px={"$7"} py={"$5"} gap={"$3"}>
            <HStack gap={"$1"} alignItems={"start"} w={"$full"}>
                <VStack alignItems={"start"} gap={"$3"} w={"$full"}>
                    <Heading color={"$accent11"}>
                        Логин
                    </Heading>
                    <VStack gap={"$1"} w={"$full"}>
                        <VStack alignItems={"start"} w={"$full"}>
                            <label for="username">
                                Имя пользователя
                            </label>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="username" onInput={(e) => handleInput(e)} id="username" value={state.newPatron.username} />
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"}>
                            <label for="password">
                                Пароль
                            </label>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="password" onInput={(e) => handleInput(e)} id="password" value={state.newPatron.password} />
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"}>
                            <label for="confirmPassword">
                                Повторить пароль
                            </label>
                            <Input onClick={() => setEditing(true)} disabled={patronEditingState.isLocked} name="confirmPassword" onInput={(e) => handleInput(e)} id="confirmPassword" value={state.newPatron.confirmPassword} />
                        </VStack>
                    </VStack>
                </VStack>
            </HStack>
        </VStack>
    )
}