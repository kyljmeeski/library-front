import {Button, HStack, VStack} from "@hope-ui/solid";
import {useContext} from "solid-js";
import {Outlet} from "@solidjs/router";
import useOpen from "../../hooks/useOpen";
import {CurrentPageContext} from "../../providers/CurrentPageProvider";

export default function PatronCard() {
    const [state, {setCurrentPatronTab}] = useContext(CurrentPageContext);
    const { openPatronTab } = useOpen();

    const buttonStyles = {
        px: "$8", py: "$2", borderRadius: "0", _hover: { backgroundColor: "$accent11", color: "white" }, _active: { backgroundColor: "$accent11", color: "white" }
    };

    return (
        <VStack w={"$full"} h={"calc(100vh - 32px - 40px - 0.75rem * 5)"} gap={"$3"}>
            <VStack w={"$full"} backgroundColor={"white"}>
                <HStack justifyContent={"start"} w={"$full"}>
                    {["personal", "statistics"].map(tab => (
                        <Button
                            tabIndex={"-1"}
                            onClick={() => {
                                openPatronTab(tab);
                                setCurrentPatronTab(tab);
                            }}
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
    );
}



