const initialState = {
    page:'management',
};

const reducer = (state = initialState, action) => {
    if (action.type === 'NAVIGATION') {
        return {
            ...state,
            page: action.actualpage
        }
    }

    if (action.type === 'SEARCH NAME') {
        return {
            ...state,
            searchName: action.searchname
        }
    }

    if (action.type === 'MODIFY USER') {
        return {
            ...state,
            selectedUser: action.selectedUser
        }
    }

    if (action.type === 'Add USER') {
        return {
            ...state,
            newUser: action.selectedUser
        }
    }

    return state;
};

export default reducer;
