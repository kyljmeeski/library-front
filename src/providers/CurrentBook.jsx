import {notificationService} from "@hope-ui/solid";
import axios from "axios";
import {createContext, createEffect, createSignal} from "solid-js";
import {createStore} from "solid-js/store";
import {fetchBooks} from "../hooks/useFetch";

export const CurrentBookContext = createContext()

export default function CurrentBookProvider(props) {

    const loadBooks = async () => {
        const books = await fetchBooks();
        setStore("books", books);
    }

    const [store, setStore] = createStore({
        books: [],
    });

    const [editingStore, setEditingStore] = createStore({
        isBookSelected: false,
        isLocked: true,
        isCurrentNew: true,
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

    const validateInput = (name, value) => {
        if (["000-00", "001-00", "ind1-100", "ind2-100", "100-a", "ind1-245", "ind2-245", "245-a"].includes(name)) {
            setFieldsValidation(name, value.trim() === "");
        }
    }

    const [areFieldsValid, setAreFieldsValid] = createSignal(false);

    createEffect(() => {
        const valid = !Object.values(errors).some(v => v === false);
        console.log("valid: " + valid);
        setAreFieldsValid(valid);
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentBook(name, value);
    }

    const handleSave = () => {
        if (editingStore.isCurrentNew) {
            console.log(window.HOST_ADDRESS + "/books" + {...currentBook.updated.id});
            axios.post(window.HOST_ADDRESS + "/books", {...currentBook.updated.fields})
            .then(response => {
                notificationService.show({
                    status: "success",
                    title: "Book saved.",
                });
                createNewBook();
            })
            .catch(error => {
                notificationService.show({
                    status: "danger",
                    title: error.response.data,
                })
            })
        } else {
            axios.put(window.HOST_ADDRESS + "/books/" + currentBook.updated.id, {...currentBook.updated.fields})
            .then(response => {
                notificationService.show({
                    status: "success",
                    title: "Book saved.",
                })
            })
            .catch(error => {
                notificationService.show({
                    status: "danger",
                    title: error.response.data,
                })
            })
        }
    }

    const selectBook = (book) => {
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
        loadBooks,
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