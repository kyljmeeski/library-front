import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { InputValidationContext } from "./InputValidationProvider";
import { PatronEditingContext } from "./PatronEditingProvider";
import axios from "axios";
import { notificationService } from "@hope-ui/solid";
import {createReader, fetchReaders} from "../hooks/useFetch";

export const CurrentPatronContext = createContext();

export default function CurrentPatronProvider(props) {

    const [inputValidationState, { isInputValid, validateInput }] = useContext(InputValidationContext);
    const [patronEditingState, { setEditing, setReadyToSave, setPatronSelected }] = useContext(PatronEditingContext);

    createEffect(() => {
        validateInput("firstName", state.newPatron.firstName);
        validateInput("lastName", state.newPatron.lastName);
        validateInput("studentNumber", state.newPatron.studentNumber);
        setReadyToSave(
            isInputValid("firstName") && 
            isInputValid("lastName") && 
            isInputValid("studentNumber") &&
            checkIfReadyToSave()
        );
    });

    const checkIfReadyToSave = () => {
        for (let prop in state.currentPatron) {
            if (state.currentPatron.hasOwnProperty(prop)) {
                if (state.currentPatron[prop] !== state.newPatron[prop]) {
                    return true;
                }
            }
        } 
        return false;
    }

    createEffect(() => {
        // setReadyToSave(checkIfReadyToSave());
    });

    const [state, setState] = createStore({
        currentPatron: {
            firstName: null, 
            middleName: null, 
            lastName: null, 
            studentNumber: null, 
            status: null,  
            birthDate: null, 
            role: null,
            passportNumber: null, 
            primaryEmail: null, 
            primaryPhone: null, 
            address1: null, 
            username: null, 
            password: null, 
            confirmPassword: null, 
            generalNotes: null, 
            alertNotes: null, 
        }, 
        newPatron: {
            firstName: null, 
            middleName: null, 
            lastName: null, 
            studentNumber: null, 
            status: null,  
            birthDate: null, 
            role: null,
            passportNumber: null, 
            primaryEmail: null, 
            primaryPhone: null, 
            address1: null, 
            username: null, 
            password: null, 
            confirmPassword: null, 
            generalNotes: null, 
            alertNotes: null, 
        }, 
        isCurrentPatronNew: true, 
        patrons: [], 
    });

    const handleSelect = (name, value) => {
        setState("newPatron", name, value);
    }

    const revert = () => {
        for (let prop in state.currentPatron) {
            setState("newPatron", prop, state.currentPatron[prop]);
        }
    }

    const addPatron = (patron) => {
        setState("patrons", [...state.patrons, patron]);
    }

    const fetchPatrons = () => {

    }

    const createNewPatron = () => {
        setState("isCurrentPatronNew", true);
        for (let prop in state.currentPatron) {
            setState("currentPatron", prop, null);
            setState("newPatron", prop, null);
        }
    }

    const selectPatron = (patron) => {
        setPatronSelected(true);
        setEditing(true); 
        setState("isCurrentPatronNew", false); 
        setState("currentPatron", patron);
        setState("newPatron", patron);
    }

    const [items, setItems] = createSignal([]);
    const [archivedItems, setArchiveItems] = createSignal([]);

    const fetchItems = async (queryPath) => {
        try {
            const response = await axios.get(queryPath);
            const list = [];
            for (let i in response.data) {
                const obj = {};
                const book = response.data[i]["book"];
                obj["id"] = response.data[i]["id"];
                obj["issuedAt"] = response.data[i]["issuedAt"];
                obj["returnDate"] = response.data[i]["returnDate"];
                for (let prop in book["fields"]) {
                    obj[book.fields[prop]["name"]] = book.fields[prop]["value"];
                }
                list.push(obj);
            }
            setItems(list);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchArchivedItems = async (queryPath) => {
        try {
            const response = await axios.get(queryPath);
            const list = [];
            for (let i in response.data) {
                const obj = {};
                const book = response.data[i]["book"];
                obj["id"] = response.data[i]["id"];
                obj["issuedAt"] = response.data[i]["issuedAt"];
                obj["dueTo"] = response.data[i]["dueTo"];
                obj["returnDate"] = response.data[i]["returnDate"];
                for (let prop in book["fields"]) {
                    obj[book.fields[prop]["name"]] = book.fields[prop]["value"];
                }
                list.push(obj);
            }
            setArchiveItems(list);
        } catch (error) {
            console.log(error);
        }
    }

    const [searchPatron, setSearchPatron] = createStore({
        firstName: "one", 
        middleName: "", 
        lastName: "", 
         
    });

    const search = () => {
        axios.post(window.HOST_ADDRESS + "/patrons/search", {
            ...searchPatron
        })
        .then(response => {
            setState("patrons", response.data);
        })
        .catch(error =>
            console.log(error)
        );
    }



    const [store, setStore] = createStore({
        "readers": []
    });

    const [editingStore, setEditingStore] = createStore({
        "isCurrentReaderNew": false
    });

    const [currentReader, setCurrentReader] = createStore({
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "username": "",
        "birth_date": "",
        "passport": "",
        "email": "",
        "phone": "",
        "address": "",
        "role": "reader"
    });

    const [errors, setErrors] = createStore({
        "first_name": "",
        "middle_name": "",
        "last_name": "",
        "username": "",
        "birth_date": "",
        "passport": "",
        "email": "",
        "phone": "",
        "address":""
    })

    const [areFieldsValid, setAreFieldsValid] = createSignal(false);

    const loadReaders = async () => {
        const readers = await fetchReaders();
        setStore("readers", readers);
    };

    createEffect(() => {
        const isUsernameValid =
            currentReader["username"] !== null &&
            currentReader["username"] !== undefined &&
            currentReader["username"].trim() !== ""
        ;
        const isEmailValid = !currentReader["email"] || currentReader["email"].trim() === ""
            ? true
            : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentReader["email"].trim())
        ;
        const isPassportValid = /^[A-Za-z]{2}\d{6}$/.test(currentReader["passport"].trim());
        const isPhoneValid = /^\d{9}$/.test(currentReader["phone"].trim());

        setAreFieldsValid(isUsernameValid && isEmailValid && isPassportValid && isPhoneValid);
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setCurrentReader(name, value);
    };

    const nonEmpty = (obj) => {
        const filteredObj = Object.fromEntries(
            Object.entries(obj).filter(([_, value]) =>
                value !== undefined &&
                value !== null &&
                value !== "" &&
                !(Array.isArray(value) && value.length === 0) &&
                !(typeof value === "object" && value !== null && Object.keys(value).length === 0)
            )
        );
        return filteredObj;
    }

    const handleSave = async () => {
        setCurrentReader("phone", (prev) => `+996${prev}`);
        const response = await createReader(nonEmpty(currentReader));
        if (response.status === 400) {
            // TODO: найти способ получше, поля могут меняться
            setErrors("last_name", "");
            setErrors("first_name", "");
            setErrors("middle_name", "");
            setErrors("username", "");
            setErrors("birth_date", "");
            setErrors("passport", "");
            setErrors("email", "");
            setErrors("phone", "");
            setErrors("address", "");
            const body = await response.json();
            for (let key in body) {
                setErrors(key, body[key]?.[0]);
            }
        }
        console.log(errors);
    }





    const currentPatron = [
        state, 
        {
            store,
            loadReaders,
            currentReader,
            areFieldsValid,
            errors,
            handleInput,

            handleSave, 
            handleSelect, 
            revert, 
            addPatron,
            fetchPatrons,  
            createNewPatron, 
            selectPatron, 
            items, 
            setItems, 
            archivedItems, 
            setArchiveItems, 
            fetchItems, 
            fetchArchivedItems, 
            searchPatron, 
            setSearchPatron, 
            search, 
        }
    ]
    
    return (
        <CurrentPatronContext.Provider value={currentPatron}>
            {props.children}
        </CurrentPatronContext.Provider>
    )
}