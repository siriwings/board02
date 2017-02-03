import React, {PropTypes} from 'react';
import {Header} from 'components';
import Auth from './modules/Auth';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {logoutRequest} from 'actions/authentication';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }


    //로그인 바로 직후와 새로고침 시 띄워주는 토스트 메세지
    componentDidMount() {
        $("#sidevar").sideNav({
                menuWidth: 300, // Default is 300
                edge: 'right', // Choose the horizontal origin
                closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                draggable: true // Choose whether you can drag to open on touch screens
            }
        );

        // get username from cookie
        if (document.cookie) {
            Materialize.toast(`Welcome, ${Auth.getName('session')}`, 2000);
        }
    }

    handleLogout() {
        this.props.logoutRequest().then(
            () => {
                Materialize.toast('Good Bye!', 2000);
                browserHistory.push('/');
            }
        );
    }


    /**
     * Render the component.
     */
    render() {
        return (
            <div>
                <div>
                    <Header onLogout={this.handleLogout}/>
                </div>
                {this.props.children}
            </div>
        );
    }

}

App.propTypes = {
    children: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


