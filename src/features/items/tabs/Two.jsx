import {
  VStack,
  Heading,
  Text,
  Box,
  SimpleGrid,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Select,
  SelectTrigger,
  SelectPlaceholder,
  SelectValue,
  SelectIcon,
  SelectContent, SelectListbox, SelectOption, SelectOptionText, SelectLabel, Alert, AlertIcon
} from "@hope-ui/solid";
import {createEffect, createSignal, For, useContext} from "solid-js";
import { HiOutlineBell } from "solid-icons/hi";
import {CurrentBookContext} from "../../../providers/CurrentBook";
import {CurrentPatronContext} from "../../../providers/CurrentPatron";
import {SearchableSelect} from "../../SearchableSelect";
import {createIssue} from "../../../hooks/useFetch";

const initialData = [

];

export default function two() {

  const { store: bookStore, loadIssuesToBorrow } = useContext(CurrentBookContext);
  const [currentPatronState, {store: readerStore}] = useContext(CurrentPatronContext);

  const [errorMessage, setErrorMessage] = createSignal("");

  const [entries, setEntries] = createSignal(
    initialData.map((entry, i) => ({
      ...entry,
      invNumber: String(i + 1).padStart(3, "0"),
    }))
  );

  const formatDate = (val) => {
    const date = new Date(val);
    return isNaN(date) ? "Неверная дата" : date.toLocaleDateString("ru-RU");
  };

  const handleCreateIssue = async () => {
    setErrorMessage("");
    const response = await createIssue(selectedBook()["value"], selectedReader()["value"]);
    const responseBody = await response.json();
    if (response.ok) {
      loadIssuesToBorrow();
    } else if (response.status === 400) {
      console.log(responseBody)
      setErrorMessage(responseBody["non_field_errors"][0]);
    } else {
      console.log("ERROR: " + responseBody)
    }
  };

  const [selectedBook, setSelectedBook] = createSignal(0);
  const [selectedReader, setSelectedReader] = createSignal(0);

  const [bookOptions, setBookOptions] = createSignal([]);
  createEffect(() => {
    const books = bookStore["books"];
    const options = books.map(book => {
      const author = book["authors"][0];
      return {
        label: `${book["title"]}, ${author["first_name"][0]}. ${author["last_name"]}`,
        value: book["id"]
      };
    });
    setBookOptions(options);
  });

  const[readerOptions, setReaderOptions] = createSignal([]);
  createEffect(() => {
    const readers = readerStore["readers"];
    const options = readers.map(reader => {
      return {
        label: `${reader["last_name"]} ${reader["first_name"]} [${reader["username"]}]`,
        value: reader["id"]
      };
    });
    setReaderOptions(options);
  })

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Box w="$full" p="$5" bg="white" borderRadius="$md" boxShadow="$sm">
        <Heading size="md" mb="$4">Добавить новую запись</Heading>
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="$4">
          <Box>
            <Text mb="$2" fontSize="sm">Книга</Text>
            <SearchableSelect
                options={bookOptions()}
                value={selectedBook()}
                onChange={setSelectedBook}
                placeholder="Выберите книгу"
            />
          </Box>
          <Box>
            <Text mb="$2" fontSize="sm">Читатель</Text>
            <SearchableSelect
                options={readerOptions()}
                value={selectedReader()}
                onChange={setSelectedReader}
                placeholder="Выберите читателя"
            />
          </Box>
        </SimpleGrid>
        <Button
            mt="$4"
            colorScheme="accent"
            onClick={handleCreateIssue}
            disabled={selectedBook() === 0 || selectedReader() === 0}
        >
          Добавить запись
        </Button>
        {errorMessage()?.trim() !== "" && (
            <Alert status="danger" variant="subtle" mt="$2" borderRadius="$md">
              <AlertIcon />
              {errorMessage()}
            </Alert>
        )}
      </Box>

      <Box w="$md">
        <Table
            variant="striped"
            w="100%"
            style={{
              tableLayout: "auto",
              minWidth: "fit-content",
            }}
        >
          <Thead>
            <Tr>
              <Th>Книга</Th>
              <Th>Читатель</Th>
              <Th>Дата выдачи</Th>
              <Th>Срок возврата</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookStore["issuesToBorrow"]?.filter(issue => issue["inventory"]["status"] === "borrowed")?.map((issue) => (
              <Tr key={issue["id"]}>
                <Td>{issue["inventory"]["book"]["title"]}</Td>
                <Td>{issue["reader"]["last_name"] + " " + issue["reader"]["first_name"]}</Td>
                <Td>{issue["issue_date"]}</Td>
                <Td>{issue["due_date"]}</Td>
                <Td>

                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}

