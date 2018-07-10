import * as types from './actionTypes';

function dispatchTemplate(fakeData) {
    return {type: types.GET_FAKE_DATA, fakeData};
}

export function getFakeData() {
    return function(dispatch) {
        dispatch(dispatchTemplate({
            name: "jacky",
            age: 25
        }));
    };
}