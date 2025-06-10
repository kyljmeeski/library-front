import {
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
    VStack,
    SimpleOption,
    SimpleSelect, Alert, AlertIcon, AlertTitle, AlertDescription, Text
} from "@hope-ui/solid";
import {createEffect, onMount, Show, useContext} from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";
import {createStore} from "solid-js/store";

export default function Personal() {
    const [state, { handleInput, currentReader, errors }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    onMount(() => {
        // Инициализация при необходимости
    });

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"} px={"$7"} py={"$5"} gap={"$5"}>
            {/* Общая информация */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Общая информация</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="last_name">Фамилия</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="last_name"
                            onInput={(e) => handleInput(e)}
                            id="last_name"
                            value={currentReader["last_name"]}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="first_name">Имя</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="first_name"
                            onInput={(e) => handleInput(e)}
                            id="first_name"
                            value={currentReader["first_name"]}
                        />
                    </VStack>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="middle_name">Отчество</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="middle_name"
                            onInput={(e) => handleInput(e)}
                            id="middle_name"
                            value={currentReader["middle_name"]}
                        />
                    </VStack>
                </HStack>
                <VStack alignItems={"start"} w={"calc(100%/3)"}>
                    <label for="username">ID читателя</label>
                    <Input
                        onClick={() => setEditing(true)}
                        disabled={patronEditingState.isLocked}
                        name="username"
                        onInput={(e) => handleInput(e)}
                        id="username"
                        value={currentReader["username"]}
                    />
                </VStack>
            </VStack>

            {/* Идентификаторы */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Идентификаторы</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="birth_date">Дата рождения</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="birth_date"
                            onInput={(e) => handleInput(e)}
                            type="date"
                            id="birth_date"
                            value={currentReader["birth_date"]}
                        />
                    </VStack>
                    <VStack alignItems={"start"} w={"calc(100%/3)"}>
                        <label for="passport">Серия и номер паспорта</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="passport"
                            onInput={(e) => handleInput(e)}
                            id="passport"
                            placeholder="ID1234567"
                            value={currentReader["passport"]}
                        />
                        <Text
                            when={errors["passport"].trim() !== ""}
                        >
                            {errors["passport"]}
                        </Text>
                    </VStack>
                </HStack>
            </VStack>

            {/* Контактные данные: Email и Телефон в одной строке */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Контактные данные</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"}>
                    {/* Email */}
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="email">Основной Email</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="email"
                            onInput={(e) => handleInput(e)}
                            id="email"
                            placeholder="email@example.com"
                            value={currentReader["email"]}
                        />
                    </VStack>

                    {/* Телефон */}
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="phone">Основной телефон</label>
                        <InputGroup>
                            <InputLeftAddon>+996</InputLeftAddon>
                            <Input
                                onClick={() => setEditing(true)}
                                disabled={patronEditingState.isLocked}
                                name="phone"
                                onInput={(e) => handleInput(e)}
                                id="phone"
                                type="tel"
                                class="patron-phone"
                                value={currentReader["phone"]}
                            />
                        </InputGroup>
                    </VStack>

                    {/* Пустой блок для выравнивания */}
                    <VStack flexBasis={"calc(100%/3)"}/>
                </HStack>
            </VStack>

            {/* Прочее */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Прочее</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"} alignItems={"start"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="address">Адрес </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="address"
                            onInput={(e) => handleInput(e)}
                            id="address"
                            value={currentReader["address"]}
                        />
                    </VStack>
                    <VStack flexBasis={"calc(100%/3)"}/>
                    <VStack flexBasis={"calc(100%/3)"}/>
                </HStack>
            </VStack>
        </VStack>
    );
}





