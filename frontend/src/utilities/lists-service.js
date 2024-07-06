import * as listsAPI from './lists-api';

export async function getAll() {
    return listsAPI.getAll();
}

export async function create(list) {
    return listsAPI.create(list);
}