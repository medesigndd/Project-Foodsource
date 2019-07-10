import { NAV_LEFT_MENU_RENDER, NAV_LEFT_MENU_SIZE } from './types';

export const renderNavLeftMenu = (docked, open) => {
    return {
        type: NAV_LEFT_MENU_RENDER,
        payload: { open, docked }
    };
}

export const renderNavLeftMenuSize = (width, height) => {
    return {
        type: NAV_LEFT_MENU_SIZE,
        payload: { width, height }
    };
}
