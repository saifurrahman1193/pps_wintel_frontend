import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage
}

const initialState = {
    user: null,
    roles: [],
    permissions: [],
    breadcrumb: ''
}

const mainReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload?.user,
                roles: action.payload?.roles,
                permissions: action.payload?.permissions,
            };
        case 'SET_ROLE_PERMISSIONS':
            return {
                ...state,
                roles: action.payload?.roles,
                permissions: action.payload?.permissions
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                ...initialState
            }
        case 'SET_BREADCRUMB_DATA':
            return {
                ...state,
                breadcrumb: action.payload,
            }
        default:
            return state;
    }
}

const persistedReducer = persistReducer(persistConfig, mainReducer)

export default persistedReducer
