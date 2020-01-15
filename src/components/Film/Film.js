import React from 'react';
import  './Film.css';
import {withRouter} from 'react-router-dom';
import ReturnButton from "../ReturnButton/ReturnButton";


 class Film extends React.Component{
     render() {
         const  title  = this.props.location.title;

    return   (
        <div className={'Film'}>
            <ReturnButton/>
            <div className={'Film__container'}>
                <div className={'Film__poster'}></div>
                <div className={'Film__descr'}>
                    <h1 className={'Film__title'}>{title}</h1>
                    <button className={'Film__bookmark Film__bookmark--add'}>Удалить из закладок</button>
                    <button className={'Film__bookmark Film__bookmark--delete'}>Добавить в закладки</button>
                </div>
            </div>
        </div>
    )
     }
 }



export default  withRouter(Film);


