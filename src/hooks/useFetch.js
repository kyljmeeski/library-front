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

export const createDirection = async (name) => {
    try {
        const response = await fetch(BASE_URL + "api/directions/", {
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
            console.log("Error while creating direction: " + error);
            return {};
        }
    } catch (error) {
        console.log("Error while creating direction: " + error);
        return {};
    }
};

export const updateBook = async (id, book) => {
    try {
        const response = await fetch(BASE_URL + `api/books/${id}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while updating book: " + error);
            return {};
        }
    } catch (error) {
        console.log("Error while updating book: " + error);
        return {};
    }
};

export const createBook = async (book) => {
    try {
        const response = await fetch(BASE_URL + "api/books/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            console.log("Error while creating new book: " + error);
            return {};
        }
    } catch (error) {
        console.log("Error while create new book: " + error);
        return {};
    }
};



export const fetchReaders = async () => {
    try {
        const response = await fetch(BASE_URL + "api/users", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`
            }
        });
        if (response.ok) {
            const users = await response.json();
            return users.filter((user) => user["role"] === "reader");
        } else {
            const error = await response.text();
            console.log("Error while fetching readers: " + error);
            return [];
        }
    } catch (error) {
        console.log("Error while fetching readers: " + error);
        return [];
    }
};

export const createReader = async (reader) => {
    try {
        return await fetch(BASE_URL + "api/users/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reader)
        });
    } catch (error) {
        console.log("Error while create new reader: " + error);
        return {};
    }
};

export const updateReader = async (id, reader) => {
    try {
        return await fetch(BASE_URL + `api/users/${id}/`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reader)
        });
    } catch (error) {
        console.log("Error while updating reader: " + error);
        return {};
    }
};


export const createIssue = async (bookId, readerId) => {
    try {
        return await fetch(BASE_URL + "api/issues/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "book_id": bookId,
                "reader_id": readerId
            })
        });
    } catch (error) {
        console.log("Error while creating issue: " + error);
        return {};
    }
};

export const fetchIssues = async () => {
    try {
        const response = await fetch(BASE_URL + "api/issues/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log("Error while fetching issues: " + await response.json());
            return [];
        }
    } catch (error) {
        console.log("Error while fetching issues: " + error);
        return [];
    }
};

export const fetchReturns = async () => {
    try {
        const response = await fetch(BASE_URL + "api/returns/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
            }
        });
        if (response.ok) {
            return await response.json();
        } else {
            console.log("Error while fetching issues: " + await response.json());
            return [];
        }
    } catch (error) {
        console.log("Error while fetching issues: " + error);
        return [];
    }
};

export const fetchBorrowedIssues = async () => {
    try {
        const issues = await fetchIssues();
        const returns = await fetchReturns();
        return issues.filter(issue => !returns.some(aReturn => aReturn["issue"]["id"] === issue["id"]));
    } catch (error) {
        console.log("Error while fetching issues: " + error);
        return [];
    }
};

export const createReturn = async (issueId) => {
    try {
        return await fetch(BASE_URL + "api/returns/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "issue_id": issueId
            })
        });
    } catch (error) {
        console.log("Error while creating return: " + error);
        return {};
    }
};

