import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";

import store from './store';
import history from './history';
import Portal from "./components/Portal";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import * as AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import {CognitoUserPool} from "amazon-cognito-identity-js";
import {BrowserRouter, Route} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Callback from "./components/Callback/Callback";
import appConfig from "./auth-config";

//const auth = new Auth();

var poolData = {
    UserPoolId : appConfig.UserPoolId,
    ClientId : appConfig.ClientId
};
var userPool = new CognitoUserPool(poolData);


const handleAuthentication = (nextState, replace) => {

    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
        cognitoUser.getSession(function(err, session) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('session validity: ' + session.isValid());

            // NOTE: getSession must be called to authenticate user before calling getUserAttributes
            cognitoUser.getUserAttributes(function(err, attributes) {
                if (err) {
                    // Handle error
                } else {
                    // Do something with attributes
                }
            });


        });
    } else {

        var authenticationData = {
            Username : appConfig.username,
            Password : appConfig.password,
        };
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        var userData = {
            Username : appConfig.username,
            Pool : userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();

                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = '<region>';

                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId : '...', // your identity pool id here
                    Logins : {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>' : result.getIdToken().getJwtToken()
                    }
                });

                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    } else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                    }
                });
            },


            newPasswordRequired: function(userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                userAttributes['given_name'] = appConfig.givenName
                cognitoUser.completeNewPasswordChallenge(appConfig.password, userAttributes);
            },



            onFailure: function(err) {
                alert(err.message || JSON.stringify(err));
            },

        });
    }


/*
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
*/
};

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BrowserRouter history={history} component={Portal}>

                <div>
                    <Route path="/callback" render={(props) => {
                        handleAuthentication(props);
                        return <Callback {...props} />
                    }}/>

                    <Route path="/*" render={(props) => {
                        handleAuthentication(props);
                        return <Portal auth={{}} />
                    }}/>
                </div>

            </BrowserRouter>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('portal')
);

registerServiceWorker();


