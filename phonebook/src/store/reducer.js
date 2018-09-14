const initialState = {
    page:'management',
    modalOpened: false,
    searchName: null,
    refreshPage: false,
    alertOpened: 'none',
};

const reducer = (state = initialState, action) => {
    if (action.type === 'NAVIGATION') {
        return {
            ...state,
            page: action.actualPage,
        }
    }

    if (action.type === 'MODIFY USER') {
        return {
            ...state,
            selectedUser: action.selectedUser,
            modalOpened: action.modalOpened,
            userType: action.userType,
        }
    }

    //Save modify or new User
    if (action.type === 'SAVE MODIFY') {
        return {
            ...state,
            refreshPage: action.refreshPage,
            alertOpened: action.alertOpened,
            modifyPerson: action.modifyPerson
        }
    }

    //Close Load Box
    if (action.type === 'CLICK CLOSE') {
        return {
            ...state,
            modalOpened: action.modalOpened,
            refreshPage: action.refreshPage,
            alertOpened: action.alertOpened
        }
    }

    if (action.type === 'DElETE BUTTON') {
        return {
            ...state,
            selectedUser: action.selectedUser,
            alertOpened: action.alertOpened
        }
    }

    return state;
};

export default reducer;
