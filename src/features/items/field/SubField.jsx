import { Button, HStack, Heading, IconButton, Input, Text, Textarea, createDisclosure } from "@hope-ui/solid";
import { TbCopy, TbCopyOff } from "solid-icons/tb";
import { FiEdit } from 'solid-icons/fi'
import { Match, Show, Switch, useContext } from "solid-js";
import { CurrentBookContext } from "../../../providers/CurrentBook";

function SubField(props) {

    const { editingStore, handleInput, currentBook } = useContext(CurrentBookContext);

    return (
        <HStack w={"$full"} gap={"$1_5"} alignItems="center">
            <Text>{props.number}</Text>
            <Heading fontWeight={"$normal"} flexShrink={"0"}>{props.name}</Heading>
            <Switch>
                <Match when={props.isTextarea}>
                    <Textarea id={props.fullName} onInput={(event) => handleInput(event)} name={props.fullName} value={currentBook["updated"]["fields"]?.[props.fullName] ?? ""} />
                </Match>
                <Match when={!props.isTextarea}>
                    <Input disabled={editingStore.isLocked || (props.fullName == "001-000" ? editingStore.isCurrentNew : false)} id={props.fullName} value={currentBook["updated"]["fields"]?.[props.fullName] ?? ""} onInput={(event) => handleInput(event)} name={props.fullName} size={"xs"}></Input>
                </Match>
            </Switch>
            <Show when={props.required}>
                <Text color={"$danger11"} fontSize={"sm"} whiteSpace={"nowrap"}>Обязательное поле</Text>
            </Show>
            <IconButton tabIndex={"-1"} onClick={() => {}} display={props.editable ? "block" : "none"} size={"xs"} variant={"ghost"}>
                <FiEdit />
            </IconButton>
            <Show when={props.repeatable}>
                <HStack gap={"$1_5"}>
                    <IconButton tabIndex={"-1"} size={"xs"} variant={"ghost"}>
                        <TbCopy />
                    </IconButton>
                    <IconButton tabIndex={"-1"} size={"xs"} variant={"ghost"}>
                        <TbCopyOff />
                    </IconButton>
                </HStack>
            </Show>
        </HStack>    
    );
}

export default SubField;


