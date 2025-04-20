import { Box, Flex } from "@hope-ui/solid";
import Navbar from "./features/Navbar";
import Header from "./features/Header";
import AppRouter from "./router";

export default function ELibApp({ role }) {
  return (
    <Flex h="$screenH" w="$screenW" bgColor={"$blackAlpha4"}>
      <Box flex="1" display="flex" flexDirection="column">
        <Header />
        <Box flexGrow="1">
          <AppRouter />
        </Box>
      </Box>

      <Box w="250px" h="100%" position="relative" zIndex="10">
        <Navbar role={role} />
      </Box>
    </Flex>
  );
}


