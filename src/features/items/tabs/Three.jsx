import {
    VStack, Heading, Table, Thead, Tbody, Tr, Th, Td, Button, Text, Box, Alert, AlertIcon
  } from "@hope-ui/solid";
  import { createSignal } from "solid-js";
  
  const initialData = [
    { book: "Война и мир", user: "Иван Иванов", takenAt: "2025-03-30", dueDate: "2025-04-30", returnedAt: null },
    { book: "1984", user: "Анна Петрова", takenAt: "2025-03-28", dueDate: "2025-04-28", returnedAt: "2025-04-04" },
    { book: "Мастер и Маргарита", user: "Дмитрий Смирнов", takenAt: "2025-03-25", dueDate: "2025-04-25", returnedAt: null },
    { book: "Преступление и наказание", user: "Ольга Сидорова", takenAt: "2025-04-01", dueDate: "2025-05-01", returnedAt: null },
  ];
  
  export default function Three() {
    const [entries, setEntries] = createSignal(initialData.map((entry, i) => ({
      ...entry,
      invNumber: String(i + 1).padStart(3, "0"),
    })));
    const [successMessage, setSuccessMessage] = createSignal("");
  
    const formatDate = (val) => {
      const date = new Date(val);
      return isNaN(date) ? "-" : date.toLocaleDateString("ru-RU");
    };
  
    const handleReturnBook = (invNumber) => {
      const updated = entries().map(entry =>
        entry.invNumber === invNumber
          ? { ...entry, returnedAt: new Date().toISOString() }
          : entry
      );
      setEntries(updated);
  
      setSuccessMessage("Книга успешно возвращена!");
      setTimeout(() => setSuccessMessage(""), 3000);
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
                      <Tr key={entry.invNumber}>
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
                            onClick={() => handleReturnBook(entry.invNumber)}
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
  
  