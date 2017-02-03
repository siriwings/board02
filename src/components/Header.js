import React from 'react';
import {Link, IndexLink} from 'react-router';
import Auth from '../modules/Auth';

const styles = {
    backgroundColor: '#6a1b9a',
    fontColor:'#FFFFFF',
    textAlign: 'center'
};
const Header = ({onLogout}) => (

    <div className="navbar-fixed">
        <nav style={styles}>
            <div className="nav-wrapper">
                <IndexLink className="left" to="/">HOME</IndexLink>
                <ul className="right">
                    <li className="active"><Link to="/">PROFILE</Link></li>
                    <li><Link to="/">WORK</Link></li>
                    <li><Link to="/">GIT</Link></li>
                    <li><Link to="#" id="sidevar" data-activates="slide-out"><i
                        className="material-icons">menu</i></Link></li>
                </ul>
                {document.cookie ? (
                        <ul id="slide-out" className="side-nav">
                            <li className="username" style={styles}>{Auth.getName('session')}</li>
                            <li><Link to="/board">BOARD</Link></li>
                            <li><Link to="/post">POST</Link></li>
                            <li><Link to="/admin">ADMIN</Link></li>
                            <li><Link to="/logout" onClick={onLogout}>LOGOUT</Link></li>
                        </ul>
                    ) : (
                        <ul id="slide-out" className="side-nav">
                            <li style={styles}><Link className="login" to="/login">LOGIN</Link></li>
                            <li><Link to="/board">BOARD</Link></li>
                            <li><Link to="/memo">MEMO</Link></li>
                        </ul>)
                }
            </div >
        </nav >
    </div>

);


export default Header;

