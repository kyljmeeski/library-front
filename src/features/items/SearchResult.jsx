import { Text, VStack } from "@hope-ui/solid";
import { useContext } from "solid-js";
import { CurrentBookContext } from "../../providers/CurrentBook";

export default function SearchResult(props) {

    const { selectBook, currentBook } = useContext(CurrentBookContext);

    return (
        <VStack
            backgroundColor={currentBook["id"] === props.book["id"] ? "$blackAlpha5" : "transparent"}
            onClick={() => selectBook(props.book)}
            w="$full" alignItems={"start"} p="$3" _hover={{backgroundColor: "$blackAlpha5"}}
        >
            <Text fontSize={"12px"}>
                {props.book["title"]}
            </Text>
        </VStack>
    )
}