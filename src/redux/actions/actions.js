import {ADDBOOKMARK, ADDTAG, CLEARFILTERTITLE, FILTERTITLE, REMOVEBOOKMARK, REMOVETAG} from "./actionTypes";

export function addBookmark(title) {
    return{
        type:ADDBOOKMARK,
        payload:title,
    }
}
export function removeBookmark(title) {
    return{
        type:REMOVEBOOKMARK,
        payload:title,

    }
}
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
