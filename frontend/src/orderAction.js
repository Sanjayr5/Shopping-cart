import axios from 'axios'

export const addOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: 'create_order'
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const { data } = await axios.post(
            `/addorders/`,
            order,
            { headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }}
        )

        dispatch({
            type: 'order_success',
            payload: data
        })

        dispatch({
            type: 'Remove_all_items_from_cart',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'create_order_fail',
            payload: 'Order Failed. Please Try Again'
        })
    }
}