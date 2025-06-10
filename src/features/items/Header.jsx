import { Button, HStack, Heading, IconButton } from "@hope-ui/solid";
import { FaSolidLock, FaSolidLockOpen, FaSolidPlus } from "solid-icons/fa";
import { Match, Switch, useContext } from "solid-js";
import { ItemEditingContext } from "../../providers/ItemEditingProvider";
import { CurrentBookContext } from "../../providers/CurrentBook";
import useOpen from "../../hooks/useOpen";

export default function Header() {

    const { editingStore, handleSave, areFieldsValid, setLocked, setBookSelected, createNewBook, revert } = useContext(CurrentBookContext);
    const { open, openPatronTab } = useOpen();

    return (
        <HStack justifyContent={"space-between"} w={"$full"}>
            <Heading size={"2xl"}>
                Управление книгами
            </Heading>
            <HStack gap={"$3"}>
                <Button display={editingStore.isBookSelected ? "none" : "none"} colorScheme={"danger"} onClick={revert}>
                    Отменить изменения
                </Button>
                <Button
                    display={editingStore.isBookSelected ? "block" : "none"}
                    colorScheme={"success"}
                    onClick={handleSave}
                    disabled={!areFieldsValid}
                >
                    Сохранить
                </Button>
                <IconButton onClick={() => setLocked(!editingStore.isLocked)} backgroundColor={"$accent11"} icon={ editingStore.isLocked ?  <FaSolidLock /> : <FaSolidLockOpen /> } />
                <IconButton onClick={() => {open("/items"); openPatronTab("0"); setBookSelected(true); createNewBook()}} backgroundColor={"$accent11"} disabled={editingStore.isLocked} icon={<FaSolidPlus />} />
            </HStack>
        </HStack>
    )
}
