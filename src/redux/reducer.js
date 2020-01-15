import { ADDTAG, CLEARFILTERTITLE, FILTERTITLE,  REMOVETAG,} from "./actions/actionTypes";

import films from './films'
import tags from './tags'
const initialState={
    films : films,
    tags:tags,
    currentFilterTag:[],
    filterTitle:'',
}

export default function reducer(state =initialState, action) {

    switch (action.type) {

        case ADDTAG:
            let arr = state.currentFilterTag ||[];
            if (!state.currentFilterTag.includes(action.payload)) {
                arr = state.currentFilterTag.concat([action.payload]);
            }
            return {
                ...state,
                currentFilterTag: arr,

            };
        case REMOVETAG:
            let array =state.currentFilterTag;

            let RemovedArray = array.filter(function(item){

                if (item !==action.payload){
                    return true;
                }
                return false;
            });



            return {
                ...state,
                currentFilterTag: RemovedArray,

            };
        case CLEARFILTERTITLE:
            let clear = [];
            return {
                ...state,
                filterTitle: clear,


            };
        case FILTERTITLE:

            return {
                ...state,
                filterTitle: action.payload,

            };

        default:
            return state
    }

}