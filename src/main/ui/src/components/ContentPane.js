import React from 'react';
import {connect} from 'react-redux'

class ContentPane extends React.Component {

    render() {
        return (
            <span id='content-pane'></span>
        )
    }
}

const mapStateToProps = (state, props) => (
    {
        routes: state.routes,
        portal: state.portal,
    }
);

const mapDispatchToProps = (dispatch) => (
    {
    }
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentPane)