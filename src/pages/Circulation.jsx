import { Button, HStack, Heading, Input, SimpleOption, SimpleSelect, Text, VStack, createDisclosure } from "@hope-ui/solid";
import { 
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@hope-ui/solid";
import { createStore } from "solid-js/store";

export default function Circulation() {

    const { isOpen: isPatronModalOpen, onOpen: onPatronModalOpen, onClose: onPatronModalClose } = createDisclosure();
    const { isOpen: isItemModalOpen, onOpen: onItemModalOpen, onClose: onItemModalClose } = createDisclosure();

    const [patronSearchOptions, setPatronSearchOptions] = createStore({
        name: "Имя", 
        value: "", 
    });

    const [itemSearchOptions, setItemSearchOptions] = createStore({
        name: "Название", 
        value: "", 
    });

    return (
        <VStack flexGrow={"1"} w={"$full"} alignItems={"start"}>
            <Modal opened={isPatronModalOpen()} onClose={onPatronModalClose} size={"3xl"}>
                <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    Патрон
                </ModalHeader>
                <ModalBody>
                    <HStack w={"$full"} gap={"$3"} mb={"$3"}>
                        <Input />
                        <SimpleSelect defaultValue={"NAME"}>
                            <SimpleOption value={"NAME"}>
                                Имя
                            </SimpleOption>
                            <SimpleOption value={"STUDENT_NUMBER"}>
                                Студенческий номер
                            </SimpleOption>
                        </SimpleSelect>
                    </HStack>
                    <VStack w={"$full"} gap={"$1"}>
                        <HStack w={"$full"} cursor={"default"}>
                            Amir
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onPatronModalClose}>Закрыть</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal opened={isItemModalOpen()} onClose={onItemModalClose} size={"3xl"}>
                <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    Патрон
                </ModalHeader>
                <ModalBody>
                    <HStack w={"$full"} gap={"$3"} mb={"$3"}>
                        <Input />
                        <SimpleSelect defaultValue={"NAME"}>
                            <SimpleOption value={"NAME"}>
                                Название
                            </SimpleOption>
                            <SimpleOption value={"STUDENT_NUMBER"}>
                                Номер предмета
                            </SimpleOption>
                        </SimpleSelect>
                    </HStack>
                    <VStack w={"$full"} gap={"$1"}>
                        <HStack w={"$full"} cursor={"default"}>
                            Title
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onItemModalClose}>Закрыть</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            <Heading size={"2xl"} p={"$3"}>
                Обращение
            </Heading>
            <HStack w={"$full"} p={"$3"} pt={"0"} gap={"$3"}>
                <VStack w={"50%"} backgroundColor={"white"} borderRadius={"$sm"}>
                    <Text fontSize={"$lg"} fontWeight={"$medium"} w={"$full"} p={"$3"} borderBottomWidth={"2px"}>
                        Имя, фамилия
                    </Text>
                    <HStack w={"$full"} justifyContent={"end"} p={"$3"}>
                        <Button justifySelf={"end"} variant={"ghost"} onClick={onPatronModalOpen}>
                            Поиск
                        </Button>
                    </HStack>
                </VStack>
                <VStack w={"50%"} backgroundColor={"white"} borderRadius={"$sm"}>
                    <Text fontSize={"$lg"} fontWeight={"$medium"} w={"$full"} p={"$3"} borderBottomWidth={"2px"}>
                        Название
                    </Text>
                    <HStack w={"$full"} justifyContent={"end"} p={"$3"}>
                        <Button justifySelf={"end"} variant={"ghost"} onClick={onItemModalOpen}>
                            Поиск
                        </Button>
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    )
}
