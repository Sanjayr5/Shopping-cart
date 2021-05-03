export const cartReducer = (state = {cartItems:[]}, action) => {
    switch(action.type){
        case 'Add_item_to_cart':
            const cart_item = action.payload
            const existItem =  state.cartItems.find((x) => x.item === cart_item.item)

            if(existItem){
                return{
                    ...state,
                    cartItems: state.cartItems.map(x => x.item === existItem.item ? cart_item : x)
                }
            } 
            else {
                return { ...state, cartItems: [...state.cartItems, cart_item] }
            }
        case 'Remove_item_from_cart':
            return {
                ...state,
                cartItems:state.cartItems.filter((x) => x.item !== action.payload)
            }
        case 'Remove_all_items_from_cart':
            return {
            ...state, cartItems: []
        }

        default:
            return state
} }