import { HStack, Heading, IconButton, Input, Text, VStack } from "@hope-ui/solid";
import { TbCopy, TbCopyOff } from 'solid-icons/tb'
import { Show, useContext } from "solid-js";
import { CurrentBookContext } from "../../../providers/CurrentBook";

 function Field(props) {

    const { handleInput, currentBook } = useContext(CurrentBookContext);

    return (
        <VStack w={"$full"} gap={"$2"} borderBottomWidth={"1px"}borderBottomColor={"$blackAlpha5"} py={"$3"}>
            <HStack w={"$full"} gap={"$1_5"}>
                <Heading>
                    {props.number}
                </Heading>
                <Text color={"$accent11"}> ?</Text>
                <Show when={props.hasIndicators}>
                    <Input value={currentBook["updated"]["fields"]?.["ind1-" + props.number] ?? ""} id={"ind1-" + props.number} maxLength={"1"} textAlign={"center"} onInput={(event) => handleInput(event)} name={"ind1-" + props.number} size={"xs"} w={"25px"} px={"$1"} justifyContent={"center"} display={"flex"}></Input>
                    <Input value={currentBook["updated"]["fields"]?.["ind2-" + props.number] ?? ""} id={"ind2-" + props.number} maxLength={"1"} textAlign={"center"} onInput={(event) => handleInput(event)} name={"ind2-" + props.number} size={"xs"} w={"25px"} px={"$1"} justifyContent={"center"} display={"flex"}></Input>
                </Show>
                
                <Heading color={"$accent11"}>
                    {props.name}
                </Heading>
                <IconButton tabIndex={"-1"} display={props.copiable ? "block" : "none"} size={"xs"} variant={"ghost"}>
                    <TbCopy />
                </IconButton>
                <IconButton tabIndex={"-1"} display={props.removable ? "block" : "none"} size={"xs"} variant={"ghost"}>
                    <TbCopyOff />
                </IconButton>
                
            </HStack>
            {props.children}
        </VStack>
    );
}
    export default Field;