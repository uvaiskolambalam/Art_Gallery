
import {combineReducers} from 'redux'
import { alertsSlice } from './AlertSlice'
import { userSlice } from './UserSlice'
import { PostSlice } from './PostSlice'
import {adiminSlice} from './adminSlice'
import {userAllDetails} from './UserAllDetails'


const rootReducer=combineReducers({
    // alerts:alertsSlice.reducer,
    // user:userSlice.reducer
    user:userSlice,
    post:PostSlice,
    userAllDetails: userAllDetails,
    admin:adiminSlice

})
export default rootReducer