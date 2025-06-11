import { Text, VStack } from "@hope-ui/solid";
import { useContext } from "solid-js";
import { CurrentPatronContext } from "../../providers/CurrentPatron";
import useOpen from "../../hooks/useOpen";

export default function SearchResult(props) {

    const [state, { currentReader, handleSelectReader }] = useContext(CurrentPatronContext);
    const { openPatronTab } = useOpen();

    return (
        <VStack
            backgroundColor={props["reader"]["id"] === currentReader["id"] ? "$blackAlpha5" : "transparent"}
            w="$full" alignItems={"start"} p="$3"
            _hover={{backgroundColor: "$blackAlpha5"}}
            onClick={() => {
                handleSelectReader(props["reader"]);
            }}
        >
            <Text fontSize="12px">
                {props["reader"]["last_name"] + " " + props["reader"]["first_name"]}
            </Text>
            <Text>
                {}
            </Text>
        </VStack>
    );
}