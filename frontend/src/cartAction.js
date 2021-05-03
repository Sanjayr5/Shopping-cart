import axios from 'axios';

export const addtoCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/item/${id}`)
    dispatch({
        type: 'Add_item_to_cart',
        payload: {
            item: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            qty
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removefromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: 'Remove_item_from_cart',
        payload: id,
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeallitemsfromCart = () => (dispatch, getState) => {
    dispatch({
        type: 'Remove_all_items_from_cart',
        payload: null,
    })
    localStorage.removeItem('cartItems')
}