import {Button, HStack, Heading, IconButton, Text} from "@hope-ui/solid";
import { FaSolidLock, FaSolidLockOpen, FaSolidPlus } from "solid-icons/fa";
import {Match, Show, Switch, useContext} from "solid-js";
import { ItemEditingContext } from "../../providers/ItemEditingProvider";
import { CurrentBookContext } from "../../providers/CurrentBook";
import useOpen from "../../hooks/useOpen";
import {CurrentPageContext} from "../../providers/CurrentPageProvider";

export default function Header() {

    const { editingStore, handleSave, areFieldsValid, setLocked, handleNewBookSelect, revert } = useContext(CurrentBookContext);
    const [state] = useContext(CurrentPageContext);
    const { open, openPatronTab } = useOpen();

    return (
        <HStack justifyContent={"space-between"} w={"$full"} height={"40px"}>
            <Heading size={"2xl"}>
                Управление книгами
            </Heading>
            <HStack gap={"$3"}>
                <Show when={state.currentItemTab === "1"}>
                    <Button
                        colorScheme={"success"}
                        onClick={handleSave}
                        disabled={!areFieldsValid() || editingStore["isLocked"]}
                    >
                        Сохранить
                    </Button>
                <IconButton onClick={() => setLocked(!editingStore.isLocked)} backgroundColor={"$accent11"} icon={ editingStore.isLocked ?  <FaSolidLock /> : <FaSolidLockOpen /> } />
                <IconButton
                    backgroundColor={"$accent11"} disabled={editingStore.isLocked} icon={<FaSolidPlus />}
                    onClick={handleNewBookSelect}
                />
                </Show>
            </HStack>
        </HStack>
    )
}
