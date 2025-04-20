import { Button, HStack, Heading, IconButton } from "@hope-ui/solid";
import { useContext } from "solid-js";
import { PatronEditingContext } from "../../providers/PatronEditingProvider";
import { FaSolidLock, FaSolidLockOpen, FaSolidPlus } from "solid-icons/fa";
import useOpen from "../../hooks/useOpen";
import { CurrentPatronContext } from "../../providers/CurrentPatron";

export default function Header() {

    const [state, { setLocked, setPatronSelected, setEditing }] = useContext(PatronEditingContext);

    const { open, openPatronTab } = useOpen();

    const [ currentPatronState, { handleSave, revert, createNewPatron }] = useContext(CurrentPatronContext);

    return (
        <HStack justifyContent={"space-between"} w={"$full"}>
            <Heading size={"2xl"}>
                Управление читателями
            </Heading>
            <HStack gap={"$3"}>
                <Button display={state.isEditing ? "block" : "none"} colorScheme={"danger"} onClick={revert}>
                    Отменить 
                </Button>
                <Button display={state.isEditing ? "block" : "none"} colorScheme={"success"} disabled={!state.isReadyToSave} onClick={handleSave}>
                    Сохранить
                </Button>
                <IconButton onClick={() => setLocked(!state.isLocked)} backgroundColor={"$accent11"} icon={ state.isLocked ?  <FaSolidLock /> : <FaSolidLockOpen /> } />
                <IconButton 
                    backgroundColor={"$accent11"} 
                    icon={<FaSolidPlus />} 
                    onClick={() => {open("/patrons"); openPatronTab("personal"); createNewPatron();}}
                />
            </HStack>
        </HStack>
    )
}
