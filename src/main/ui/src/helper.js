import * as singleSpa from 'single-spa';

export function hashPrefix(prefix) {
    return function (location) {
        return location.hash.startsWith(`${prefix}`);
    }
}

export async function loadApp(name, hash, appURL, storeURL, globalEventDistributor, keycloak) {
    if (name === null) {
        console.warn('[Portal] App name is null, skip loading the app');
        return;
    }

    let storeModule = {}, customProps = {globalEventDistributor: globalEventDistributor, keycloak: keycloak};

    // try to import the store module
    try {
        console.log(`[Portal] Loading Store with URL ${storeURL}`);
        storeModule = storeURL ? await window.SystemJS.import(storeURL) : {storeInstance: null};
    } catch (e) {
        console.error(`Could not load store of app ${name}.`, e);
    }

    if (storeModule.storeInstance && globalEventDistributor) {
        console.log('[Portal] Setting store ' + storeModule.storeInstance);
        console.log('[Portal] Setting eventdistributor ' + globalEventDistributor);
        // add a reference of the store to the customProps
        customProps.store = storeModule.storeInstance;

        // register the store with the globalEventDistributor
        globalEventDistributor.registerStore(storeModule.storeInstance);
    } else {
        console.error('[Portal] One is not undef: ' + storeModule + ', ' + storeModule.storeInstance + ', ' + globalEventDistributor)
    }

    console.log('[Portal] Load app: %s, %s, %s, %s', name, appURL, storeURL, hash);
    singleSpa.registerApplication(name, () => window.SystemJS.import(appURL), hashPrefix(hash), customProps);
}