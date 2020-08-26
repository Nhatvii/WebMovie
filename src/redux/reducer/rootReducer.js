import {combineReducers} from 'redux'; 
import movieReducer from './movieReducer';
import aminationReducer from './aminationReducer';
const rootReducer = combineReducers({
    // nơi chứa các reducers con cho từng mục store con 
    movieReducer, aminationReducer
})

export default rootReducer;