import * as cardsAPI from '.cards-api';

export async function addCard(card) {
    return cardsAPI.addCard(card);
}