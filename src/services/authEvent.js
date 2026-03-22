


let _logoutHandler = null;

export const setLogoutHandler = (handler) => {
    _logoutHandler = handler;
};

export const triggerLogout = () => {
    if (_logoutHandler) {
        _logoutHandler();
    }
};
