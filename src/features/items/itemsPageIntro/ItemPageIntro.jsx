import { HStack, Heading, VStack } from "@hope-ui/solid";
import ActionCard from "../../patrons/patronPageIntro/ActionCard";
import { useContext } from "solid-js";
import { CurrentBookContext } from "../../../providers/CurrentBook";
import useOpen from "../../../hooks/useOpen";

export default function ItemPageIntro() {

    const { setBookSelected, createNewBook } = useContext(CurrentBookContext);
    const { open, openPatronTab } = useOpen();
    
    return (
        <VStack w={"$full"} h={"calc(100vh - 32px - 40px - 0.75rem * 5)"} overflowY={"auto"} backgroundColor={"white"} p={"$3"} gap={"$3"}>
            <Heading size={"2xl"}>
                Управление вашими книгами
            </Heading>
            <Heading size={"lg"} fontWeight={"$normal"}>
                Что вы хотите сделать?
            </Heading>
            <HStack w={"$full"} gap={"$6"} justifyContent={"center"}>
                <ActionCard title="Добавить книги" onClick={() => {open("/items"); openPatronTab("0"); setBookSelected(true); createNewBook()}}/>
                <ActionCard title="Поиск книг"/>
            </HStack>
            {/* <PatronSearchModal isOpen={isOpen} onClose={onClose}/> */}
        </VStack>
    )
}
