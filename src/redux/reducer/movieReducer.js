import * as ActionType from './../constants/ActionType'; 

const initialState = {
    listFilmSapChieu:[

    ], 

    listFilmDangChieu: [

    ], 

    listFilmHot: [

    ],

    currentFilmHot: {}, 

    isLoading: true
}

const movieReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionType.GET_LIST_FILM_DANG_CHIEU:{
            state.listFilmDangChieu = [...action.data];
            return {...state}; 
        }

        case ActionType.GET_LIST_FILM_SAP_CHIEU:{
            return {...state}; 
        }

        case ActionType.GET_LIST_FILM: {
            let listFilmDangChieuTemp = [...state.listFilmDangChieu]; 
            let listFilmSapChieuTemp = [...state.listFilmSapChieu]; 

            for (let i in action.data){
                let dateNow = new Date(); 
                let dateOfElement = new Date(action.data[i].ngayKhoiChieu + "Z"); 
                if (dateNow > dateOfElement){
                    listFilmDangChieuTemp.push(action.data[i]); 
                } else {
                    listFilmSapChieuTemp.push(action.data[i]); 
                }
            }

            state.listFilmDangChieu = listFilmDangChieuTemp; 
            state.listFilmSapChieu = listFilmSapChieuTemp; 

            let listFilmHotTemp = [...listFilmDangChieuTemp].sort((a, b) => a.danhGia - b.danhGia);
            listFilmHotTemp.splice(0, listFilmHotTemp.length - 6); 
            state.listFilmHot = listFilmHotTemp; 
            state.currentFilmHot = listFilmHotTemp[0];

            state.isLoading = false;
            return {...state};
        }

        case ActionType.CHANGE_CURRENT_HOT_FILM: {
            state.currentFilmHot = {...action.data};
            return {...state};
        }

        default: return {...state};

    }
}

export default movieReducer;