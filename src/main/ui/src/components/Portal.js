import React, {Component} from 'react';
import {connect} from 'react-redux'
import ContentPane from "./ContentPane";
import HeaderMenu from "./HeaderMenu";
import {loadWidgets, resolveUserInfo} from "../actions/index";
import {Auth} from 'aws-amplify';

class Portal extends Component {

    componentDidMount() {
        this.props.init();
        this.props.fetchWidgets();
    }

    logout() {
        Auth.signOut()
            .then()
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <HeaderMenu user={this.props.user} logout={this.logout} />
                <ContentPane user={this.props.user} />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => (
    {
        routes: state.routes,
        portal: state.portal,
        visible: true,
        user: state.user
    }
);

const mapDispatchToProps = (dispatch) => (
    {
        init: () => {
            dispatch(resolveUserInfo())
        },
        fetchWidgets: () => {
            dispatch(loadWidgets())
        },
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((Portal))