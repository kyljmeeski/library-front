import { useNavigate } from "@solidjs/router";
import { useContext } from "solid-js";
import { CurrentPageContext } from "../providers/CurrentPageProvider";

export default function useOpen() {

    const navigate = useNavigate();

    const [state, { setCurrentPage, setCurrentPatronTab , setCurrentItemTab} ] = useContext(CurrentPageContext);

    const open = (path) => {
        navigate(path);
        setCurrentPage(path);
    }

    const openPatronTab = (tab) => {
        navigate(tab);
        setCurrentPatronTab(tab);
    }

    const openItemTab = (tab) => {
        navigate(tab);
        setCurrentItemTab(tab);
    }

    return (
        { open, openPatronTab, openItemTab }
    )
}