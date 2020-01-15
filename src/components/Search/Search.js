import React from 'react';
import  './Search.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { filterTitle,removeTag} from "../../redux/actions/actions";


class Search extends React.Component{

    removeTag=(event)=>{
        event.preventDefault();
        event.stopPropagation();

        // event.currentTarget.style.display='none';
        this.props.onRemoveTag(event.target.innerHTML)
    };

    renderTags(){
        if (this.props.currentFilterTag){
        return(
            this.props.currentFilterTag.map((item, index)=>{
                return(
                    <button key={index}  className={'Search__tags__btn'} onClick={(event)=>this.removeTag(event)}>{item}</button>
                )
            })
        )
        }
    };

    onSubmitHandler=(event)=>{
        event.preventDefault();
        let value =document.getElementById('Search__input').value;
        this.props.onSearch(value);
        this.props.history.push('/search?title='+value);
    };


    render() {
            let innerText =this.props.location.pathname.match(new RegExp('^/search')) ?  this.props.filterTitle: "";

            return(
                <div className={'Search'}>
        <form onSubmit={(event)=>this.onSubmitHandler(event)}  id={'Search__form'} className={'Search__form'}>
            <input defaultValue={innerText} id={'Search__input'} type="text" className={'Search__field'}/>
            <input

                id={'Search__submit'} type="submit" className={'Search__btn'} />

        </form>
                <div className={'Search__tags__wrapper'}>
            {this.props.currentFilterTag
                ?
                this.renderTags()
                :
                null
            }
    </div>
                </div>
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
        onRemoveTag:(tag)=>{dispatch(removeTag(tag))}

    }
}



export default   connect(mapStateToProps,mapDispatchToProps) (withRouter(Search));





