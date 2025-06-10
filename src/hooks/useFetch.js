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
            const error = await response.text();
            console.log("Error while fetching books: " + error);
            return [];
        }
    } catch (error) {
        console.log("Error while fetching books: " + error);
        return [];
    }
};

export const fetchAuthors = async () => {
    try {
        const response = await fetch(BASE_URL + "api/authors", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while fetching authors: " + error);
            return [];
        }
    } catch (error) {
        console.log("Error while fetching authors: " + error);
        return [];
    }
};

export const fetchPublishers = async () => {
    try {
        const response = await fetch(BASE_URL + "api/publishers", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while fetching publishers: " + error);
            return [];
        }
    } catch (error) {
        console.log("Error while fetching publishers: " + error);
        return [];
    }
};

export const fetchDirections = async () => {
    try {
        const response = await fetch(BASE_URL + "api/directions", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while fetching directions: " + error);
            return [];
        }
    } catch (error) {
        console.log("Error while fetching directions: " + error);
        return [];
    }
};
