import { STATUS_LOADING, STATUS_LOADED } from './types';

export function statusLoading() {
    return {
        type: STATUS_LOADING,
    };
};
export function statusLoaded() {
    return {
        type: STATUS_LOADED,
    };
};