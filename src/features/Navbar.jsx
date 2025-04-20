import { Button, Heading, Stack, VStack } from "@hope-ui/solid";
import useOpen from "../hooks/useOpen";
import { useContext } from "solid-js";
import { CurrentPageContext } from "../providers/CurrentPageProvider";

export default function Navbar() {
    const { open } = useOpen();
    const [state] = useContext(CurrentPageContext);

    return (
        <Stack
            h="$full"
            w="250px"
            bgColor="#F4F6F8" 
            borderLeft="1px solid #E0E0E0"
            direction="column"
            gap="$2"
            position="fixed"
            right={0}
            top={0}
            zIndex={10}
            p="$4"
        >
            <Heading
                h="$12"
                color="#333"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                w="$full"
                size="xl"
                fontWeight="$semibold"
                fontSize="$xl"
            >
                E-Lib
            </Heading>

            <VStack alignItems="flex-start" spacing="$1" mt="$2" w="$full">
                <Button
                    fullWidth
                    justifyContent="flex-start"
                    borderRadius="$md"
                    variant="ghost"
                    fontWeight="$medium"
                    color="#111"
                    bgColor={state.currentPage === "/items" ? "#E5E9EC" : "transparent"}
                    _hover={{ bgColor: "#E5E9EC" }}
                    onClick={() => open("/items")}
                >
                    📚 Книги
                </Button>
                <Button
                    fullWidth
                    justifyContent="flex-start"
                    borderRadius="$md"
                    variant="ghost"
                    fontWeight="$medium"
                    color="#111"
                    bgColor={state.currentPage === "/patrons" ? "#E5E9EC" : "transparent"}
                    _hover={{ bgColor: "#E5E9EC" }}
                    onClick={() => open("/patrons")}
                >
                    👤 Читатели
                </Button>
            </VStack>
        </Stack>
    );
}


