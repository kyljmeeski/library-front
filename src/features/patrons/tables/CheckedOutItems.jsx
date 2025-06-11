import {Button, notificationService, Table, Tbody, Td, Th, Thead, Tr} from "@hope-ui/solid";
import axios from "axios";
import {For, useContext} from "solid-js";
import {CurrentPatronContext} from "../../../providers/CurrentPatron";
import useOpen from "../../../hooks/useOpen";

export default function CheckedOutItems() {

    const [state, { items, setItems, fetchItems, fetchArchivedItems, setArchiveItems }] = useContext(CurrentPatronContext);

    const { open, openPatronTab } = useOpen();

    const checkInItem = async (checkedInItem) => {
        try {
            await axios.post(window.HOST_ADDRESS + "/circulation/check-in?item-id=" + checkedInItem.id);
            setItems((prevItems) => prevItems.filter((item) => item.id !== checkedInItem.id));
            notificationService.show({
                status: "success", 
                title: "Успешно возвращено.", 
            });
        } catch (error) {
            console.log(error);
        }
    }

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
                        Действия
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                <For each={items()}>{(item) => 
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
                            <Button size={"sm"} onClick={() => {checkInItem(item)}}>
                                Вернуть
                            </Button>
                        </Td>
                    </Tr>
                }</For>
            </Tbody>
        </Table>
    )
}
