import React from 'react';
import './FilmsList.css';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {addTag, } from "../../redux/actions/actions";


class FilmsList extends React.Component {


    componentDidMount() {

    }

    state={
        filteredArray:this.props.films,
        previewCount:10,
        allFilmsCount: this.props.films.length,
        bookmarksArray:this.bookmarksArrayProvider(),

    }
    // bookmarks logic
    bookmarksArrayProvider(){
        let bookmarksArray = [];

        for (let key in localStorage){
            for (let i = 0; i <this.props.films.length ; i++) {
                if (key === this.props.films[i].title){
                    bookmarksArray.push(this.props.films[i]);
                    break
                }
            }
        }

        return  bookmarksArray
    }
    bookmarkHandler=(event)=>{
        let title = event.target.closest('li').firstChild.innerHTML;

        if (localStorage.getItem(title)===null) {
            localStorage.setItem(title, title);
            event.target.classList.add('add');
            this.forceUpdate();
        } else {
            localStorage.removeItem(title);
            event.target.classList.remove('add');
            this.forceUpdate();
        }



    }
    //add button
    addFilteredItemHandler=()=>{
        this.setState({
            previewCount:this.state.previewCount+10,
        })
    }

    tagHandler=(event)=>{
            if (event.target.classList.contains('FilmsList__item__tag')) {
                // this.props.history.push('/searchbytag');
                this.props.onAddTag(event.target.innerHTML.trim());
            }
    }

    //render list with handler
    renderFilms(moviesArray=this.props.films){
        return   moviesArray.map((movie)=>{
            return (
                <li   className={'FilmsList__item'} key={movie.title}>
                    <Link  to={{
                        pathname: '/film/'+movie.title,
                        title: movie.title,
                        background: `rgba(${Math.floor( Math.random()*255)},${Math.floor( Math.random()*255)},${Math.floor( Math.random()*255)})`,
                    }}  className={'FilmsList__item__title'} >{movie.title}
                    </Link>
                    <div className={'FilmsList__item__tag-wrapper'} onClick={(event)=>this.tagHandler(event)}>
                        { movie.tags.map( function(item, index){ return(<label key={index}   className={'FilmsList__item__tag'}>{item} </label>)})}
                    </div>
                    <div  onClick={(event)=>this.bookmarkHandler(event)} className={ (localStorage.getItem(movie.title)===null)?'FilmsList__item__bookmark':'FilmsList__item__bookmark add'}/>
                </li>
            )
        })
    }
    // render logic
    countedMovies(moviesArray = this.props.films){
        return   this.renderFilms( moviesArray.filter((item, index)=>index<=this.state.previewCount));
    }
    findMoviesByTag(arr=this.props.films){

        let tagFilter = arr.filter((item)=>{
            let isSuitable = true;
            for (let i = 0; i <this.props.currentFilterTag.length ; i++) {

                if (!item.tags.join(" ").includes(this.props.currentFilterTag[i].trim())){
                    isSuitable =false;
                }
            }

            return isSuitable;
        })

       return tagFilter;
    }
    findMovieByTitle =()=>{

        let searchArray = this.props.location.search.slice(1).split('=');
        let value = searchArray[1] ||'';

        let arr = this.state.filteredArray;
        return  arr.filter((item)=>item.title.toLowerCase().includes(value.toLowerCase()));



    }

    render() {
        let  disableButton=()=>{
            return((this.state.previewCount <arrayToRender().length));}
        let arrayToRender=()=>{

            let path = this.props.location.pathname;
            if (path==='/' || path==='/searchbytag')
            {
                return  this.findMoviesByTag();

            }
            else if (path==='/bookmarks')  {

                return   this.findMoviesByTag( this.state.bookmarksArray);
            }
            else{
              let arr=  this.findMovieByTitle();
               arr=  this.findMoviesByTag(arr);
                return arr;
            }


        }

        return (
            <div className={"FilmsList"}>
                <ul className={"FilmsList__list" } >
                    {this.countedMovies(arrayToRender())}
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
        onAddTag:(tag)=>dispatch(addTag(tag)),


    }
}

export default  connect(mapStateToProps,mapDispatchToProps) (withRouter( FilmsList));