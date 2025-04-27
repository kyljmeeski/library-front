import {
  VStack, Heading, Text, Box, SimpleGrid, Button,
  Table, Thead, Tbody, Tr, Th, Td, Input
} from "@hope-ui/solid";
import { createSignal } from "solid-js";
import { HiOutlineBell } from "solid-icons/hi";

const initialData = [
  
];

const bookTitles = [
  "Война и мир", "1984", "Мастер и Маргарита", "Преступление и наказание",
  "Убить пересмешника", "Гордость и предубеждение", "На маяк", "451 градус по Фаренгейту"
];

const usersList = [
  "Иван Иванов", "Анна Петрова", "Дмитрий Смирнов", "Ольга Сидорова",
  "Алексей Васильев", "Мария Кузнецова", "Елена Соколова", "Петр Чернов"
];

export default function two() {
  const [entries, setEntries] = createSignal(
    initialData.map((entry, i) => ({
      ...entry,
      invNumber: String(i + 1).padStart(3, "0"),
    }))
  );

  const [book, setBook] = createSignal("");
  const [user, setUser] = createSignal("");
  const [wasSubmitted, setWasSubmitted] = createSignal(false);
  const [searchBook, setSearchBook] = createSignal("");
  const [searchUser, setSearchUser] = createSignal("");

  const formatDate = (val) => {
    const date = new Date(val);
    return isNaN(date) ? "Неверная дата" : date.toLocaleDateString("ru-RU");
  };

  const addOneMonth = (date) => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result;
  };

  const isEmpty = (val) => !val?.trim();

  const getInputBorder = (val) =>
    wasSubmitted() && isEmpty(val) ? "2px solid red" : undefined;

  const handleSaveRecord = () => {
    setWasSubmitted(true);
    if (isEmpty(book()) || isEmpty(user())) return;

    const now = new Date();
    const newRecord = {
      book: book(),
      user: user(),
      takenAt: now,
      dueDate: addOneMonth(now),
      returnedAt: null,
      invNumber: String(entries().length + 1).padStart(3, "0"),
    };

    setEntries([...entries(), newRecord]);

    setBook("");
    setUser("");
    setWasSubmitted(false);
  };

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Box w="$full" p="$5" bg="white" borderRadius="$md" boxShadow="$sm">
        <Heading size="md" mb="$4">Добавить новую запись</Heading>
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="$4">
          <Box>
            <Text mb="$2" fontSize="sm">Книга</Text>
            <Input
              placeholder="Книга"
              value={searchBook()}
              onInput={(e) => setSearchBook(e.target.value)}
              list="books-list"
              onChange={(e) => setBook(e.target.value)}
              style={{ border: getInputBorder(book()) }}
            />
            <datalist id="books-list">
              {bookTitles.filter(title => title.toLowerCase().includes(searchBook().toLowerCase()))
                .map((title) => (
                  <option value={title} key={title} />
                ))}
            </datalist>
          </Box>
          <Box>
            <Text mb="$2" fontSize="sm">Читатель</Text>
            <Input
              placeholder="Читатель"
              value={searchUser()}
              onInput={(e) => setSearchUser(e.target.value)}
              list="users-list"
              onChange={(e) => setUser(e.target.value)}
              style={{ border: getInputBorder(user()) }}
            />
            <datalist id="users-list">
              {usersList.filter(user => user.toLowerCase().includes(searchUser().toLowerCase()))
                .map((userName) => (
                  <option value={userName} key={userName} />
                ))}
            </datalist>
          </Box>
        </SimpleGrid>
        <Button mt="$4" colorScheme="accent" onClick={handleSaveRecord}>
          Добавить запись
        </Button>
      </Box>

      <Box w="$md">
        <Table variant="striped" w="100%" style={{ minWidth: "100%" }}>
          <Thead>
            <Tr>
              <Th>Инв. №</Th>
              <Th>Книга</Th>
              <Th>Читатель</Th>
              <Th>Дата выдачи</Th>
              <Th>Срок возврата</Th>
              <Th>Дата возврата</Th>
              <Th>Статус</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {entries().map((entry) => (
              <Tr key={entry.invNumber}>
                <Td>{entry.invNumber}</Td>
                <Td>{entry.book}</Td>
                <Td>{entry.user}</Td>
                <Td>{formatDate(entry.takenAt)}</Td>
                <Td>{formatDate(entry.dueDate)}</Td>
                <Td>{entry.returnedAt ? formatDate(entry.returnedAt) : "-"}</Td>
                <Td>
                  <StatusTag
                    returnedAt={entry.returnedAt}
                    dueDate={entry.dueDate}
                  />
                </Td>
                <Td>
                  {!entry.returnedAt && (
                    <Button
                      size="xs"
                      colorScheme="accent"
                      onClick={() => alert(`Напоминание отправлено: ${entry.user}`)}
                      leftIcon={<HiOutlineBell />}
                    />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
}

function StatusTag({ returnedAt, dueDate }) {
  const now = new Date();
  const due = new Date(dueDate);

  if (returnedAt) {
    return <Text color="$green10" fontWeight="$medium">Возвращено</Text>;
  }

  if (now > due) {
    return <Text color="$red10" fontWeight="$medium">Просрочено</Text>;
  }

  return <Text color="$orange10" fontWeight="$medium">Выдано</Text>;
}


