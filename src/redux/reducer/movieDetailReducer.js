
const stateDefault = {
    listCinemaSchedule:[
        
    ],
}
const movieDetailReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case 'GET_LIST_CINEMA_SCHEDULE':{
            state.listCinemaSchedule = action.data;  
            return {...state}; 
        }
        default:
            return {...state};
    }
}

export default movieDetailReducer;