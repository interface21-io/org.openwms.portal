const hostname = window && window.location && window.location.hostname;
export const API_ROOT = hostname.startsWith('localhost') ? process.env.REACT_APP_API_ROOT : 'https://'+hostname+'/api/view-objects';
export const CONTEXT_PATH = process.env.PUBLIC_URL;