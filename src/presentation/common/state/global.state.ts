import { ProductEntity } from "../../../domain/product/entity";


// i combine cart and auth state for now,
// should be separated..
export type GlobalState = {
    carts: Array<ProductEntity>;
    isAuthenticated: boolean;
}

export const INITIAL_STATE : GlobalState = {
    carts: [],
    isAuthenticated: false,
}

export const globalStateReducer = (state = INITIAL_STATE, action : any) => {
    switch(action.type){
        case "ADD_TO_CART":
            const temp = [...state.carts];
            temp.push(action.payload.product)
            return {
                ...state,
                carts: temp
            }
        case "CLEAR_CART": 
            return {
                ...state,
                carts: []
            }
        case "SET_AUTH": 
            return {
                ...state,
                isAuthenticated: true,
            }
        case "CLEAR_AUTH":
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state;
    }
}