import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";

import store from './store';
import history from './history';
import Portal from "./components/Portal";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

import Amplify, {Auth} from 'aws-amplify';

//Amplify.configure({Auth: aws_exports});

Amplify.configure({
    Auth: {
        // REQUIRED - Amazon Cognito Identity Pool ID
        identityPoolId: 'eu-central-1:2f8f2988-148b-4760-b34c-079ade83056b',
        // REQUIRED - Amazon Cognito Region
        region: 'eu-central-1',
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'eu-central-1_KQGvKBl9z',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '74f8grqafhols2tg9koaeeqg82',
    }
});
const handleAuthentication = (nextState, replace) => {
    Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => console.log(user))
        .catch(err => console.log(err));
};

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <BrowserRouter history={history} component={Portal}>
                    <Portal />
            </BrowserRouter>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('portal')
);

registerServiceWorker();


