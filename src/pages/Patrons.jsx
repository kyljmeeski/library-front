import { HStack, VStack } from "@hope-ui/solid";
import Header from "../features/patrons/Header";
import Sidebar from "../features/patrons/Sidebar";
import PatronCard from "../features/patrons/PatronCard";
import { Match, Switch, onMount, useContext } from "solid-js";
import { PatronEditingContext } from "../providers/PatronEditingProvider";
import PatronPageIntro from "../features/patrons/patronPageIntro/PatronPageIntro";
import { CurrentPatronContext } from "../providers/CurrentPatron";
import axios from "axios";

export default function Patrons() {

    const [state] = useContext(PatronEditingContext);
    const [currentPatronState, { addPatron, fetchPatrons }] = useContext(CurrentPatronContext);

    onMount(() => {
        // const newPatrons = [
        //     {
        //         firstName: "leo", 
        //         middleName: "", 
        //         lastName: "messi", 
        //         studentNumber: "10", 
        //         library: "", 
        //         status: "", 
        //         policy: "", 
        //         birthDate: "", 
        //         sex: "", 
        //         homeroom: "", 
        //         secondLocation: "", 
        //         group: "", 
        //         graduationDate: "", 
        //         accountExpiration: "", 
        //         primaryEmail: "", 
        //         instituteEmail: "", 
        //         primaryPhone: "", 
        //         mobile: "", 
        //         messengers: "", 
        //         address1: "", 
        //         address2: "", 
        //         contactNotes: "", 
        //         username: "", 
        //         password: "", 
        //         confirmPassword: "", 
        //         generalNotes: "", 
        //         alertNotes: "", 
        //     }, 
        //     {
        //         firstName: "luis", 
        //         middleName: "", 
        //         lastName: "suarez", 
        //         studentNumber: "9", 
        //         library: "", 
        //         status: "", 
        //         policy: "", 
        //         birthDate: "", 
        //         sex: "", 
        //         homeroom: "", 
        //         secondLocation: "", 
        //         group: "", 
        //         graduationDate: "", 
        //         accountExpiration: "", 
        //         primaryEmail: "", 
        //         instituteEmail: "", 
        //         primaryPhone: "", 
        //         mobile: "", 
        //         messengers: "", 
        //         address1: "", 
        //         address2: "", 
        //         contactNotes: "", 
        //         username: "", 
        //         password: "", 
        //         confirmPassword: "", 
        //         generalNotes: "", 
        //         alertNotes: "", 
        //     }, 
        //     {
        //         firstName: "neymar", 
        //         middleName: "", 
        //         lastName: "jr", 
        //         studentNumber: "11", 
        //         library: "", 
        //         status: "", 
        //         policy: "", 
        //         birthDate: "", 
        //         sex: "", 
        //         homeroom: "", 
        //         secondLocation: "", 
        //         group: "", 
        //         graduationDate: "", 
        //         accountExpiration: "", 
        //         primaryEmail: "", 
        //         instituteEmail: "", 
        //         primaryPhone: "", 
        //         mobile: "", 
        //         messengers: "", 
        //         address1: "", 
        //         address2: "", 
        //         contactNotes: "", 
        //         username: "", 
        //         password: "", 
        //         confirmPassword: "", 
        //         generalNotes: "", 
        //         alertNotes: "", 
        //     }, 
        // ]
        // for (let i in newPatrons) {
        //     addPatron(newPatrons[i]);
        // }
        fetchPatrons();
    })

    return (
        <VStack alignItems={"start"} p={"$3"} h={"$full"} gap={"$3"}>
            <Header />
            <HStack w={"$full"} flexGrow={"1"} gap={"$3"} fontSize={"14px"}>
                <Sidebar />
                <VStack flex={"1"} h="$full">
                    <Switch>
                        <Match when={state.isPatronSelected}>
                            <PatronCard />
                        </Match>
                        <Match when={!state.isPatronSelected}>
                            <PatronPageIntro />
                        </Match>
                    </Switch>
                </VStack>
            </HStack>
        </VStack>
    )
}