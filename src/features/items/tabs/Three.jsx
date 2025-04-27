import {
  VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Box, Alert, AlertIcon, HStack, IconButton
} from "@hope-ui/solid";
import { createSignal, onMount } from "solid-js";
import { HiOutlinePencil, HiOutlineTrash } from "solid-icons/hi";

// Инициализация состояния для данных
export default function Three() {
  const [entries, setEntries] = createSignal([]);
  const [successMessage, setSuccessMessage] = createSignal("");
  const [errorMessage, setErrorMessage] = createSignal("");

  // Форматирование даты
  const formatDate = (val) => {
    const date = new Date(val);
    return isNaN(date) ? "-" : date.toLocaleDateString("ru-RU");
  };

  // Загрузка данных из API при монтировании компонента
  onMount(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/issues/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        throw new Error("Ошибка загрузки данных");
      }
    } catch (error) {
      setErrorMessage("Не удалось загрузить данные");
      console.error("Ошибка при загрузке данных:", error);
    }
  });

  // Обработчик возврата книги
  const handleReturnBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/returns/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ returnedAt: new Date().toISOString() }),
      });
      if (response.ok) {
        setSuccessMessage("Книга успешно возвращена!");
        setTimeout(() => setSuccessMessage(""), 3000);
        // Обновление данных книги в локальном состоянии
        setEntries(entries().map(entry =>
          entry.id === id ? { ...entry, returnedAt: new Date().toISOString() } : entry
        ));
      } else {
        throw new Error("Ошибка возврата книги");
      }
    } catch (error) {
      console.error("Ошибка при возврате книги:", error);
      setErrorMessage("Не удалось вернуть книгу");
    }
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
        
        {errorMessage() && (
          <Alert status="error" mb="$4">
            <AlertIcon />
            {errorMessage()}
          </Alert>
        )}

        <Box overflowX="auto">
          <Table variant="striped" size="xs" minW="700px">
            <Thead>
              <Tr>
                <Th fontSize="xs" p="$2">Инв. №</Th>
                <Th fontSize="xs" p="$2">Книга</Th>
                <Th fontSize="xs" p="$2">Читатель</Th>
                <Th fontSize="xs" p="$2">Дата выдачи</Th>
                <Th fontSize="xs" p="$2">Срок возврата</Th>
                <Th fontSize="xs" p="$2">Дата возврата</Th>
                <Th fontSize="xs" p="$2">Статус</Th>
                <Th fontSize="xs" p="$2"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {entries().filter(entry => !entry.returnedAt).length === 0 ? (
                <Tr>
                  <Td colSpan={8}>
                    <Text textAlign="center" py="$6" fontSize="xs">Нет книг на возврат</Text>
                  </Td>
                </Tr>
              ) : (
                entries()
                  .filter(entry => !entry.returnedAt)
                  .map((entry) => (
                    <Tr key={entry.id}>
                      <Td fontSize="xs" p="$2">{entry.invNumber}</Td>
                      <Td fontSize="xs" p="$2">{entry.book}</Td>
                      <Td fontSize="xs" p="$2">{entry.user}</Td>
                      <Td fontSize="xs" p="$2">{formatDate(entry.takenAt)}</Td>
                      <Td fontSize="xs" p="$2">{formatDate(entry.dueDate)}</Td>
                      <Td fontSize="xs" p="$2">{entry.returnedAt ? formatDate(entry.returnedAt) : "-"}</Td>
                      <Td fontSize="xs" p="$2">
                        <Text color="$orange10" fontWeight="$medium" fontSize="xs">Выдано</Text>
                      </Td>
                      <Td p="$2">
                        <Button
                          size="xs"
                          colorScheme="accent"
                          onClick={() => handleReturnBook(entry.id)}
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

  
  