import { Table, Tbody, Td, Th, Thead, Tr } from "@hope-ui/solid"
import { For, createEffect, createSignal, useContext } from "solid-js"
import { CurrentPatronContext } from "../../../providers/CurrentPatron";

export default function ArchivedItems() {

    const [state, { archivedItems, fetchItems, fetchArchivedItems }] = useContext(CurrentPatronContext);
    const [queryPath, setQueryPath] = createSignal(window.HOST_ADDRESS + "/patrons/" + state.currentPatron.studentNumber + "/items");
    createEffect(() => setQueryPath(window.HOST_ADDRESS + "/patrons/" + state.currentPatron.studentNumber + "/archive"));
    createEffect(() => fetchArchivedItems(queryPath()));

    return (
        <Table dense highlightOnHover>
            <Thead>
                <Tr>
                    <Th>
                        Идентификатор
                    </Th>
                    <Th>
                        Название
                    </Th>
                    <Th>
                        Выдано
                    </Th>
                    <Th>
                        Срок возврата
                    </Th>
                    <Th>
                        Дата возврата
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <For each={archivedItems()}>{(item) => 
                    <Tr>
                        <Td>
                            { item.id }
                        </Td>
                        <Td>
                            { item["245-a"] } ({ item["id"] }) автор { item["100-a"] }
                        </Td>
                        <Td>
                            { item.issuedAt }
                        </Td>
                        <Td>
                            { item.dueTo }
                        </Td>
                        <Td>
                            { item.returnDate }
                        </Td>
                    </Tr>
                }</For>
            </Tbody>
        </Table>
    )
}
