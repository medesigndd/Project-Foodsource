import { NAV_LEFT_MENU_RENDER, NAV_LEFT_MENU_SIZE } from '../actions/types';

const INITIAL = { open: false, docked: false, width: 0 };

export default (state = INITIAL, action) => {
    switch (action.type) {
        case NAV_LEFT_MENU_RENDER:
            //console.log(`open : ${action.payload.open} | docked : ${action.payload.docked} | width : ${action.payload.width}`);
            return {
                ...state,
                open: action.payload.open,
                docked: action.payload.docked,
            };
        case NAV_LEFT_MENU_SIZE:
            //console.log(`open : ${action.payload.open} | docked : ${action.payload.docked} | width : ${action.payload.width}`);
            return {
                ...state,
                width: action.payload.width,
                height: action.payload.height
            };
        default:
            return state;
    }
}