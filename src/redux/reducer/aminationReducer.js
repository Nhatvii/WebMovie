import * as ActionType from './../constants/ActionType'; 

const initialState = {
    posterHotFilmFade: false
}

const aminationReducer = (state = initialState, action) =>{
    switch(action.type){
        case ActionType.TURN_ON_FADE_POSTER_HOT_FILM:{
            state.posterHotFilmFade = true; 

            return {...state};
        }

        case ActionType.TURN_OFF_FADE_POSTER_HOT_FILM: {
            state.posterHotFilmFade = false; 

            return {...state}; 
        }

        default: {
            return {...state};
        }
    }
}

export default aminationReducer;