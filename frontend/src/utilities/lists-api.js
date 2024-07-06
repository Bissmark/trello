import sendRequest from "./send-request";
const BASE_URL = "/lists";

// Index
export function getAll() {
    return sendRequest(BASE_URL);
}

// Create
export function create(list) {
    return sendRequest(BASE_URL, "POST", list);
}