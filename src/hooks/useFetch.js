const BASE_URL = "http://176.126.164.165:8000/";
const TOKEN = localStorage.getItem("access_token");

export const fetchBooks = async () => {
    try {
        const response = await fetch(BASE_URL + "api/books", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log((await response).text());
            return [];
        }
    } catch (error) {
        console.log(error);
        return [];
    }
};
