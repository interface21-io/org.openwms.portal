import React, {Component} from 'react';
import {connect} from 'react-redux'
import ContentPane from "./ContentPane";
import HeaderMenu from "./HeaderMenu";
import {loadWidgets} from "../actions/index";

class Portal extends Component {


    componentDidMount() {
        const { renewSession, isAuthenticated, login } = this.props.auth;

        if (localStorage.getItem('isLoggedIn') !== 'true') {
            renewSession();
        }

        if (!isAuthenticated()) {
            console.log('Not authenticated');
            login();
        }

        this.props.fetchWidgets();
    }

    render() {
        const { logout } = this.props.auth;

        return (
            <div>
                <HeaderMenu user={{}} logout={logout} />
                <ContentPane user={{}} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        routes: state.routes,
        portal: state.portal,
        visible: true,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        fetchWidgets: () => {
            dispatch(loadWidgets())
        },
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Portal)