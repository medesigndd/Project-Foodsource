import { SEARCH_DATA, SEARCH_FAVORITE } from './types';

export const updateSearchText = (text) => {
    return {
        type: SEARCH_DATA,
        payload: text
    };
}

export const updateSearchFavorite = (favorite) => {
    return {
        type: SEARCH_FAVORITE,
        payload: favorite
    };
}


