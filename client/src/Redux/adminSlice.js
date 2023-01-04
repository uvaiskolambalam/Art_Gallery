


import Cookies from "js-cookie";
export function adiminSlice(
    state = Cookies.get("adminData") ? JSON.parse(Cookies.get("adminData")) : null,
    action


){
    switch (action.type){
        case "ADMIN_LOGIN":
            return action.payload;
        case "ADMIN_LOGOUT":
            return null

            default:
                return state
    }
}
