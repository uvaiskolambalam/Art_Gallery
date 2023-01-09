
import {combineReducers} from 'redux'
import { userSlice } from './UserSlice'
import { PostSlice } from './PostSlice'
import {adiminSlice} from './adminSlice'
import {userAllDetails} from './UserAllDetails'


const rootReducer=combineReducers({
    user:userSlice,
    post:PostSlice,
    userAllDetails: userAllDetails,
    admin:adiminSlice

})
export default rootReducer