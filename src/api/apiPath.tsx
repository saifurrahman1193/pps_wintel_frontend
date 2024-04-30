// User Route
export const LOGIN = '/login'
export const FORGOT_PASSWORD_REQUEST = '/forgot-password-request'
export const FORGOT_PASSWORD_CODE_VERIFY = '/forgot-password-code-verify'
export const PASSWORD_RESET = '/password-reset'

export const LOGOUT = '/logout'
export const CHANGE_PASSWORD = '/changePassword'
export const UPDATE_PROFILE = '/profileUpdate'
export const ME = '/me'


// users route
export const USERS = '/getAllUsers_p'
export const CREATE_USER = '/createUser'
export const SINGLE_USER_INFO = '/getUser'
export const UPDATE_USER = '/updateUser'

// roles route
export const ROLES_P = '/role/getAllRoles_p'
export const ROLES_ALL = '/role/getAllRoles'
export const ROLE_DELETE = '/role/deleteRole'
export const SINGLE_ROLE_INFO = '/role/getRole'
export const UPDATE_ROLE = '/role/updateRole'
export const CREATE_ROLE = '/role/createRole'

// permission routes
export const PERMISSION_ALL = '/permission/getAllpermissions'
export const PERMISSION_P = '/permission/getAllPermissions_p'
export const CREATE_PERMISSION = '/permission/createPermission'
export const SINGLE_PERMISSION_INFO = '/permission/getPermission'
export const UPDATE_PERMISSION = '/permission/updatePermission'


// permission modules routes
export const MODULE_ALL = '/module/getAllModules'

// Activity log
export const CREATE_ACTIVITY_LOG = '/activity-log/createActivityLog'
export const ALL_ACTIVITY_LOG_P = '/activity-log/getAllActivityLog_p'
export const ALL_ACTIVITY_SUPPORT_DATA = '/activity-log/activity-support-data'


// Notifications
export const MY_NOTIFICATIONS = '/notifications/getMyNotifications'
export const UPDATE_ALL_MY_NOTIFICATIONS_AS_VIEWED = '/notifications/updateAllMyNotificationsAsViewed'
export const UPDATE_SPECIFIC_NOTIFICATION_AS_VIEWED = '/notifications/updateSpecificNotificationAsViewed'


//LIST 
export const USER_LIST = '/list/getAllUserList'
export const CLIENT_LIST_B_O_OPERATOR_CONN_TYPE = '/list/getClientBOOperatorConnType'
export const LOG_TYPES = '/list/getLogTypes'
