# UI Portal

The UI Portal project provides a framework for applications (Widget Providers) to expose
their own set of pages (aka Widgets) within a single web application. Widget Providers
don't need to bother with page layouts, security integration or other widely used
cross functionality, the UI Portal takes care of these things.

# Main Functionality

- **Page Layout**. The UI Portal pretends a page layout, consisting of a header pane and a
content pane. Future versions may offer to choose between multiple layouts, for example
with an additional menu tree pane or a footer pane.

- **Security**. The Authentication process is part of the UI Portal and doesn't taken into
account by Widget Providers. The Portal is responsible to authenticate the user via 3rd
party OAuth2 IAM, like self-hosted Keycloak or Auth0.

- **Technology agnostic**. Serving applications may expose the Widgets in varying frontend
technologies. The UI Portal must combine and integrate these different technologies and
make them work together.

- **Global State**. Widgets may need to share data or events. The Portal allows to share
data globally and has a built-in event propagation mechanism to publish events across
Widgets that are realized with different JavaScript frameworks.

# Screenshots

![Menu Expanded][1] | ![User Menu Expanded][2]
---- | -----------
An example of how applications integrate Widgets into the portal header | The user account menu item is already given by the portal.

# API

There are two ways to interact with the Portal, both driven by different use cases. At
first an applications wants to register itself with a set of pages (Widgets) in the Portal
. The second use case describes loading already registered Widgets and make them
accessible.

## Register Widgets in the Portal

When an application wants to be part of the Portal it needs to register the provided
Widgets with the Portal at startup time. The Portal offers a RESTful API that accepts JSON
for registering new Widgets with their corresponding menu items. To achieve this, an
application needs to send a `POST` request to the Portal service.

An example:
```
POST /view-objects HTTP/1.1
Content-Type: application/json;charset=UTF-8

[
  {
    "module": "Orders",
    "name": "Orders",
    "desc": "Order Management",
    "version": "1.0",
    "active": true,
    "thumb": "data:image/png;base64,...",
    "hash": "#/orders",
    "path": "orders/static/js/singleSpaEntry.js",
    "storeUrl": "orders/static/js/store.js",
    "menuItems": [
      {
        "name": "Receiving Orders",
        "route": "/orders/receiving"
      },
      {
        "name": "Shipping Orders",
        "route": "/orders/shipping"
      },
      {
        "name": "Picking Orders",
        "route": "/orders/picking"
      }
    ]
  }
]
```

Field | Description
----- | -----------
module | The unique name of the providing application
name   | An non-unique name used in the UI
desc   | An descriptive text of the providing application
version | The current version of the providing application
active | Is this Widget accessible or not
thumb  | A base64 image that is used to display the Widget in a management screen
hash   | The URL part the Widget is registered on
path   | The single-spa path to load the main application
storeUrl | The path to load the application's store, that is used globally
menuItems | An array of menu items used to populate the header
menuItems.name | The displayed menu item name
menuItems.route | The client-side route to load the Widget screen

## Widget Contract

Before an application can be registered with the Portal, the application needs to fulfill
some contract in order to provide the JavaScript files that are required to be loaded by
the Portal. This contract consists of two JavaScript files that the application must
provide.

*Note: The Portal uses [single-spa](https://single-spa.surge.sh/) as technology to load
and integrate Widgets of different technologies.

### Entry Point

Here an example of an application that provides the main entry point to the Portal.

```
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import Root from './root.component.js';

const reactLifecycles = singleSpaReact({
	React,
	ReactDOM,
	rootComponent: Root,
    domElementGetter,
});

export function bootstrap(props) {
	return reactLifecycles.bootstrap(props);
}

export function mount(props) {
	return reactLifecycles.mount(props).then((rootComponent) => {
    ...
    });
}

export function unmount(props) {
	return reactLifecycles.unmount(props);
}

function domElementGetter() {
	let el = document.getElementById('content-pane');
	if (!el) {
		el = document.createElement('div');
		el.id = 'content-pane';
		document.body.appendChild(el);
	}
	return el;
}
```

The main functions of the contract are required by single-spa:

bootstrap(props), mount(props), unmount(props)

Consult the documentation of the [single-spa](https://github.com/CanopyTax/single-spa)
library for more information.

### Store Provider

The concept of the store provider is an extension to single-spa. It makes absolutely sense
to manage the store of each application in a central place to be able to publish events
across applications.

The store is simple. In case of Reactjs a store provider from the application up to the
Portal could almost look like:

```
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {routerMiddleware} from "react-router-redux";
import history from './history';

const store = createStore(
    reducers,
    applyMiddleware(thunk, routerMiddleware(history))
);

export default store;
```

In this example we use Redux for internal store management and additionally Thunk to have
the store available in Redux actions. The store is exported in a file called store.js that
matches the `storeUrl` field in the registration.

[1]: src/main/docs/images/menu-expanded.png
[2]: src/main/docs/images/user-menu-expanded.png
