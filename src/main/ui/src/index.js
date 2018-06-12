import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "react-router-redux";

import store from './store';
import history from './history';
import Portal from "./components/Portal";
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import {HashRouter} from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <HashRouter>
                <Portal />
            </HashRouter>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(
    app,
    document.getElementById('portal')
);

registerServiceWorker();


