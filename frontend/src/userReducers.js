export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'login_request':
            return { loading: true }

        case 'login_successful':
            return { loading: false, userInfo: action.payload }

        case 'login_failed':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const userregisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'register_request':
            return { loading: true }

        case 'register_successful':
            return { loading: false, userInfo: action.payload }

        case 'register_failed':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}