import { Button, HStack, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack } from "@hope-ui/solid";
import ActionCard from "./ActionCard";
import { useContext } from "solid-js";
import { PatronEditingContext } from "../../../providers/PatronEditingProvider";
import useOpen from "../../../hooks/useOpen";
import PatronSearchModal from "../patronSearch/PatronSearchModal";
import { ModalContext } from "../../../providers/ModalProvider";

export default function PatronPageIntro() {

    const [state, { setPatronSelected, setEditing }] = useContext(PatronEditingContext);
    const { open, openPatronTab } = useOpen();

    const [{ isOpen, onOpen, onClose }] = useContext(ModalContext);

    return (
        <VStack w={"$full"} h={"calc(100vh - 32px - 40px - 0.75rem * 5)"} overflowY={"auto"} backgroundColor={"white"} p={"$3"} gap={"$3"}>
            <Heading size={"2xl"}>
                Управление читателями
            </Heading>
            <Heading size={"lg"} fontWeight={"$normal"}>
                Что вы хотите сделать?
            </Heading>
            <HStack w={"$full"} gap={"$6"} justifyContent={"center"}>
                <ActionCard title="Добавить читателя" onClick={() => { open("/patrons"); openPatronTab("personal"); setPatronSelected(true); setEditing(true) }} />
                <ActionCard title="Найти читателя" onClick={() => { onOpen() }} />
            </HStack>
            <PatronSearchModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    )
}
