import {
    HStack,
    Heading,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
    VStack,
    SimpleOption,
    SimpleSelect
} from "@hope-ui/solid";
import { onMount, useContext } from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";

export default function Personal() {
    const [state, { handleInput, handleSelect }] = useContext(CurrentPatronContext);
    const [patronEditingState, { setEditing }] = useContext(PatronEditingContext);

    onMount(() => {
        // Инициализация при необходимости
    });

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"} px={"$7"} py={"$5"} gap={"$5"}>
            {/* Идентификаторы */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Идентификаторы</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="birthDate">Дата рождения</label>
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
                        <label>Роль</label>
                        <SimpleSelect
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            onChange={(value) => handleSelect("role", value)}
                            placeholder="Выбрать"
                            value={state.newPatron.role}
                        >
                            <SimpleOption value={"READER"}>Читатель</SimpleOption>
                            <SimpleOption value={"LIBRARIAN"}>Библиотекарь</SimpleOption>
                        </SimpleSelect>
                    </VStack>
                </HStack>

                {/* Серия и номер паспорта */}
                <VStack alignItems={"start"} w={"calc(100%/3)"}>
                    <label for="passportNumber">Серия и номер паспорта</label>
                    <Input
                        onClick={() => setEditing(true)}
                        disabled={patronEditingState.isLocked}
                        name="passportNumber"
                        onInput={(e) => handleInput(e)}
                        id="passportNumber"
                        placeholder="ID1234567"
                        value={state.newPatron.passportNumber}
                    />
                </VStack>
            </VStack>

            {/* Контактные данные: Email и Телефон в одной строке */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Контактные данные</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"}>
                    {/* Email */}
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="primaryEmail">Основной Email</label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="primaryEmail"
                            onInput={(e) => handleInput(e)}
                            id="primaryEmail"
                            placeholder="email@example.com"
                            value={state.newPatron.primaryEmail}
                        />
                    </VStack>

                    {/* Телефон */}
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="primaryPhone">Основной телефон</label>
                        <InputGroup>
                            <InputLeftAddon>+996</InputLeftAddon>
                            <Input
                                onClick={() => setEditing(true)}
                                disabled={patronEditingState.isLocked}
                                name="primaryPhone"
                                onInput={(e) => handleInput(e)}
                                id="primaryPhone"
                                type="tel"
                                class="patron-phone"
                                value={state.newPatron.primaryPhone}
                            />
                        </InputGroup>
                    </VStack>

                    {/* Пустой блок для выравнивания */}
                    <VStack flexBasis={"calc(100%/3)"} />
                </HStack>
            </VStack>

            {/* Прочее */}
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>Прочее</Heading>
                <HStack w={"$full"} justifyContent={"start"} gap={"$3"} alignItems={"start"}>
                    <VStack alignItems={"start"} flexBasis={"calc(100%/3)"}>
                        <label for="address1">Адрес </label>
                        <Input
                            onClick={() => setEditing(true)}
                            disabled={patronEditingState.isLocked}
                            name="address1"
                            onInput={(e) => handleInput(e)}
                            id="address1"
                            value={state.newPatron.address1}
                        />
                    </VStack>
                    <VStack flexBasis={"calc(100%/3)"} />
                    <VStack flexBasis={"calc(100%/3)"} />
                </HStack>
            </VStack>
        </VStack>
    );
}





