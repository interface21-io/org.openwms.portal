import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";

import store from './store';
import history from './history';
import Portal from "./components/Portal";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import Auth from './components/Auth/Auth';
import {BrowserRouter, Route} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import Callback from "./components/Callback/Callback";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
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
                        return <Portal auth={auth} />
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


