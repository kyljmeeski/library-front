import {Box, Button, Heading, Input, SimpleGrid, VStack} from "@hope-ui/solid";
import {createEffect, createSignal, For, useContext} from "solid-js";
import {CurrentBookContext} from "../../../providers/CurrentBook";

export default function One() {

  const { store, currentBook, editingStore, handleInput, errors, setErrors } = useContext(CurrentBookContext);

  createEffect(() => {
    setErrors("title", !currentBook["title"]);
    setErrors("publisher", !currentBook["publisher"]);
    setErrors("direction", !currentBook["direction"]);
    setErrors("quantity", !currentBook["quantity"] || currentBook["quantity"] < 0);

    // Author should have either: first_name, last_name or first_name, last_name, middle_name
    const authorNameParts = currentBook["author"].trim().split(" ");
    const isAuthorValid = authorNameParts.length === 2 || authorNameParts.length === 3
    setErrors("author", !isAuthorValid);
  });

  return (
    <VStack w="$full" px="$7" py="$5" gap="$6" alignItems="start">
      <Heading size="lg" color="$accent11">Каталог книг</Heading>

      <Box w="$full" p="$4" borderRadius="$xl" boxShadow="$sm" bg="white">
        <Heading size="md" mb="$3">Добавить новую книгу</Heading>
          <SimpleGrid columns={{"@initial": 1, "@md": 2}} spacing="$6">

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
                      list="author-list"
                      placeholder="Автор"
                      value={currentBook["author"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                      invalid={errors["author"]}
                  />
              </Box>
              <datalist id="author-list">
                  <For each={store["authors"]}>
                      {(author) => {
                          const fullName = [
                              author["first_name"],
                              author["last_name"],
                              author["middle_name"]
                          ].filter(Boolean).join(" ");
                          return <option value={fullName}/>;
                      }}
                  </For>
              </datalist>

              <Box mb="$4">
                  <label>Издательство</label>
                  <Input
                      name="publisher"
                      list="publisher-list"
                      placeholder="Издательство"
                      value={currentBook["publisher"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                      invalid={errors["publisher"]}
                  />
              </Box>
              <datalist id="publisher-list">
                  <For each={store["publishers"]}>
                      {(publisher) => {
                          return <option value={publisher["name"]}/>;
                      }}
                  </For>
              </datalist>

              <Box mb="$4">
                  <label>УДК</label>
                  <Input
                      name="udc"
                      placeholder="УДК"
                      value={currentBook["udc"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                  />
              </Box>

              <Box mb="$4">
                  <label>Направление</label>
                  <Input
                      name="direction"
                      list="direction-list"
                      placeholder="Направление"
                      value={currentBook["direction"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                      invalid={errors["direction"]}
                  />
              </Box>
              <datalist id="direction-list">
                  <For each={store["directions"]}>
                      {(direction) => {
                          return <option value={direction["name"]}/>;
                      }}
                  </For>
              </datalist>

              <Box mb="$4">
                  <label>ББК</label>
                  <Input
                      name="bbk"
                      placeholder="ББК"
                      value={currentBook["bbk"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                  />
              </Box>

              <Box mb="$4">
                  <label>ISBN</label>
                  <Input
                      name="isbn"
                      placeholder="ISBN"
                      value={currentBook["isbn"]}
                      disabled={editingStore.isLocked}
                      onInput={(e) => handleInput(e)}
                      invalid={errors["isbn"]}
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
                      onInput={(e) => handleInput(e)}
                      invalid={errors["quantity"]}
                  />
              </Box>

          </SimpleGrid>
      </Box>
    </VStack>
  );
}











  