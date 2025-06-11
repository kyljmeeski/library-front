import {Alert, AlertIcon, Box, Button, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, VStack} from "@hope-ui/solid";
import {createSignal, useContext} from "solid-js";
import {CurrentBookContext} from "../../../providers/CurrentBook";
import {CurrentPatronContext} from "../../../providers/CurrentPatron";
import {createReturn} from "../../../hooks/useFetch";

export default function Statistics() {

    const {store: bookStore, loadBorrowedIssues, loadReturns} = useContext(CurrentBookContext);
    const [state, {currentReader}] = useContext(CurrentPatronContext);

    const [successMessage, setSuccessMessage] = createSignal("");
    const [errorMessage, setErrorMessage] = createSignal("");

    // TODO: ровно это же есть и в "Возврат книги" на странице книг
    const handleReturnBook = async (issueId) => {
        setErrorMessage("");
        const response = await createReturn(issueId);
        if (response.ok) {
            setSuccessMessage("Книга успешно возвращена!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } else {
            setErrorMessage(await response.json());
        }
        loadBorrowedIssues();
        loadReturns();
    };


    return (
        <VStack alignItems="start" w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"} px={"$7"} py={"$5"} gap={"$3"}>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading size="lg" color="$accent11">Книги на руках</Heading>
                <Box overflowX="auto">
                    <Table variant="striped" size="xs" minW="700px">
                        <Thead>
                            <Tr>
                                <Th fontSize="xs" p="$2">Книга</Th>
                                <Th fontSize="xs" p="$2">Читатель</Th>
                                <Th fontSize="xs" p="$2">Дата выдачи</Th>
                                <Th fontSize="xs" p="$2">Срок возврата</Th>
                                <Th fontSize="xs" p="$2"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {bookStore["borrowedIssues"]
                                ?.filter(
                                    issue =>
                                        issue["inventory"]["status"] === "borrowed"      // книга должна находится на руках
                                        && issue["reader"]["id"] === currentReader["id"] // и быть на руках у выбранного читателя
                                )?.length === 0 ? (
                                <Tr>
                                    <Td colSpan={8}>
                                        <Text textAlign="center" py="$6" fontSize="xs">Нет книг на возврат</Text>
                                    </Td>
                                </Tr>
                            ) : (
                                bookStore["borrowedIssues"]
                                    ?.filter(
                                        issue =>
                                            issue["inventory"]["status"] === "borrowed"      // книга должна находится на руках
                                            && issue["reader"]["id"] === currentReader["id"] // и быть на руках у выбранного читателя
                                    )
                                    .map((issue) => (
                                        <Tr key={issue["id"]}>
                                            <Td>{issue["inventory"]["book"]["title"]}</Td>
                                            <Td>{issue["reader"]["last_name"] + " " + issue["reader"]["first_name"]}</Td>
                                            <Td>{issue["issue_date"]}</Td>
                                            <Td>{issue["due_date"]}</Td>
                                            <Td p="$2">
                                                <Button
                                                    size="xs"
                                                    colorScheme="accent"
                                                    onClick={() => handleReturnBook(issue["id"])}
                                                >
                                                    Вернуть
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))
                            )}
                        </Tbody>
                    </Table>
                </Box>
                {successMessage() && (
                    <Alert status="success" mb="$4">
                        <AlertIcon/>
                        {successMessage()}
                    </Alert>
                )}

                {errorMessage()?.trim() !== "" && (
                    <Alert status="danger" variant="subtle" mt="$2" borderRadius="$md">
                        <AlertIcon/>
                        {errorMessage()}
                    </Alert>
                )}
            </VStack>
        </VStack>
    )
}