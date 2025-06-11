import {createContext, createEffect, createSignal, onMount} from "solid-js";
import {createStore} from "solid-js/store";
import {
    fetchBooks,
    fetchAuthors,
    fetchPublishers,
    fetchDirections,
    createAuthor,
    createPublisher,
    createDirection, updateBook, createBook, fetchIssues
} from "../hooks/useFetch";
export const CurrentBookContext = createContext()

export default function CurrentBookProvider(props) {

    onMount(() => {
        loadBooks();
        loadAuthors();
        loadPublishers();
        loadDirections();
        loadIssues()
    });

    const loadIssues = async () => {
        const issues = await fetchIssues();
        setStore("issues", issues);
    }

    /**
     * Стягивает все книги, сохраняет их в store.
     */
    const loadBooks = async () => {
        const books = await fetchBooks();
        setStore("books", books);
    }

    /**
     * Стягивает все издательства, сохраняет их в store.
     */
    const loadPublishers = async () => {
        const publishers = await fetchPublishers();
        setStore("publishers", publishers);
    }

    /**
     * Стягивает все направления, сохраняет их в store.
     */
    const loadDirections = async () => {
        const directions = await fetchDirections();
        setStore("directions", directions);
    }

    /**
     * Стягивает всех авторов, сохраняет их в store.
     */
    const loadAuthors = async () => {
        const authors = await fetchAuthors();
        setStore("authors", authors);
        console.log(store["authors"]);
    }

    const [store, setStore] = createStore({
        authors: [],
        publishers: [],
        directions: [],
        books: [],
        issues: []
    });

    const [editingStore, setEditingStore] = createStore({
        isBookSelected: false,
        isLocked: true,
        isCurrentNew: false,   // Если true -- создаем новую книгу, если false -- редактируем уже существующую
    });

    const setBookSelected = (isSelected) => {
        setEditingStore("isBookSelected", isSelected);
    };

    const setLocked = (isLocked) => {
        setEditingStore("isLocked", isLocked);
    };

    const [currentBook, setCurrentBook] = createStore({
        "id": 0,
        "title": "",
        "author": "",
        "direction": "",
        "publisher": "",
        "udc": "",
        "bbk": "",
        "isbn": "",
        "quantity": 0
    });

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

    const [fieldsValidation, setFieldsValidation] = createStore({
        "001-00": true,
        "ind1-100": true,
        "ind2-100": true,
        "100-a": true,
        "ind1-245": true,
        "ind2-245": true,
        "245-a": true,
    });

    const [areFieldsValid, setAreFieldsValid] = createSignal(false);

    createEffect(() => {
        const valid =
            !errors.title &&
            !errors.author &&
            !errors.publisher &&
            !errors.direction &&
            !errors.udc &&
            !errors.bbk &&
            !errors.isbn &&
            !errors.quantity;
        setAreFieldsValid(valid);
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentBook(name, value);
    }

    /**
     * Возвращает id автора.
     * Вызывается при сохранении книги в handleSave (в этом же файле).
     * Принимает полное имя автора.
     * Полное имя может состоять из имени и фамилии или из имени, фамилии и отчества (именно в таком порядке).
     * Если в store["authors"] уже есть подходящий автор, возвращает его id.
     * Если нет, создает новый, обновляет store["authors"] и возвращает id уже нового автора.
     */
    const getAuthorIdByFullName = async (fullName) => {
        const parts = fullName.trim().split(" ");

        if (parts.length !== 2 && parts.length !== 3) {
            console.log("Wrong full name");  // но это скорее всего не произойдет, потому что кнопка не будет кликабельна
            return null;
        }

        const [first_name, last_name, middle_name = ""] = parts;

        const matched = store["authors"].find((a) =>
            a["first_name"] === first_name &&
            a["last_name"] === last_name &&
            (a["middle_name"] || "") === middle_name
        );

        if (matched) {
            // автор уже существует
            return matched["id"];
        }

        // создаем нового автора
        const author = await createAuthor(first_name, last_name, middle_name);
        setStore("authors", (prev) => [...prev, author]);

        return await author["id"];
    };

    /**
     * Возвращает id издателя.
     * Вызывается при сохранении книги в handleSave (в этом же файле).
     * Принимает название издателя.
     * Если в store["publishers"] уже есть такой издатели, возвращает его id.
     * Если нет, создает новый, обновляет store["publishers"] и возвращает id уже нового издателя.
     */
    const getPublisherIdByName = async (name) => {
        const matched = store["publishers"].find((p) =>
            p["name"] === name
        );

        if (matched) {
            // издатель уже есть
            return matched["id"];
        }

        // создаем нового издателя
        const publisher = await createPublisher(name);
        setStore("publishers", (prev) => [...prev, publisher]);

        return await publisher["id"];
    };

    /**
     * Возвращает id направления.
     * Вызывается при сохранении книги в handleSave (в этом же файле).
     * Принимает название издателя.
     * Если в store["directions"] уже есть такое направление, возвращает его id.
     * Если нет, создает новый, обновляет store["directions"] и возвращает id уже нового направления.
     */
    const getDirectionIdByName = async (name) => {
        const matched = store["directions"].find((p) =>
            p["name"] === name
        );

        if (matched) {
            // направление уже есть
            return matched["id"];
        }

        // создаем новое направление
        const direction = await createDirection(name);
        setStore("directions", (prev) => [...prev, direction]);

        return await direction["id"];
    };

    /**
     * Сохраняет книгу.
     * Срабатывает при нажатии кнопки "Сохранить" в src/features/items/Header.
     * Сохраняет либо отредактированную существующую книгу, либо новую.
     * Обновляет store["books"].
     */
    const handleSave = async () => {
        const author_id = await getAuthorIdByFullName(currentBook["author"]);
        const publisher_id = await getPublisherIdByName(currentBook["publisher"]);
        const direction_id = await getDirectionIdByName(currentBook["direction"]);

        const book = {
            "author_ids": [
                author_id
            ],
            "direction_id": direction_id,
            "publisher_id": publisher_id,
            "is_deleted": false,
            "title": currentBook["title"],
            "udc": currentBook["udc"],
            "bbk": currentBook["bbk"],
            "isbn": currentBook["isbn"],
            "quantity": currentBook["quantity"]
        };

        if (editingStore.isCurrentNew) {  // создаем новую книгу
            await createBook(book);
        } else {                          // редактируем уже существующую книгу
            await updateBook(currentBook["id"], book);
        }

        loadBooks();
    };

    /**
     * Начинает создавать процесс создания новой книги.
     * Срабатывает при нажатии кнопки "+" в src/features/items/Header.
     * Сбрасывает поля в currentBook.
     * Переключает editingStore["isCurrentNew"] на true.
     */
    const handleNewBookSelect = () => {
        // TODO: улучшить, вдруг будут новые поля
        setCurrentBook("id", 0);
        setCurrentBook("title", "");
        setCurrentBook("author", "");
        setCurrentBook("publisher", "");
        setCurrentBook("udc", "");
        setCurrentBook("direction", "");
        setCurrentBook("bbk", "");
        setCurrentBook("isbn", "");
        setCurrentBook("quantity", 0);

        setEditingStore("isCurrentNew", true);
    }

    /**
     * Выбирает книгу из уже существующих.
     * Срабатывает при выборе одной из src/features/items/SearchResult в src/features/items/Sidebar.
     */
    const selectBook = (book) => {
        setEditingStore("isCurrentNew", false);     // Идет редактирование уже существующей книги
        setCurrentBook("id", book["id"]);
        setCurrentBook("title", book["title"]);
        const author = book["authors"]?.[0]
            ? [
                book["authors"][0]["first_name"],
                book["authors"][0]["last_name"],
                book["authors"][0]["middle_name"],
            ]
                .filter(Boolean)
                .join(" ")
            : "";
        setCurrentBook("author", author);
        setCurrentBook("publisher", book["publisher"]["name"]);
        setCurrentBook("udc", book["udc"]);
        setCurrentBook("direction", book["direction"]["name"]);
        setCurrentBook("bbk", book["bbk"]);
        setCurrentBook("isbn", book["isbn"]);
        setCurrentBook("quantity", book["quantity"]);
    }

    const createNewBook = () => {
        setEditingStore("isBookSelected", true);
        setEditingStore("isCurrentNew", true);
        for (let prop in currentBook.origin.fields) {
            setCurrentBook("updated", "fields", prop, null);
            setCurrentBook("origin", "fields", prop, null);
        }
    }

    const revert = () => {
        for (let prop in currentBook.updated.fields) {
            setCurrentBook("updated", "fields", prop, currentBook.origin.fields[prop]);
        }
    }

    const currentBookState = {
        loadAuthors, loadPublishers, loadDirections, loadBooks, loadIssues,
        handleInput,
        handleSave, handleNewBookSelect,
        fieldsValidation,
        areFieldsValid,
        selectBook,
        store,
        currentBook,
        errors, setErrors,
        editingStore,
        setBookSelected,
        createNewBook,
        revert,
        setLocked,
        setCurrentBook,
    }

    return (
        <CurrentBookContext.Provider value={currentBookState}>
            {props.children}
        </CurrentBookContext.Provider>
    )
}