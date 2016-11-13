import * as t from './action-types';
import findIndex from 'lodash/findIndex';

export default (state = [], action = {}) => {
    switch (action.type) {
        case t.ADD:
            {
                return [
                    ...state, {
                        id: Math.random().toString(36).substring(7),
                        type: action.message.type,
                        text: action.message.text
                    }
                ];
            }

        case t.DELETE:
            {
                const index = findIndex(state, {
                    id: action.id
                });
                if (index >= 0) {
                    return [
                        ...state.slice(0, index),
                        ...state.slice(index + 1)
                    ];
                }
                return state;
            }

        case t.DELETE_ALL:
            {
                return [];
            }

        default:
            return state;
    }
};
