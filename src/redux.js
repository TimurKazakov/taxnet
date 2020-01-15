const redux = require('redux');


const reducer =(state =initialState, action)=>{

    switch (action.type) {
        case  'ADDBOOKMARK':
            return {
                bookmarks: state.bookmarks.push({title:'dsjks'}),
                ...state,

            };
        case  'SUBBOOKMARK':
            return {
                num:state.num-1254,
                ...state
            }

        default: {
            return state
        }
    }
}


const store = redux.createStore(reducer);

// Actions
const addBookmarks ={
    type:'ADDBOOKMARK'

}
const subBookmarks ={
    type:'SUBBOOKMARK'

}
console.log('was',store.getState());
store.dispatch(addBookmarks);

console.log('become',store.getState());
store.dispatch(subBookmarks);
console.log('sub',store.getState());