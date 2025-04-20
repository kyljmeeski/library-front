import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleOption, SimpleSelect, Text, VStack } from "@hope-ui/solid"
import { useContext } from "solid-js"
import { CurrentPatronContext } from "../../../providers/CurrentPatron"

export default function PatronSearchModal(props) {

    const [state, { searchPatron, setSearchPatron, search }] = useContext(CurrentPatronContext);

    return (
        <Modal opened={props.isOpen()} onClose={() => {props.onClose(); setSearchPatron("firstName", "");
        setSearchPatron("middleName", "");
        setSearchPatron("lastName", "");
        setSearchPatron("sex", "");
        setSearchPatron("address", "");}} size={"2xl"} initialFocus="#searchFirstName" closeOnOverlayClick={false}>
            <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    Поиск читателей
                </ModalHeader>
                <ModalBody>
                    <VStack p={"$3"} gap={"$3"} alignItems={"start"} fontSize={"14px"}>
                        <VStack alignItems={"start"} w={"$full"} gap={"$1"}>
                            <Text flexShrink={"0"}>
                                Имя
                            </Text>
                            <Input size={"sm"} id="searchFirstName" onInput={(e) => {setSearchPatron("firstName", e.target.value)}} value={searchPatron.firstName}/>
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"} gap={"$1"}>
                            <Text flexShrink={"0"}>
                                Отчество
                            </Text>
                            <Input value={searchPatron.middleName} size={"sm"} onInput={(e) => {setSearchPatron("middleName", e.target.value)}} />
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"} gap={"$1"} mb={"$3"}>
                            <Text flexShrink={"0"}>
                                Фамилия
                            </Text>
                            <Input value={searchPatron.lastName} size={"sm"} onInput={(e) => {setSearchPatron("lastName", e.target.value)}} />
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"} gap={"$1"} mb={"$3"}>
                            <Text flexShrink={"0"}>
                                Пол
                            </Text>
                            <SimpleSelect value={searchPatron.sex} w={"$full"} placeholder={"Выберите"} onChange={(v) => setSearchPatron("sex", v)}>
                                <SimpleOption value={"MALE"}>
                                    Мужской
                                </SimpleOption>
                                <SimpleOption value={"FEMALE"}>
                                    Женский
                                </SimpleOption>
                            </SimpleSelect>
                        </VStack>
                        <VStack alignItems={"start"} w={"$full"} gap={"$1"} mb={"$3"}>
                            <Text flexShrink={"0"}>
                                Адрес
                            </Text>
                            <Input value={searchPatron.address} size={"sm"} onInput={(e) => {setSearchPatron("address", e.target.value)}} />
                        </VStack>
                    </VStack>
                </ModalBody>
                <ModalFooter justifyContent={"space-between"}>
                    <Button colorScheme={"danger"} onClick={() => {
                        setSearchPatron("firstName", "");
                        setSearchPatron("middleName", "");
                        setSearchPatron("lastName", "");
                        setSearchPatron("sex", "");
                        setSearchPatron("address", "");
                    }}>
                        Очистить
                    </Button>
                    <HStack gap={"$3"}>
                        <Button onClick={() => {
                            search();
                            props.onClose();
                            setSearchPatron("firstName", "");
                            setSearchPatron("middleName", "");
                            setSearchPatron("lastName", "");
                            setSearchPatron("sex", "");
                            setSearchPatron("address", "");
                        }}>
                            Поиск
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

