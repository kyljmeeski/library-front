import {
  VStack, Heading, SimpleGrid, Box, Text
} from "@hope-ui/solid";
import { createSignal, createMemo } from "solid-js";

const initialData = [
  { book: "Война и мир", user: "Иван Иванов", takenAt: "2025-03-30", returnedAt: null, invNumber: "001" },
  { book: "1984", user: "Анна Петрова", takenAt: "2025-03-28", returnedAt: "2025-04-04", invNumber: "002" },
  { book: "Мастер и Маргарита", user: "Дмитрий Смирнов", takenAt: "2025-03-25", returnedAt: null, invNumber: "003" },
  { book: "Преступление и наказание", user: "Ольга Сидорова", takenAt: "2025-04-01", returnedAt: null, invNumber: "004" },
  { book: "Чайка", user: "Сергей Козлов", takenAt: "2025-03-20", returnedAt: "2025-03-29", invNumber: "005" },
  { book: "Доктор Живаго", user: "Мария Белова", takenAt: "2025-04-05", returnedAt: null, invNumber: "006" },
  { book: "Пикник на обочине", user: "Алексей Фёдоров", takenAt: "2025-04-02", returnedAt: null, invNumber: "007" },
  { book: "Белая гвардия", user: "Юлия Андреева", takenAt: "2025-03-27", returnedAt: null, invNumber: "008" },
  { book: "Тихий Дон", user: "Павел Орлов", takenAt: "2025-03-29", returnedAt: "2025-04-06", invNumber: "009" },
];

export default function Zero() {
  const [entries] = createSignal([...initialData]);

  const stats = createMemo(() => {
    const now = new Date();
    const all = entries();
    const onHands = all.filter((e) => !e.returnedAt).length;
    const overdue = all.filter((e) => !e.returnedAt && new Date(e.takenAt).getTime() + 30 * 86400000 < now.getTime()).length;

    return {
      total: all.length,
      onHands,
      overdue,
    };
  });

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Heading size="lg" color="$accent11">Статистика библиотекаря</Heading>

      <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="$4" w="$md">
        <StatCard label="Всего книг" value={stats().total} color="gray" />
        <StatCard label="Выдано" value={stats().onHands} color="orange" />
      </SimpleGrid>

      <SimpleGrid columns={1} gap="$4" w="$md">
        <StatCard label="Просрочено" value={stats().overdue} color="red" />
      </SimpleGrid>
    </VStack>
  );
}

function StatCard({ label, value, color }) {
  return (
    <Box p="$5" borderRadius="$2xl" bgColor="white" boxShadow="$md">
      <Text fontSize="sm" color="$neutral10" mb="$2">{label}</Text>
      <Text fontSize="2xl" color={`$${color}10`} fontWeight="$bold">{value}</Text>
    </Box>
  );
}


