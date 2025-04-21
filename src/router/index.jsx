import { Route, Routes } from "@solidjs/router";
import Dashboard from "../pages/Dashboard";
import Circulation from "../pages/Circulation";
import Items from "../pages/Items";
import Patrons from "../pages/Patrons";
import Personal from "../features/patrons/tabs/Personal";
import Access from "../features/patrons/tabs/Access";
import Notes from "../features/patrons/tabs/Notes";
import Statistics from "../features/patrons/tabs/Statistics";
import One from "../features/items/tabs/One";
import Two from "../features/items/tabs/Two";
import Zero from "../features/items/tabs/Zero";


export default function AppRouter() {

window.HOST_ADDRESS = "http://localhost:8080/api";

return (
    <Routes>
        <Route path="/">
            <Route path="" element={<Items />} />
        </Route>
        <Route path="/circulation">
            <Route path="" element={<Circulation />} />
        </Route>
        <Route path="/items" element={<Items />}>
            <Route path="" element={<Zero />} />
            <Route path="0" element={<Zero />} />
            <Route path="1" element={<One />} />
            <Route path="2" element={<Two />} />
           
          
        </Route>
        <Route path="/patrons" element={<Patrons />}>
            <Route path="" element={<Personal />} />
            <Route path="personal" element={<Personal />} />
            <Route path="access" element={<Access />} />
            <Route path="notes" element={<Notes />} />
            <Route path="statistics" element={<Statistics />} />
        </Route>
    </Routes>
)
}
