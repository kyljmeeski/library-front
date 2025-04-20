import {
  VStack, HStack, Heading, Box, SimpleGrid, Button,
  Table, Thead, Tbody, Tr, Th, Td, Input, IconButton, List, ListItem
} from "@hope-ui/solid";
import { createSignal, For } from "solid-js";
import { HiOutlinePencil, HiOutlineTrash } from "solid-icons/hi";

// Расширенные значения для селектов
const directionsList = [
  "Литература", "Философия", "Роман", "Наука", "История", 
  "Психология", "Математика", "Биография", "Экономика"
];
const authorsList = [
  "Лев Толстой", "Джордж Оруэлл", "Михаил Булгаков", "Федор Достоевский", 
  "Виктор Гюго", "Маргарет Этвуд", "Уильям Шекспир", "Антуан де Сент-Экзюпери", 
  "Харуки Мураками", "Джейн Остин"
];
const titlesList = [
  "Война и мир", "1984", "Мастер и Маргарита", "Преступление и наказание",
  "Отверженные", "Гордость и предубеждение", "Убить пересмешника", "451 градус по Фаренгейту", 
  "На маяк", "Братья Карамазовы"
];

const initialBooks = [
  {
    id: 1,
    title: "Война и мир",
    author: "Лев Толстой",
    publisher: "Эксмо",
    udk: "821.161.1",
    direction: "Литература",
    bbk: "84(2Р)6",
    isbn: "978-5-699-12345-0",
    quantity: 5,
    inventoryNumber: "INV-001"
  },
  {
    id: 2,
    title: "1984",
    author: "Джордж Оруэлл",
    publisher: "АСТ",
    udk: "821.111",
    direction: "Философия",
    bbk: "83.3(2Р)",
    isbn: "978-5-17-028923-6",
    quantity: 3,
    inventoryNumber: "INV-002"
  },
  {
    id: 3,
    title: "Мастер и Маргарита",
    author: "Михаил Булгаков",
    publisher: "Азбука",
    udk: "821.161.1",
    direction: "Роман",
    bbk: "84(2Р)6",
    isbn: "978-5-389-01843-0",
    quantity: 4,
    inventoryNumber: "INV-003"
  },
];

export default function One() {
  const [books, setBooks] = createSignal([...initialBooks]);
  const [title, setTitle] = createSignal("");
  const [author, setAuthor] = createSignal("");
  const [publisher, setPublisher] = createSignal("");
  const [udk, setUdk] = createSignal("");
  const [direction, setDirection] = createSignal("");
  const [bbk, setBbk] = createSignal("");
  const [isbn, setIsbn] = createSignal("");
  const [quantity, setQuantity] = createSignal(1);

  // Стейт для поиска
  const [searchTitle, setSearchTitle] = createSignal("");
  const [searchAuthor, setSearchAuthor] = createSignal("");
  const [searchDirection, setSearchDirection] = createSignal("");

  const addBook = () => {
    if (!title() || !author()) return;

    const generatedInventoryNumber = `INV-${Date.now()}`;
    const newBook = {
      id: Date.now(),
      title: title(),
      author: author(),
      publisher: publisher(),
      udk: udk(),
      direction: direction(),
      bbk: bbk(),
      isbn: isbn(),
      quantity: parseInt(quantity()),
      inventoryNumber: generatedInventoryNumber,
    };

    setBooks([...books(), newBook]);

    // Очистка полей
    setTitle(""); setAuthor(""); setPublisher(""); setUdk(""); setDirection(""); setBbk(""); setIsbn(""); setQuantity(1);
    setSearchTitle("");
    setSearchAuthor("");
    setSearchDirection("");
  };

  const deleteBook = (id) => {
    setBooks(books().filter((b) => b.id !== id));
  };

  const editBook = (id) => {
    const book = books().find((b) => b.id === id);
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setPublisher(book.publisher);
      setUdk(book.udk);
      setDirection(book.direction);
      setBbk(book.bbk);
      setIsbn(book.isbn);
      setQuantity(book.quantity);
      deleteBook(id);
    }
  };

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Heading size="lg" color="$accent11">Каталог книг</Heading>

      <Box w="$full" p="$4" borderRadius="$xl" boxShadow="$sm" bg="white">
        <Heading size="md" mb="$3">Добавить новую книгу</Heading>
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} spacing="$6"> {/* Увеличил расстояние между полями */}

          <Box mb="$4">
            <label>Название книги</label>
            <Input
              placeholder="Название книги"
              value={searchTitle()}
              onInput={(e) => setSearchTitle(e.target.value)}
              list="titles-list"
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: "100%" }}
            />
            <datalist id="titles-list">
              <For each={titlesList.filter(t => t.toLowerCase().includes(searchTitle().toLowerCase()))}>
                {(title) => <option value={title} />}
              </For>
            </datalist>
          </Box>

          <Box mb="$4">
            <label>Автор</label>
            <Input
              placeholder="Автор"
              value={searchAuthor()}
              onInput={(e) => setSearchAuthor(e.target.value)}
              list="authors-list"
              onChange={(e) => setAuthor(e.target.value)}
              style={{ width: "100%" }}
            />
            <datalist id="authors-list">
              <For each={authorsList.filter(a => a.toLowerCase().includes(searchAuthor().toLowerCase()))}>
                {(author) => <option value={author} />}
              </For>
            </datalist>
          </Box>

          <Box mb="$4">
            <label>Издательство</label>
            <Input placeholder="Издательство" value={publisher()} onInput={(e) => setPublisher(e.target.value)} />
          </Box>

          <Box mb="$4">
            <label>УДК</label>
            <Input placeholder="УДК" value={udk()} onInput={(e) => setUdk(e.target.value)} />
          </Box>

          <Box mb="$4">
            <label>Направление</label>
            <Input
              placeholder="Направление"
              value={searchDirection()}
              onInput={(e) => setSearchDirection(e.target.value)}
              list="directions-list"
              onChange={(e) => setDirection(e.target.value)}
              style={{ width: "100%" }}
            />
            <datalist id="directions-list">
              <For each={directionsList.filter(d => d.toLowerCase().includes(searchDirection().toLowerCase()))}>
                {(direction) => <option value={direction} />}
              </For>
            </datalist>
          </Box>

          <Box mb="$4">
            <label>ББК</label>
            <Input placeholder="ББК" value={bbk()} onInput={(e) => setBbk(e.target.value)} />
          </Box>

          <Box mb="$4">
            <label>ISBN</label>
            <Input placeholder="ISBN" value={isbn()} onInput={(e) => setIsbn(e.target.value)} />
          </Box>

          <Box mb="$4">
            <label>Количество</label>
            <Input
              type="number"
              min="1"
              placeholder="Количество"
              value={quantity()}
              onInput={(e) => setQuantity(e.target.value)}
            />
          </Box>

        </SimpleGrid>

        <Button mt="$4" onClick={addBook} colorScheme="accent">Добавить книгу</Button>
      </Box>

      <Box w="$full">
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} spacing="$4">
          <Box minHeight="100%" display="flex" flexDirection="column">
            <Table variant="simple" w="$full" flex="1">
              <Thead>
                <Tr>
                  <Th>Название</Th>
                  <Th>Автор</Th>
                  <Th>Издательство</Th>
                </Tr>
              </Thead>
              <Tbody>
                <For each={books()}>{(book) => (
                  <Tr>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                  </Tr>
                )}</For>
              </Tbody>
            </Table>
          </Box>

          <Box minHeight="100%" display="flex" flexDirection="column">
            <Table variant="simple" w="$full" flex="1">
              <Thead>
                <Tr>
                  <Th>УДК</Th>
                  <Th>Направление</Th>
                  <Th>ББК</Th>
                  <Th>ISBN</Th>
                  <Th>Кол-во</Th>
                  <Th>инв. №</Th>
                  <Th>Действия</Th>
                </Tr>
              </Thead>
              <Tbody>
                <For each={books()}>{(book) => (
                  <Tr>
                    <Td>{book.udk}</Td>
                    <Td>{book.direction}</Td>
                    <Td>{book.bbk}</Td>
                    <Td>{book.isbn}</Td>
                    <Td>{book.quantity}</Td>
                    <Td>{book.inventoryNumber}</Td>
                    <Td>
                      <HStack spacing="$2">
                        <IconButton
                          aria-label="Редактировать"
                          icon={<HiOutlinePencil />}
                          size="sm"
                          colorScheme="accent"
                          onClick={() => editBook(book.id)}
                        />
                        <IconButton
                          aria-label="Удалить"
                          icon={<HiOutlineTrash />}
                          size="sm"
                          colorScheme="danger"
                          onClick={() => deleteBook(book.id)}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                )}</For>
              </Tbody>
            </Table>
          </Box>
        </SimpleGrid>
      </Box>
    </VStack>
  );
}









  