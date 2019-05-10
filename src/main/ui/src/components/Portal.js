import React, {Component} from 'react';
import {connect} from 'react-redux'
import ContentPane from "./ContentPane";
import HeaderMenu from "./HeaderMenu";
import {loadWidgets} from "../actions/index";
import {Authenticator, withAuthenticator} from 'aws-amplify-react';
import aws_exports from '../aws-exports';

class Portal extends Component {

    componentDidMount() {
        this.props.fetchWidgets();
    }

    render() {
        return (
            <div>
                <Authenticator
                    amplifyConfig={aws_exports}
                >
                    <HeaderMenu user={{}} logout={{}} />
                    <ContentPane user={{}} />
                </Authenticator>
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
)(withAuthenticator(Portal))