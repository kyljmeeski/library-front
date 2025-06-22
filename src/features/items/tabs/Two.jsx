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
  SelectContent, SelectListbox, SelectOption, SelectOptionText, SelectLabel, Alert, AlertIcon, HStack, Stack
} from "@hope-ui/solid";
import {createEffect, createSignal, For, useContext} from "solid-js";
import { HiOutlineBell } from "solid-icons/hi";
import {CurrentBookContext} from "../../../providers/CurrentBook";
import {CurrentPatronContext} from "../../../providers/CurrentPatron";
import {SearchableSelect} from "../../SearchableSelect";
import {createIssue, getBookInfoToIssue} from "../../../hooks/useFetch";
import DateSelector from "../../DateSelector";
import {createStore} from "solid-js/store";

const initialData = [

];

export default function two() {

  const { store: bookStore, loadBorrowedIssues } = useContext(CurrentBookContext);
  const [currentPatronState, {store: readerStore}] = useContext(CurrentPatronContext);

  const [successMessage, setSuccessMessage] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");

  const handleCreateIssue = async () => {
    setErrorMessage("");
    const response = await createIssue(selectedBook()["value"], selectedReader()["value"], dueDate());
    const responseBody = await response.json();
    if (response.ok) {
      loadBorrowedIssues();
      setSuccessMessage("Книга успешно выдана!");
      setTimeout(() => setSuccessMessage(""), 3000);
      // очищаем поля, когда выдали книгу
      setSelectedBook(0);
      setSelectedReader(0);
      setDueDate("");
      setBookInfo("description", "");
      setBookInfo("overall", 0);
      setBookInfo("borrowed", 0);
      setBookInfo("available", 0);
    } else if (response.status === 400) {
      console.log(responseBody)
      setErrorMessage(responseBody["non_field_errors"][0]);
    } else {
      console.log("ERROR: " + responseBody)
    }
  };

  const [selectedBook, setSelectedBook] = createSignal(0);
  const [selectedReader, setSelectedReader] = createSignal(0);
  const [dueDate, setDueDate] = createSignal("");

  const selectBook = async (selected) => {
    const bookId = selected["value"];
    const bookInfo = await getBookInfoToIssue(bookId);
    setBookInfo("overall", bookInfo["overall"]);
    setBookInfo("borrowed", bookInfo["borrowed"]);
    setBookInfo("available", bookInfo["available"]);
    setBookInfo("description", bookInfo["description"]);
    setSelectedBook(selected);
  };

  const [bookInfo, setBookInfo] = createStore({
    "overall": 0,
    "borrowed": 0,
    "available": 0,
    "description": "",
  });

  const addDaysToToday = (days) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10); // YYYY-MM-DD format for <input type="date">
  }

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
      <Heading size="lg" color="$accent11">Выдача книг</Heading>
      <VStack w="$full" gap="$4" alignItems="start">
        <Box w="$full">
          <Text mb="$2" fontSize="sm">Книга</Text>
          <SearchableSelect
              options={bookOptions()}
              value={selectedBook()}
              onChange={selectBook}
              placeholder="Выберите книгу"
          />
          <Text mt="$2" fontSize="sm">
            Всего {bookInfo["overall"]} экз. •
            На руках: {bookInfo["borrowed"]} экз. •
            Осталось: {bookInfo["available"]} экз.
            {bookInfo["description"] ? " | " + bookInfo["description"] : ""}
          </Text>
        </Box>
        <Box w="$full">
          <Text mb="$2" fontSize="sm">Читатель</Text>
          <SearchableSelect
              options={readerOptions()}
              value={selectedReader()}
              onChange={setSelectedReader}
              placeholder="Выберите читателя"
          />
        </Box>
        <Box w="$full">
          <Text mb="$2" fontSize="sm">Дата возврата</Text>
          <Stack gap="$3">
            <DateSelector
                name="publish_date"
                value={dueDate}
                setValue={(val) => setDueDate(val)}
            />
            <HStack gap="$3">
              <Button onClick={() => setDueDate(addDaysToToday(1))}>1 день</Button>
              <Button onClick={() => setDueDate(addDaysToToday(3))}>3 дня</Button>
              <Button onClick={() => setDueDate(addDaysToToday(7))}>1 неделя</Button>
              <Button onClick={() => setDueDate(addDaysToToday(20))}>1 месяц</Button>
            </HStack>
          </Stack>
        </Box>
        <HStack w="$full" justifyContent="space-between" alignItems="end">
          <Button
              colorScheme="accent"
              onClick={handleCreateIssue}
              disabled={selectedBook() === 0 || selectedReader() === 0 || !dueDate()}
          >
            Выдать
          </Button>
          {errorMessage()?.trim() !== "" && (
              <Alert status="danger" variant="subtle" borderRadius="$md">
                <AlertIcon />
                {errorMessage()}
              </Alert>
          )}
          {successMessage() && (
              <Alert status="success">
                <AlertIcon />
                {successMessage()}
              </Alert>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}

