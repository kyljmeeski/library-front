import {createContext, createEffect, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {fetchBooks, fetchAuthors, fetchPublishers, fetchDirections} from "../hooks/useFetch";

export const CurrentBookContext = createContext()

export default function CurrentBookProvider(props) {

    /**
     * Стягивает все книги, сохраняет их в store.
     * Срабатывает onMount src/features/items/Sidebar.
     */
    const loadBooks = async () => {
        const books = await fetchBooks();
        setStore("books", books);
    }

    /**
     * Стягивает все издательства, сохраняет их в store.
     * Срабатывает onMount src/features/items/Sidebar.
     */
    const loadPublishers = async () => {
        const publishers = await fetchPublishers();
        setStore("publishers", publishers);
    }

    /**
     * Стягивает все направления, сохраняет их в store.
     * Срабатывает onMount src/features/items/Sidebar.
     */
    const loadDirections = async () => {
        const directions = await fetchDirections();
        setStore("directions", directions);
    }

    /**
     * Стягивает всех авторов, сохраняет их в store.
     * Срабатывает onMount src/features/items/Sidebar.
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
     * Сохраняет книгу.
     * Срабатывает при нажатии кнопки "Сохранить" в src/features/items/Header.
     * Сохраняет либо отредактированную существующую книгу, либо новую.
     */
    const handleSave = () => {
        if (editingStore.isCurrentNew) {  // создаем новую книгу
            console.log("new book saved");
        } else {                          // редактируем уже существующую книгу
            let author_id, publisher_id, direction_id;

            console.log("edited book saved");
        }
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
        loadAuthors, loadPublishers, loadDirections, loadBooks,
        handleInput,
        handleSave,
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