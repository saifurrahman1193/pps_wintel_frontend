/**
* @param {object} data
*/
export const SET_USER_DATA = (data) => ({
    type: 'SET_USER_DATA',
    payload: data
});



/**
  * @param {object} data
  */
export const SET_ROLE_PERMISSIONS = (data) => ({
    type: 'SET_ROLE_PERMISSIONS',
    payload: data
});

export const USER_LOGOUT = () => ({
  type: 'USER_LOGOUT',
  payload: null
})


export const SET_BREADCRUMB_DATA = (data) => ({
  type: 'SET_BREADCRUMB_DATA',
  payload: data
});