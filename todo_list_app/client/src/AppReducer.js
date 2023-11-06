export const USER_EVENTS = {
    LOGIN: "login",
    LOGOUT: "logout",
    REGISTER: "register"
}

export const TODO_EVENTS = {
    CREATE_TODO: "create_todo",
    DELETE_TODO: "delete_todo",
    TOGGLE_COMPLETED: "toggle_completed",
    FETCH_TODOS: "fetch_todos"


}

function userDispatch(user, action) {
    switch (action.type) {
        case USER_EVENTS.LOGIN:
        case USER_EVENTS.REGISTER:
            return action.payload;
        case USER_EVENTS.LOGOUT:
            return '';
        default:
            return user;
    }
}

function todoDispatch(todos, action) {
    switch (action.type) {
        case TODO_EVENTS.CREATE_TODO:
            return [action.payload, ...todos];
        case TODO_EVENTS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id);
        case TODO_EVENTS.TOGGLE_COMPLETED:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                   return {...action.payload}
                }
                return {...todo};
            });
        case TODO_EVENTS.FETCH_TODOS:
            return action.payload;
        default:
            return todos;
    }
}

export default function appReducer(state, action) {
    return {
        user: userDispatch(state.user, action),
        todos: todoDispatch(state.todos,action)
    };
}
