import React, {Component} from 'react';
import {connect} from 'react-redux'
import ContentPane from "./ContentPane";
import HeaderMenu from "./HeaderMenu";
import {loadWidgets, resolveUserInfo} from "../actions/index";
import {Auth} from 'aws-amplify';
import loginTheme from './LoginDialogTheme';
import {
    Authenticator,
    ConfirmSignIn,
    ConfirmSignUp,
    ForgotPassword,
    Greetings,
    Loading,
    RequireNewPassword,
    SignUp,
    TOTPSetup,
    VerifyContact
} from 'aws-amplify-react';

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
        let comp;
        if (this.props.user && this.props.user.username) {
            comp = 
                <div>
                    <HeaderMenu user={this.props.user} logout={this.logout} />
                    <ContentPane user={this.props.user} />
                </div>;
        } else {
            comp = <div></div>
        }
        return (
            <div>
                <Authenticator
                    hide={
                        [
                            Greetings,
                            ConfirmSignIn,
                            RequireNewPassword,
                            SignUp,
                            ConfirmSignUp,
                            VerifyContact,
                            ForgotPassword,
                            TOTPSetup,
                            Loading
                        ]
                    }
                    theme={loginTheme}
                >
                {comp}
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
        user: state.user,
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