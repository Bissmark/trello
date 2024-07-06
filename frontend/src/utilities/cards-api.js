import sendRequest from "./send-request";
const BASE_URL = "/cards";

export function addCard(card) {
  return sendRequest(BASE_URL, "POST", card);
}