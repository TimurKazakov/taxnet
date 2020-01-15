import { ADDTAG, CLEARFILTERTITLE, FILTERTITLE,  REMOVETAG} from "./actionTypes";


export function addTag(tag) {
    return{
        type:ADDTAG,
        payload:tag,
    }
}
export function removeTag(tag) {

    return{
        type:REMOVETAG,
        payload:tag,
    }
}
export function filterTitle(title) {

    return {
        type: FILTERTITLE,
        payload: title,
    };
}
export function clearFilterTitle() {

    return{
        type:CLEARFILTERTITLE,

    }
}
