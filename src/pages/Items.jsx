import { HStack, VStack } from "@hope-ui/solid";
import Header from "../features/items/Header";
import Sidebar from "../features/items/Sidebar";
import ItemCard from "../features/items/ItemCard";
import { Match, Switch, onMount, useContext } from "solid-js";
import { CurrentBookContext } from "../providers/CurrentBook";
import ItemPageIntro from "../features/items/itemsPageIntro/ItemPageIntro";

export default function Items() {

    const { fetchBooks } = useContext(CurrentBookContext);
    const { editingStore, setBookSelected } = useContext(CurrentBookContext);

    onMount(() => {
        fetchBooks();
    })

    return (
        <VStack alignItems={"start"} p={"$3"} h={"$full"} gap={"$3"}>
            <Header />
            <HStack w={"$full"} flexGrow={"1"} gap={"$3"} fontSize={"14px"}>
                <Sidebar />
                <VStack flex={"1"} h="$full">
                    <Switch>
                        <Match when={editingStore.isBookSelected}>
                            <ItemCard />
                        </Match>
                        <Match when={!editingStore.isBookSelected}>
                            <ItemPageIntro />
                        </Match>
                    </Switch>
                </VStack>
            </HStack>
        </VStack>
    )
}