import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import './App.css';
import Film from "./components/Film/Film";
import Search from "./components/Search/Search";
import FilmsList from "./components/FilmsList/FilmsList";
import Tab from "./components/Tab/Tab";
import {withRouter} from 'react-router-dom';
import ReturnButton from "./components/ReturnButton/ReturnButton";



class App extends React.Component{
    render() {
        return (
            <div className="App">
                <Search/>
                <hr/>
                { !this.props.location.pathname.match(new RegExp('^/search')) ?
                 <ul className={'App__navigation--list'}>
                    <NavLink exact to={'/'}>Все фильмы</NavLink>
                    <NavLink to={'/bookmarks'}>Закладки</NavLink>
                    {/*<NavLink to={'/search'}>Search</NavLink>*/}
                </ul>
                :<ReturnButton/>
                }
                <hr/>
                <Route path={'/'} exact render={ ()=> <Tab>
                        <FilmsList films={this.props.films}/>
                    </Tab>} />
                <Route path={'/bookmarks'}  render={()=> <Tab>
                        <FilmsList films={this.props.bookmarks}/>
                    </Tab>} />
                {/*<Route path={'/search'}  render={()=> <Tab>*/}
                {/*    <FilmsList films={this.props.films}/>*/}
                {/*</Tab>} />*/}
                <Route path={'/film/:title'} exact render={(props) => <Film title={props.name} {...props} />}/>
                {this.props.children}
            </div>
        );
    }
}

export default   (withRouter(App));
