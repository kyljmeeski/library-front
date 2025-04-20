import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

export const CurrentPageContext = createContext();

export default function CurrentPageProvider(props) {

    const currentRoute = window.location.pathname;
    const parts = currentRoute.split('/').filter(Boolean); // Split the pathname by '/' and remove empty elements
    const currentPage = (parts.length > 0) ? ('/' + parts[0]) : '/';
    const currentPatronTab = (parts.length > 1) ? (parts[1]) : 'personal';
    const currentItemTab = (parts.length > 1) ? (parts[1]) : '0';

    const [state, setState] = createStore({
        currentPage: currentPage,
        currentPatronTab: currentPatronTab, 
        currentItemTab: currentItemTab, 
    });

    const currentPageValue = [
        state, 
        {
            setCurrentPage(page) {
                setState("currentPage", page);
            },
            setCurrentPatronTab(tab) {
                setState("currentPatronTab", tab);
            }, 
            setCurrentItemTab(tab) {
                setState("currentItemTab", tab);
            }, 
        }
    ]

    return (
        <CurrentPageContext.Provider value={currentPageValue}>
            {props.children}
        </CurrentPageContext.Provider>
    )
}