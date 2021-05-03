export const addorderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'create_order':
            return {
                loading: true
            }

        case 'order_success':
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case 'create_order_fail':
            return {
                loading: false,
                error: action.payload
            }

        case 'Remove_all_items_from_cart':
            return {}


        default:
            return state
    }
}