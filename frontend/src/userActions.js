import axios from 'axios'
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'login_request'
        })
        const { data } = await axios.post(
            '/login/',
            { 'username': email, 'password': password },
            { headers: { 
                'Content-type': 'application/json'
                       }
            }
        )
        dispatch({
            type: 'login_successful',
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'login_failed',
            payload: 'Login Failed. Please check the credentials.'
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'register_request'
        })
        const { data } = await axios.post(
            '/register/',
            { 'name': name, 'email': email, 'password': password },
            {headers: {
                'Content-type': 'application/json'
                    }
            }
        ) 
        dispatch({
            type: 'register_successful',
            payload: data
        })

        dispatch({
            type: 'login_successful',
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'register_failed',
            payload: 'Registration Failed'
        })
    }
}

export const google_login = (data) => async (dispatch) => {
    try {
        dispatch({
            type: 'google_login_successful',
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: 'google_login_failed',
            payload: 'Login Failed. Please try again.'
        })
    }
}