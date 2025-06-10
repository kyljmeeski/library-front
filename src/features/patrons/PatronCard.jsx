import {Button, HStack, VStack} from "@hope-ui/solid";
import {useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import useOpen from "../../hooks/useOpen";
import {CurrentPageContext} from "../../providers/CurrentPageProvider";

export default function PatronCard() {
    const [state] = useContext(CurrentPageContext);
    const { openPatronTab } = useOpen();

    const buttonStyles = {
        px: "$8", py: "$2", borderRadius: "xl", _hover: { backgroundColor: "$accent11", color: "white" }, _active: { backgroundColor: "$accent11", color: "white" }
    };

    return (
        <VStack w={"$full"} h={"calc(100vh - 32px - 40px - 0.75rem * 5)"} gap={"$3"}>
            <VStack w={"$full"} backgroundColor={"white"} flexGrow={"1"} h={"calc(100vh - 32px - 40px * 3 - 224px - 0.75rem * 3)"} overflowY={"auto"}>
                <HStack justifyContent={"start"} w={"$full"}>
                    {["personal", "access", "notes", "statistics"].map(tab => (
                        <Button
                            tabIndex={"-1"}
                            onClick={() => openPatronTab(tab)}
                            color={state.currentPatronTab === tab ? "white" : "$blackAlpha11"}
                            backgroundColor={state.currentPatronTab === tab ? "$accent11" : "transparent"}
                            {...buttonStyles}
                        >
                            {tab === "personal" ? "Личные данные" :
                             tab === "access" ? "Доступ" :
                             tab === "notes" ? "Заметки" : "Статистика"}
                        </Button>
                    ))}
                </HStack>
                <Outlet />
            </VStack>
        </VStack>
    );
}



