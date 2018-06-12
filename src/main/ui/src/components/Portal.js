import React, {Component} from 'react';
import {connect} from 'react-redux'
import ContentPane from "./ContentPane";
import HeaderMenu from "./HeaderMenu";
import {loadWidgets} from "../actions/index";

class Portal extends Component {

    componentDidMount() {
        this.props.fetchWidgets();
    }

    render() {
        return (
            <div>
                <HeaderMenu user={{}} logout={this.props.logout} />
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