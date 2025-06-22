import { VStack, Heading, SimpleGrid, Box, Text } from "@hope-ui/solid";
import {createSignal, createMemo, useContext} from "solid-js";
import {CurrentBookContext} from "../../../providers/CurrentBook";

// Подключение к API для получения данных
const fetchData = async () => {
  const response = await fetch("/api/entries"); // Замените на ваш реальный endpoint
  const data = await response.json();
  return data;
};

export default function Zero() {

  const { store } = useContext(CurrentBookContext);

  const [entries, setEntries] = createSignal([]);

  // Загрузка данных при монтировании компонента
  const loadEntries = async () => {
    const data = await fetchData();
    setEntries(data);
  };

  loadEntries();  // Вызываем функцию загрузки данных

  const stats = createMemo(() => {
    const now = new Date();
    const all = entries();
    const onHands = all.filter((e) => !e.returnedAt).length;
    const overdue = all.filter((e) => !e.returnedAt && new Date(e.takenAt).getTime() + 30 * 86400000 < now.getTime()).length;
    const returned = all.filter((e) => e.returnedAt).length;

    return {
      total: all.length,
      onHands,
      overdue,
      returned,
    };
  });

  store["borrowedIssues"]?.length

  return (
      <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
        <Heading size="lg" color="$accent11">Статистика</Heading>

        {/* Общая информация */}
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} gap="$4" w="$full">
          <StatCard
              label="Всего книг"
              value={store["books"]?.length}
              color="accent"
              icon="📚"
          />
          <StatCard
              label="Всего экземпляров"
              value={store["books"]?.reduce((sum, b) => sum + (b.quantity || 0), 0)}
              color="accent"
              icon="📦"
          />
          <StatCard
              label="Выдано экземпляров"
              value={store["borrowedIssues"]?.length}
              color="accent"
              icon="📤"
          />
          <StatCard
              label="Доступно экземпляров"
              value={store["books"]?.reduce((sum, b) => sum + (b.quantity || 0), 0) - store["borrowedIssues"]?.length}
              color="accent"
              icon="📥"
          />
        </SimpleGrid>

        {/* Категории */}
        <Heading size="md" mt="$4">По категориям</Heading>
        <SimpleGrid columns={{ "@initial": 1, "@sm": 2, "@md": 3 }} gap="$3" w="$full">
          <StatCard
              label="Учебники"
              value={store["books"]?.filter(b => b.category === "textbook").length}
              color="gray"
          />
          <StatCard
              label="Руководства"
              value={store["books"]?.filter(b => b.category === "manual").length}
              color="gray"
          />
          <StatCard
              label="Художественная"
              value={store["books"]?.filter(b => b.category === "fiction").length}
              color="gray"
          />
          <StatCard
              label="Научная литература"
              value={store["books"]?.filter(b => b.category === "science").length}
              color="gray"
          />
          <StatCard
              label="Другое"
              value={store["books"]?.filter(b => b.category === "other").length}
              color="gray"
          />
        </SimpleGrid>
      </VStack>
  );
}

function StatCard({ label, value, color, icon }) {
  return (
    <Box p="$5" borderRadius="$2xl" bgColor="white" boxShadow="$md">
      <Text fontSize="sm" color="$neutral10" mb="$2" display="flex" alignItems="center">
        <span style={{ fontSize: "1.5em", marginRight: "10px" }}>{icon}</span> {label}
      </Text>
      <Text fontSize="2xl" color={`$${color}10`} fontWeight="$bold">{value}</Text>
    </Box>
  );
}





