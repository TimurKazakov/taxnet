import React from 'react';
import './ReturnButton.css';
import {withRouter} from 'react-router-dom'
import {clearFilterTitle} from "../../redux/actions/actions";
import {connect} from "react-redux";
import inputForceUpdate from '../Search/Search';


class  ReturnButton extends React.Component{

    returnButtonHandler(){
        this.props.endSearch();
        this.forceUpdate();
        document.getElementById('Search__input').value = "";
        return  this.props.history.push('/');
}

    render() {
        return (
            <button onClick={()=>this.returnButtonHandler()}
                    className={'ReturnButton'}>Назад</button>

        );
    }


}

function mapStateToProps(state) {
    return{
        filterTitle:state.filterTitle,
    }
}

function mapDispatchToProps(dispatch) {

    return{

        endSearch:()=>dispatch(clearFilterTitle())

    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withRouter( ReturnButton));