import { Button, HStack, VStack } from "@hope-ui/solid";
import { useContext } from "solid-js";
import { CurrentPageContext } from "../../providers/CurrentPageProvider";
import useOpen from "../../hooks/useOpen";
import { Outlet } from "@solidjs/router";
import { CurrentBookContext } from "../../providers/CurrentBook";

export default function ItemCard() {

    const [state] = useContext(CurrentPageContext);
    const { openItemTab } = useOpen();

    return (
        <VStack w={"$full"} h={"$full"} gap={"$3"}>
            <VStack w={"$full"} backgroundColor={"white"}>
                <HStack justifyContent={"start"} w={"$full"}>
                    <Button
                        onClick={() => openItemTab("0")} 
                        px={"$8"} py={"$2"} _hover={{backgroundColor: "$accent11", color: "white"}} 
                        borderRadius={"0"} 
                        color={state.currentItemTab == "0" ? "white" : "$blackAlpha11"} 
                        backgroundColor={state.currentItemTab == "0" ? "$accent11" : "transparent"}
                    >
                        Статистика
                    </Button>
                    <Button
                        onClick={() => openItemTab("1")} 
                        px={"$8"} py={"$2"} _hover={{backgroundColor: "$accent11", color: "white"}} 
                        borderRadius={"0"} 
                        color={state.currentItemTab == "1" ? "white" : "$blackAlpha11"} 
                        backgroundColor={state.currentItemTab == "1" ? "$accent11" : "transparent"}
                    >
                        Каталогизация
                    </Button>
                    <Button
                        onClick={() => openItemTab("2")} 
                        px={"$8"} py={"$2"} _hover={{backgroundColor: "$accent11", color: "white"}} 
                        borderRadius={"0"} 
                        color={state.currentItemTab == "2" ? "white" : "$blackAlpha11"} 
                        backgroundColor={state.currentItemTab == "2" ? "$accent11" : "transparent"}
                    >
                        Выдача книг
                    </Button>
                </HStack>
            </VStack>
            <VStack 
                w={"$full"} 
                backgroundColor={"white"} 
                overflow={"auto"}
                h={"calc(100vh - 32px - 40px * 2 - 0.75rem * 6)"} 
            >
                <Outlet />
            </VStack>
        </VStack>
    )
}
