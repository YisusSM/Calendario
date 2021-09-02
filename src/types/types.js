//objeto para centralizar todos los tipos de acciones
 
export const types = {

    uiOpenModal: '[ui] Open Modal',
    uiCloseModal: '[ui] Close Modal',

    eventAddNew: '[event] Add New',
    eventLogout: '[event] Clean Events',
    eventStartAddNew: '[event] Start Add New ',
    eventSetActive: '[event] Set Active',
    eventClearActiveEvent: '[event] Clear Active Event',
    eventUpdate: '[event] Event Updated',
    eventDelete: '[event] Event Deleted',
    eventLoaded: '[event] Event Loaded',


    authChecking: '[auth] Checking Login State',
    authCheckingFinish: '[auth] Finish Checking Login State',
    authStartLogin: '[auth] Start Login',
    authLogin: '[auth] Loign',
    authStartRegister: '[auth] Start Register',
    authStartJWTRenew: '[auth] Start Token Renew',
    authLogout: '[auth] Logout', 



}