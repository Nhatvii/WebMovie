import {combineReducers} from 'redux'; 
import movieReducer from './movieReducer';
import aminationReducer from './aminationReducer';
import movieDetailReducer from "./movieDetailReducer";
const rootReducer = combineReducers({
    // nơi chứa các reducers con cho từng mục store con 
    movieReducer, aminationReducer, movieDetailReducer
})

export default rootReducer;