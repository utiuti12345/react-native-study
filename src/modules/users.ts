import {Dispatch} from "redux";

interface User {
    id:number;
    name:string;
}

export function createInitialState():User[] {
    return [];
}

const SET_USERS = 'users/set' as const;

export function setUsers(users:User[]) {
    return{
        type:SET_USERS,
        payload:{
            users
        }
    }
}

export async function retrieveUsers(dispatch:Dispatch) {
    const response = await fetch('https://example.com/api/users');
    const users = await response.json();
    dispatch(setUsers(users));
}

type Action = ReturnType<typeof setUsers>

export default function reducer(state=createInitialState(),action:Action) {
    switch (action.type) {
        case SET_USERS:
            return action.payload.users;
        default:
            return state;
    }
}
