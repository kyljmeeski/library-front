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

export const createAuthor = async (first_name, last_name, middle_name) => {
    try {
        const response = await fetch(BASE_URL + "api/authors/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "is_deleted": false,
                "first_name": first_name,
                "last_name": last_name,
                "middle_name": middle_name
            })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while creating author: " + error);
            return {};
        }
    } catch (error) {
        console.log("Error while creating author: " + error);
        return {};
    }
};

export const createPublisher = async (name) => {
    try {
        const response = await fetch(BASE_URL + "api/publishers/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "is_deleted": false,
                "name": name
            })
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while creating publisher: " + error);
            return {};
        }
    } catch (error) {
        console.log("Error while creating publisher: " + error);
        return {};
    }
};
