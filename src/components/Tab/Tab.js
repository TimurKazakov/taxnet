import React from 'react';
import './Tab.css';


export default (props)=>{

    return(
        <div className={'Tab'}>
            {props.children}
        </div>
    )
}