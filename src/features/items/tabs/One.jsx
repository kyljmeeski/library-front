import {Box, Button, Heading, Input, SimpleGrid, VStack} from "@hope-ui/solid";
import {createEffect, createSignal, useContext} from "solid-js";
import {CurrentBookContext} from "../../../providers/CurrentBook";
import {createStore} from "solid-js/store";

export default function One() {

  const { currentBook, editingStore, handleInput } = useContext(CurrentBookContext);

  const [errors, setErrors] = createStore({
    "title": false,
    "author": false,
    "publisher": false,
    "udc": false,
    "direction": false,
    "bbk": false,
    "isbn": false,
    "quantity": false,
  });

  createEffect(() => {
    // Author should contain either 1 space, if only first_name and last_name is present
    // or 2 spaces, if first_name, last_name and middle_name
    const authorNameParts = currentBook["author"].trim().split(" ");
    const isAuthorInvalid = authorNameParts.length < 1 || authorNameParts.length > 2

    setErrors("title", !currentBook["title"]);
    setErrors("author", !currentBook["title"]);
    setErrors("publisher", !currentBook["publisher"]);
    setErrors("direction", !currentBook["direction"]);
    setErrors("quantity", !currentBook["quantity"] || currentBook["quantity"] < 0);
  });

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Heading size="lg" color="$accent11">Каталог книг</Heading>

      <Box w="$full" p="$4" borderRadius="$xl" boxShadow="$sm" bg="white">
        <Heading size="md" mb="$3">Добавить новую книгу</Heading>
        <SimpleGrid columns={{ "@initial": 1, "@md": 2 }} spacing="$6">

          <Box mb="$4">
            <label>Название книги</label>
            <Input
              name="title"
              placeholder="Название книги"
              value={currentBook["title"]}
              disabled={editingStore.isLocked}
              onInput={(e) => handleInput(e)}
              invalid={errors["title"]}
            />
          </Box>

          <Box mb="$4">
            <label>Автор</label>
            <Input
              name="author"
              placeholder="Автор"
              value={currentBook["author"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>Издательство</label>
            <Input
              name="publisher"
              placeholder="Издательство"
              value={currentBook["publisher"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>УДК</label>
            <Input
              name="udc"
              placeholder="УДК"
              value={currentBook["udc"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>Направление</label>
            <Input
              name="direction"
              placeholder="Направление"
              value={currentBook["direction"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>ББК</label>
            <Input
              name="bbk"
              placeholder="ББК"
              value={currentBook["bbk"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>ISBN</label>
            <Input
              name="isbn"
              placeholder="ISBN"
              value={currentBook["isbn"]}
              disabled={editingStore.isLocked}
            />
          </Box>

          <Box mb="$4">
            <label>Количество</label>
            <Input
              name="quantity"
              value={currentBook["quantity"]}
              type="number"
              min="1"
              placeholder="Количество"
              disabled={editingStore.isLocked}
            />
          </Box>

        </SimpleGrid>

        <Button
            mt="$4" colorScheme="accent"
            onClick={() => {
              console.log(currentBook);
            }}
        >
          Добавить книгу
        </Button>
      </Box>
    </VStack>
  );
}











  