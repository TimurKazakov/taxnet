import React from 'react';
import  './Film.css';
import {withRouter} from 'react-router-dom';
import ReturnButton from "../ReturnButton/ReturnButton";


 class Film extends React.Component{

     bookmarksHandler(){
         if (localStorage.getItem(this.props.location.title)===null) {
             localStorage.setItem(this.props.location.title, this.props.location.title);
             this.forceUpdate()
         } else {
             localStorage.removeItem(this.props.location.title);
             this.forceUpdate()
         }
     }

     render() {
         const  title  = this.props.location.title;

         let filmInBookmarks=()=>localStorage.getItem(title)!==null;


    return   (
        <div className={'Film'}>
            <ReturnButton/>
            <div className={'Film__container'}>
                <div className={'Film__poster'} style={{background:this.props.location.background}}></div>
                <div className={'Film__descr'}>
                    <h1 className={'Film__title'}>{title}</h1>
                    {filmInBookmarks()?
                        <button onClick={()=>this.bookmarksHandler()} className={'Film__bookmark Film__bookmark--add'}>Удалить из закладок</button>
                    :
                        <button onClick={()=>this.bookmarksHandler()} className={'Film__bookmark Film__bookmark--delete'}>Добавить в закладки</button>
                    }


                </div>
            </div>
        </div>
    )
     }
 }



export default  withRouter(Film);


