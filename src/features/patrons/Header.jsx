import {Button, Heading, HStack, IconButton} from "@hope-ui/solid";
import {Show, useContext} from "solid-js";
import {PatronEditingContext} from "../../providers/PatronEditingProvider";
import {FaSolidLock, FaSolidLockOpen, FaSolidPlus} from "solid-icons/fa";
import useOpen from "../../hooks/useOpen";
import {CurrentPatronContext} from "../../providers/CurrentPatron";
import {CurrentPageContext} from "../../providers/CurrentPageProvider";

export default function Header() {

    const [patronEditingState, {setLocked, setPatronSelected, setEditing}] = useContext(PatronEditingContext);
    const [currentPageState, {setCurrentPatronTab}] = useContext(CurrentPageContext);

    const {open, openPatronTab} = useOpen();

    const [currentPatronState, {handleSave, areFieldsValid, handleNewBookSelect}] = useContext(CurrentPatronContext);

    return (
        <HStack justifyContent={"space-between"} w={"$full"}>
            <Heading size={"2xl"}>
                Управление читателями
            </Heading>
            <HStack gap={"$3"} h={"40px"}>
                <Show when={currentPageState["currentPatronTab"]?.trim() === "personal"}>
                    <Button
                        display={currentPageState["currentPatronTab"]?.trim() === "personal" ? "block" : "none"}
                        colorScheme={"success"}
                        disabled={!areFieldsValid() || patronEditingState["isLocked"]}
                        onClick={handleSave}
                    >
                        Сохранить
                    </Button>
                    <IconButton
                                onClick={() => setLocked(!patronEditingState.isLocked)} backgroundColor={"$accent11"}
                                icon={patronEditingState.isLocked ? <FaSolidLock/> : <FaSolidLockOpen/>}/>
                    <IconButton
                                backgroundColor={"$accent11"}
                                icon={<FaSolidPlus/>}
                                onClick={handleNewBookSelect}
                    />
                </Show>
            </HStack>
        </HStack>
    )
}
