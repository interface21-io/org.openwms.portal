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

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure({Auth: aws_exports});

const handleAuthentication = (nextState, replace) => {
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


