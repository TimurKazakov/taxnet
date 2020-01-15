import React from 'react';
import  './FilmsList.css';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';


class FilmsList extends React.Component {
    state={
        filteredArray:this.props.films,
        previewCount:10,
        allFilmsCount: this.props.films.length,

    }

    countedMovies(moviesArray = this.state.filteredArray){
        return   this.renderFilms( moviesArray.filter((item, index)=>index<=this.state.previewCount));
    }
    addFilteredItemHandler=()=>{
        this.setState({
            previewCount:this.state.previewCount+10,
        })
    }
    bookmarkHandler=(event)=>{
            let title = event.target.closest('li').firstChild.innerHTML;

            localStorage.getItem(title)===null
                ?
                localStorage.setItem(title,title)
                :
                localStorage.removeItem(title);

        console.log(localStorage.getItem(title));


    }

    renderFilms(moviesArray=this.state.filteredArray){
        return   moviesArray.map((movie)=>{
            return (
                <li   className={'FilmsList__item'} key={movie.title}>
                    <Link  to={{
                        pathname: '/film/'+movie.title,
                        title: movie.title,
                    }}  className={'FilmsList__item__title'} >{movie.title}
                    </Link>
                    <div className={'FilmsList__item__tag-wrapper'}>
                        { movie.tags.map( function(item, index){ return(<label key={index}  className={'FilmsList__item__tag'}>{item}, </label>)})}
                    </div>
                    <img src={'logo192.png'} onClick={(event)=>this.bookmarkHandler(event)} className={'FilmsList__item__bookmark'}/>
                </li>
            )
        })
    }

    findMoviesByTag(){
        let tagFilter = this.state.filteredArray.filter((item)=>{
            let isSuitable = true;
            for (let i = 0; i <this.state.currentFilterTag.length ; i++) {
                if (!item.tags.join(", ").includes(this.state.currentFilterTag[i])){
                    isSuitable =false;
                }
            }

            return isSuitable;
        })

        this.setState({
            filteredArray : tagFilter,
        })
    }

    findMovieByTitle =(value)=>{

        let searchArray = this.props.location.search.slice(1).split('=');
        value = searchArray[1];

        let arr = this.state.filteredArray;
        let array = arr.filter((item)=>item.title.toLowerCase().includes(value.toLowerCase()));
        this.setState({
            filteredArray: array
        })

    }

    render() {
        let  disableButton=()=>{
            return((this.state.previewCount <this.state.filteredArray.length));
        }

        return (

            <div className={"FilmsList"}>
                <ul className={"FilmsList__list" } >
                    {this.countedMovies()}

                </ul>
                {disableButton()?
                    <button id={'addItemButton'} className={'FilmsList__button'} onClick={()=>this.addFilteredItemHandler()}>Показать еще</button>
                    :
                    null
                }
            </div>
        )

    }
}

function mapStateToProps(state) {
    return{
        films :state.films ,
        tags:state.tags,
        bookmarks: state.bookmarks,
        currentFilterTag:state.currentFilterTag,
        filterTitle:state.filterTitle,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        onAdd:()=>dispatch({type:'ADDBOOKMARK'}),


    }
}

export default  connect(mapStateToProps,mapDispatchToProps) (withRouter( FilmsList));