import { Button, HStack, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, VStack, notificationService } from "@hope-ui/solid";
import { For, Match, Switch, createEffect, createSignal, useContext } from "solid-js";
import { CurrentPatronContext } from "../../../providers/CurrentPatron";
import axios from "axios";
import CheckedOutItems from "../tables/CheckedOutItems";
import ArchivedItems from "../tables/ArchivedItems";

export default function Statistics() {

    const [state] = useContext(CurrentPatronContext);
    const [items, setItems] = createSignal();
    const [archiveItems, setArchiveItems] = createSignal();

    createEffect(() => {
        if (state.newPatron.studentNumber == null || state.newPatron.studentNumber == undefined) {
            return;
        }
        let queryPath = window.HOST_ADDRESS + "/patrons/" + state.newPatron.studentNumber + "/items";
        axios.get(queryPath)
        .then(response => {
            const list = [];
            for (let i in response.data) {
                const obj = {};
                const book = response.data[i]["book"];
                obj["id"] = response.data[i]["id"];
                obj["issuedAt"] = response.data[i]["issuedAt"];
                obj["dueTo"] = response.data[i]["dueTo"];
                for (let prop in book["fields"]) {
                    obj[book.fields[prop]["name"]] = book.fields[prop]["value"];
                }
                list.push(obj);
            }
            setItems(list);
        })
        .catch(error => console.log(error));

        if (state.newPatron.studentNumber == null || state.newPatron.studentNumber == undefined) {
            return;
        }
        queryPath = window.HOST_ADDRESS + "/patrons/" + state.newPatron.studentNumber + "/archive";
        axios.get(queryPath)
        .then(response => {
            const list = [];
            for (let i in response.data) {
                const obj = {};
                obj["id"] = response.data[i].id;
                obj["issuedAt"] = response.data[i].issuedAt;
                obj["dueTo"] = response.data[i].dueTo;
                obj["returnDate"] = response.data[i].returnDate;
                obj["fields"] = [];
                const fields = response.data[i];
                const book = fields["book"];
                const bookFields = book.fields;
                for (let prop in bookFields) {
                    obj[bookFields[prop]["name"]] = bookFields[prop]["value"];
                }
                list.push(obj);
            }
            setArchiveItems(list);
        })
        .catch(error => console.log(error));
    })

    return (
        <VStack w={"$full"} flexGrow={"1"} bgColor={"white"} fontSize={"14px"}  px={"$7"} py={"$5"} gap={"$3"}>
            <VStack w={"$full"} alignItems={"start"} gap={"$3"}>
                <Heading color={"$accent11"}>
                    Items on hand
                </Heading>
                <CheckedOutItems />
                <ArchivedItems />
            </VStack>
        </VStack>
    )
}