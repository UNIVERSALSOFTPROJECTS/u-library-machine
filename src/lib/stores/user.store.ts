import { writable } from 'svelte/store';
const initialUserState = sessionStorage.getItem('sessionUser');

const userData = initialUserState ? JSON.parse(initialUserState) : null;
console.log("initialUserState",userData);


export const sessionUser = writable(userData);

sessionUser.subscribe(value => {
    if (value) {
      sessionStorage.setItem('sessionUser', JSON.stringify(value));
    } else {
      sessionStorage.removeItem('sessionUser');
    }
});