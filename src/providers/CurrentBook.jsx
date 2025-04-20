import { notificationService } from "@hope-ui/solid";
import axios from "axios";
import { createContext, createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export const CurrentBookContext = createContext()

export default function CurrentBookProvider(props) {

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
    }

    const setLocked = (isLocked) => {
        setEditingStore("isLocked", isLocked);
    }

    const [currentBook, setCurrentBook] = createStore({
        origin: {
            id: "", 
            fields: {}
        }, 
        updated: {
            id: "", 
            fields: {}
        }, 
        copies: [], 
    })

    const [signals, setSignals] = createSignal({});

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
            setFieldsValidation(name, value.trim() == "");
        }
    }
    
    const areFieldsValid = () => {
        return (
            fieldsValidation["000-00"] ||
            fieldsValidation["001-00"] ||
            fieldsValidation["ind1-100"] ||
            fieldsValidation["ind2-100"] ||
            fieldsValidation["100-a"] ||
            fieldsValidation["ind1-245"] ||
            fieldsValidation["ind2-245"] ||
            fieldsValidation["245-a"]
        )
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        
        validateInput(name, value);
        setCurrentBook("updated", "fields", name, value);

        setCurrentBook("origin", {
            ...currentBook.origin, 
            fields: {...currentBook.origin.fields}
        })
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
                fetchBooks();
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
        setFieldsValidation("000-00", false);
        setFieldsValidation("001-00", false);
        setFieldsValidation("ind1-100", false);
        setFieldsValidation("ind2-100", false);
        setFieldsValidation("100-a", false);
        setFieldsValidation("ind1-245", false);
        setFieldsValidation("ind2-245", false);
        setFieldsValidation("245-a", false);
        setBookSelected(true);
        setEditingStore("isCurrentNew", false);
        // setCurrentBook(book);
        setCurrentBook("origin", book);
        setCurrentBook("updated", book);
    }

    const createNewBook = () => {
        setEditingStore("isBookSelected", true);
        setEditingStore("isCurrentNew", true);
        for (let prop in currentBook.origin.fields) {
            setCurrentBook("updated", "fields", prop, null);
            setCurrentBook("origin", "fields", prop, null);
        }
    }

    createEffect(() => {
        fetchCopies(currentBook.origin.id);
    })

    const fetchBooks = () => {
        setStore("books", [])
       axios.get(window.HOST_ADDRESS + "/books")
       .then(response => {
           const books = response.data;
           for (let i in books) {
               const book = books[i];
               const obj = {
                   id: book.id, 
                   fields: [], 
                };
                book.fields.forEach(item => {
                    obj["id"] = book.id;
                    obj["fields"][item.name] = item.value;
                });
                setStore("books", [...store["books"], obj]);
           }
       })
       .catch(error => {
            console.log(error);
       })
    }



    const fetchCopies = (id) => {
        console.log("lsk;;;;;;;;;;;;;;;;;;;;;");
        axios.get(window.HOST_ADDRESS + "/books/" + id + "/items")
        .then(response => {
            setCurrentBook("copies", response.data);
            console.log({...response.data});
        })
        .catch(error => {
            console.log(error);
        })
    }

    const revert = () => {
        for (let prop in currentBook.updated.fields) {
            setCurrentBook("updated", "fields", prop, currentBook.origin.fields[prop]);
        }
    }

    const currentBookState = {
        signals, 
        handleInput, 
        handleSave, 
        fieldsValidation, 
        areFieldsValid, 
        fetchBooks, 
        selectBook, 
        store, 
        currentBook, 
        editingStore, 
        setBookSelected, 
        createNewBook, 
        revert, 
        setLocked, 
        fetchCopies, 
        setCurrentBook, 
    }

    return (
        <CurrentBookContext.Provider value={currentBookState}>
            {props.children}
        </CurrentBookContext.Provider>
    )
}