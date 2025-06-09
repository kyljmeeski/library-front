import {HStack, IconButton, Input, SimpleOption, SimpleSelect, Text, VStack} from "@hope-ui/solid";
import {AiOutlineSortAscending, AiOutlineSortDescending} from "solid-icons/ai";
import {For, onMount, Show, useContext} from "solid-js";
import {ItemEditingContext} from "../../providers/ItemEditingProvider";
import SearchResult from "./SearchResult";
import {CurrentBookContext} from "../../providers/CurrentBook";

export default function Sidebar() {

    onMount(() => {
        loadBooks();
    })

    const [state, { setASC }] = useContext(ItemEditingContext);
    const { store, loadBooks } = useContext(CurrentBookContext);

    return (
        <VStack w="300px" h="$full" gap={"$3"}>
            <HStack w={"$full"}>
                <SimpleSelect backgroundColor={"white"} defaultValue={"title"} fontSize={"14px"} flexBasis={"40%"} borderTopRightRadius={"0"} borderBottomRightRadius={"0"}>
                    <SimpleOption value={"title"}>
                        Название
                    </SimpleOption>
                    <SimpleOption value={"author"}>
                        Автор
                    </SimpleOption>
                </SimpleSelect>
                <Input backgroundColor={"white"} fontSize={"14px"} flexBasis={"60%"} borderTopLeftRadius={"0"} borderBottomLeftRadius={"0"} />
            </HStack>
            <VStack w={"$full"} flexGrow={"1"}>
                <HStack w={"$full"} backgroundColor={"$accent11"}>
                    <SimpleSelect defaultValue={"modifiedDate"} border={"0"} color={"white"} borderRadius={"0"}>
                        <SimpleOption value="modifiedDate">
                            Дата изменения
                        </SimpleOption>
                    </SimpleSelect>
                    <IconButton borderRadius={"0"} onClick={() => setASC(!state.isASC)} background={"none"} _hover={{background: "none"}}>
                        { state.isASC ? <AiOutlineSortAscending /> : <AiOutlineSortDescending /> }
                    </IconButton>
                </HStack>
                <VStack 
                    w={"$full"} 
                    flexGrow={"1"} 
                    backgroundColor={"white"} 
                    overflow={"auto"} 
                    h="calc(100vh - 32px - 40px * 3 - 0.75rem * 6)"
                >
                <Show when={store.books.length === 0}>
                    <Text w={"$full"} p={"$3"} color={"$blackAlpha10"}>
                        Результатов нет.
                    </Text>
                </Show>
                <For each={store.books}>{(book) =>
                    <SearchResult book={book} />
                }</For>
                </VStack>
            </VStack>
        </VStack>
    )
}
