import { createContext, createEffect, createSignal, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { InputValidationContext } from "./InputValidationProvider";
import { PatronEditingContext } from "./PatronEditingProvider";
import axios from "axios";
import { notificationService } from "@hope-ui/solid";

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
            library: null, 
            status: null, 
            policy: null, 
            birthDate: null, 
            sex: null, 
            homeroom: null, 
            secondLocation: null, 
            group: null, 
            graduationDate: null, 
            accountExpiration: null, 
            primaryEmail: null, 
            instituteEmail: null, 
            primaryPhone: null, 
            mobile: null, 
            messengers: null, 
            address1: null, 
            address2: null, 
            contactNotes: null, 
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
            library: null, 
            status: null, 
            policy: null, 
            birthDate: null, 
            sex: null, 
            homeroom: null, 
            secondLocation: null, 
            group: null, 
            graduationDate: null, 
            accountExpiration: null, 
            primaryEmail: null, 
            instituteEmail: null, 
            primaryPhone: null, 
            mobile: null, 
            messengers: null, 
            address1: null, 
            address2: null, 
            contactNotes: null, 
            username: null, 
            password: null, 
            confirmPassword: null, 
            generalNotes: null, 
            alertNotes: null, 
        }, 
        isCurrentPatronNew: true, 
        patrons: [], 
    });

    const handleInput = (e) => {
        validateInput(e.currentTarget.name, e.currentTarget.value);
        setState("newPatron", e.currentTarget.name, e.currentTarget.value);
    }

    const handleSelect = (name, value) => {
        setState("newPatron", name, value);
    }

    const handleSave = () => {
        console.log(state.isCurrentPatronNew);
        if (state.isCurrentPatronNew) {
            axios.post(window.HOST_ADDRESS + "/patrons", { ...state.newPatron })
            .then(response => {
                console.log(response);
                notificationService.show({
                    status: "success", 
                    title: "Patron created!"
                });
                setState("currentPatron", state.newPatron);
                fetchPatrons();
                createNewPatron();
            })
            .catch(error => {
                notificationService.show({
                    status: "danger", 
                    title: error.response.data.message, 
                });
            });
        } else if (!state.isCurrentPatronNew) {
            const { studentNumber, ...patronToBeUpdated } = state.newPatron;
            axios.put(window.HOST_ADDRESS + "/patrons/" + state.newPatron.studentNumber, patronToBeUpdated)
            .then(response => {
                console.log(response);
                notificationService.show({
                    status: "success", 
                    title: "Patron updated!"
                });
                setState("currentPatron", state.newPatron);
                fetchPatrons();
                selectPatron(patronToBeUpdated);
                
            })
            .catch(error => {
                console.log(error);
                notificationService.show({
                    status: "danger", 
                    title: "Error!"
                });
            });
        }
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
        axios.get(window.HOST_ADDRESS + "/patrons")
        .then(response => {
            setState("patrons", response.data);
        })
        .catch(error => {
            console.log(error);
        });
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
        group: "AIN120", 
        sex: "", 
        homeroom: "", 
        secondLocation: "", 
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

    const currentPatron = [
        state, 
        {
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