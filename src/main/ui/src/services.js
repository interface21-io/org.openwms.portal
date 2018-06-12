import {API_ROOT} from "./api-config";

export function loadWidgets(onSuccess, onError) {
    console.log('[Services] Loading ViewObjects');
    const apiUrl = `${API_ROOT}/view-objects`;
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            alert(data.message)
        } else {
            onSuccess(data);
        }
    })
    .catch(e => onError(new Error('Cannot load viewObjects. ' + e.message)));
}
