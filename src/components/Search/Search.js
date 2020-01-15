import React from 'react';
import  './Search.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { filterTitle} from "../../redux/actions/actions";


class Search extends React.Component{

    removeTag=(tag)=>{
        let arr = this.props.currentFilterTag;
         arr.splice(arr.indexOf(tag),1);
         this.props.currentFilterTag = arr;
    };

    renderTags(){
        if (this.props.currentFilterTag.length >0){
        return(
            this.props.currentFilterTag.map((item)=>{
                return(
                    <button className={'Search__tags__btn'} onClick={()=>this.removeTag(item)}>item</button>
                )
            })
        )
        }
    };

    onSubmitHandler=(event)=>{
        // event.preventDefault();
        let value =document.getElementById('Search__input').value;
        this.props.onSearch(value);
        this.props.history.push('/search?title='+value);
    };

    render() {
            return(
        <form   id={'Search__form'} className={'Search'}>
            <input defaultValue={this.props.filterTitle} id={'Search__input'} type="text" className={'Search__field'}/>
            <input

                id={'Search__submit'} type="submit" className={'Search__btn'} onClick={(event)=>this.onSubmitHandler(event)}/>
            <div className={'Search__tags__wrapper'}>
                {this.props.currentFilterTag ? this.renderTags(): null}
            </div>
        </form>
    )
    }
}
function mapStateToProps(state) {

    return{
        filterTitle:state.filterTitle,
        currentFilterTag:state.currentFilterTag,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        onSearch:(title)=>{
            dispatch(filterTitle(title))
        },
    }
}



export default   connect(mapStateToProps,mapDispatchToProps) (withRouter(Search));
