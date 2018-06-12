import {GlobalEventDistributor} from "./globalEventDistributor";
import {loadApp} from "./helper";
import * as singleSpa from "single-spa";
import {CONTEXT_PATH} from "./api-config";

let ApiUtils = {

    init: async function(widgets) {
        const globalEventDistributor = new GlobalEventDistributor();
        const domain = CONTEXT_PATH.substring(0, CONTEXT_PATH.lastIndexOf('/'));

        for (let w of widgets) {
            if (w.active) {
                await loadApp(w.module, w.hash, domain + w.path, domain + w.storeUrl, globalEventDistributor);
            }
        }

        singleSpa.start();
    }
};
export { ApiUtils as default };