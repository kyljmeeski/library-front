import {
    VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Box, Alert, AlertIcon
  } from "@hope-ui/solid";
  import {createSignal, useContext} from "solid-js";
import {CurrentBookContext} from "../../../providers/CurrentBook";
import {createReturn} from "../../../hooks/useFetch";

  export default function Three() {

    const { store: bookStore, loadIssuesToBorrow } = useContext(CurrentBookContext);

    const [successMessage, setSuccessMessage] = createSignal("");
    const [errorMessage, setErrorMessage] = createSignal("");
  
    const handleReturnBook = async (issueId) => {
      setErrorMessage("");
      const response = await createReturn(issueId);
      if (response.ok) {
        setSuccessMessage("Книга успешно возвращена!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setErrorMessage(await response.json());
      }
      loadIssuesToBorrow();
    };
  
    return (
      <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
        <Box w="$full" maxW="100%" p="$5" bg="white" borderRadius="$md" boxShadow="$sm">
          <Heading size="sm" mb="$4">Возврат книг</Heading>
  
          {successMessage() && (
            <Alert status="success" mb="$4">
              <AlertIcon />
              {successMessage()}
            </Alert>
          )}

          {errorMessage()?.trim() !== "" && (
              <Alert status="danger" variant="subtle" mt="$2" borderRadius="$md">
                <AlertIcon />
                {errorMessage()}
              </Alert>
          )}
  
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
                {bookStore["issuesToBorrow"]?.length === 0 ? (
                  <Tr>
                    <Td colSpan={8}>
                      <Text textAlign="center" py="$6" fontSize="xs">Нет книг на возврат</Text>
                    </Td>
                  </Tr>
                ) : (
                  bookStore["issuesToBorrow"]
                    ?.filter(issue => issue["inventory"]["status"] === "borrowed")
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
        </Box>
      </VStack>
    );
  }
  
  