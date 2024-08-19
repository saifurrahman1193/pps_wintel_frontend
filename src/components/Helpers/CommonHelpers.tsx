import { postCall } from '../../api/apiService'
import { ME, CREATE_ACTIVITY_LOG } from '../../api/apiPath'

import moment from 'moment';

export const jsDateToYMD = (datetime) => {
    if (!datetime) return null;
    const date = datetime.getDate();
    const month = datetime.getMonth() + 1; //Be careful! January is 0 not 1
    const year = datetime.getFullYear();
    const dateString = year + "-" + (month + '').padStart(2, '0') + "-" + (date + '').padStart(2, '0');
    return dateString
}


export const getCurrentYear = () => {
    return (moment().format('yy'));
}

export const getCurrentTime = () => {
    const today = moment();
    return today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}




export const timeCalculator = (time) => {
    let [hour, min, seconds] = time.split(":")

    let ampm = 'am'
    let finalResult = ''

    if (time == '00:00:00') finalResult = ['12:00 am'] // midnight
    else if (time == '12:00:00') finalResult = ['12:00 pm'] // midnight
    else {
        if (parseInt(hour) > 12) { hour = (parseInt(hour) % 12).toString(); ampm = 'pm' }
        else if (parseInt(hour) > 0) { hour = hour.toString(); ampm = 'am' }
        finalResult = hour.padStart(2, '0') + ':' + min.padStart(2, '0') + ' ' + ampm
    }

    return finalResult;
}




export const getNumbersInArray = (start = 0, end = 0, gap = 1, targetLength = 0, padString = '0') => {
    let finalResult = []
    for (let i = start; i <= end; i = i + gap) {
        finalResult[i] = i.toString().padStart(targetLength, padString)
    }
    return finalResult;
}

export const getWeekFullDays = () => {
    let finalResult = ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    return finalResult;
}

export const timeGenerator = (hour = 0, min = 0, ampm = 'am') => {
    let finalResult = ''
    if (parseInt(hour) == 12 && parseInt(min) == 0 && ampm == 'am') finalResult = '00:00:00' // midnight
    else if (parseInt(hour) == 12 && parseInt(min) == 0 && ampm == 'pm') finalResult = '12:00:00' // midday
    else {
        if (parseInt(hour) == 12 && parseInt(min) >= 0 && ampm == 'am') hour = '00' // midnight
        else if (parseInt(hour) == 12 && parseInt(min) >= 0 && ampm == 'pm') hour = '12'  // noon
        else if (ampm == 'pm') hour = (12 + parseInt(hour)).toString()  // after 12 pm
        finalResult = hour + ':' + min + ':00'
    }
    return finalResult;
}

export const timeSplit = (time = '00:00:00') => {
    let [hour, min, seconds] = time.split(":")

    let ampm = 'am'
    let finalResult = ''

    if (time == '00:00:00') finalResult = ['12', '00', 'am'] // midnight
    else if (time == '12:00:00') finalResult = ['12', '00', 'pm'] // midday
    else {
        if (parseInt(hour) > 12) { hour = (parseInt(hour) % 12).toString(); ampm = 'pm' }
        else if (parseInt(hour) > 0) { hour = hour.toString(); ampm = 'am' }
        finalResult = [hour.padStart(2, '0'), min.padStart(2, '0'), ampm]
    }

    return finalResult;
}

export const arrToLowerCase = (arr = []) => {
    return arr.map(str => str.toLowerCase());
}

export const downloadFileWithLink = (href) => {
    let link = document.createElement("a");
    let name = (href?.split("/") || [])
    name = name[name?.length - 1]
    link.setAttribute('download', name);
    link.href = href;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

export const getToday = () => {
    return moment().format('yy-MM-DD')
}

export const getYesterday = () => {
    return moment().add(-1, 'days').format('yy-MM-DD')
}

export const getTomorrow = () => {
    return moment().add(1, 'days').format('yy-MM-DD')
}


export const permission_routes = [
    { pathname: '/users', permission: 'user list' },
    { pathname: '/roles', permission: 'role list' },
    { pathname: '/permissions', permission: 'permission list' },
    { pathname: '/handset-users', permission: 'handset user list' },

]

export const checkPermissionsWiseRouteChecker = (props) => {
    const current_pathname = window.location.pathname || ''

    const permission_route = permission_routes?.find((item) => {
        return item?.pathname == current_pathname
    })

    if (!(props?.permissions?.includes(permission_route?.permission))) {
        window.location.href = '/dashboard'
    }
}

// every 1 minutes it hit api to check if the user is really authenticated
export const permissionsResets = async (props, options = { checkPermissionsWiseRouteChecker: true }) => {
    const response = await postCall(ME, {}, props?.user?.access_token)
    if (response?.code === 200) {
        props.me(response?.data)
    }

    if (options?.checkPermissionsWiseRouteChecker !== false) {
        checkPermissionsWiseRouteChecker(props)
    }
}


// log generating common function
// user_id int(11) 
// log_type_id int(11) 
// hit_map varchar(200) 
// page varchar(200) 
// page_url varchar(200) 
// api_path text 
// api_request longtext 
// api_response longtext 
// user_agent varchar(200) 
export const createActivityLog = async (props, formData) => {
    const response = await postCall(CREATE_ACTIVITY_LOG, { ...formData, user_id: props?.user?.userId }, props?.user?.access_token)
    if (response?.code === 200) {
        console.log('Log generated!');
    }
    else {
        console.error('Log generation failed!');
    }
}
// usage
// import { permissionsResets, createActivityLog, getCrrentUrlFull } from '../components/Helpers/CommonHelpers'
// createActivityLog(props, {log_type_id:2, hitmap:'page', page:breadcrumb?.pageTitle, pageurl:getCrrentUrlFull()})


export const userAgent = navigator.userAgent;

// export const ip_address = ip.address()


export const json_formatter = (str = '') => {

    str = JSON.stringify(str, null, 4)

    return str
};

// Date related

export const LastMonthFirstDate = () => {
    return moment().subtract(1, 'months').startOf('month').format('yyyy-mm-dd');
}

export const LastMonthLastDate = () => {
    return moment().subtract(1, 'months').endOf('month').format('yyyy-mm-dd');
}

export const LastMonthName = () => {
    return moment().subtract(1, 'months').format('MMMM');
}

export const getTodayStartTime = () => {
    return moment().startOf('day').format('yy-MM-DD HH:mm:ss')
}

export const getTodayEndTime = () => {
    return moment().endOf('day').format('yy-MM-DD HH:mm:ss')
}

export const getSpecificDateTimeAMPM = (datetime) => {
    return moment(datetime).format('yy-MM-DD hh:mm A')
}

// export const getOneDateIsSameOrAfterAnotherDate = (datetime, datetime2) => {

//     moment(datetime)

//     return 
// }


// language related
export const convertEngToBangla = (str = '') => {

    str = str?.replace(/Day|Days|day|days/gi, 'দিন') || ''
    str = str?.replace(/Hour|Hours|hour|hours/gi, 'ঘন্টা') || ''

    str = convertEngToBanglaNumber(str)

    return str
}

export const convertEngToBanglaNumber = (str = '') => {

    const finalEnlishToBanglaNumber = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };

    let retStr = str;
    for (const x in finalEnlishToBanglaNumber) {
        retStr = retStr.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    }
    return retStr;
}


export const badge_colors = ['badge-soft-primary', 'badge-soft-info', 'badge-soft-success', 'badge-soft-danger']



// log generating common function
// user_id int(11) 
// log_type_id int(11) 
// hit_map varchar(200) 
// page varchar(200) 
// page_url varchar(200) 
// api_path text 
// api_request longtext 
// api_response longtext 
// user_agent varchar(200) 
// export const createActivityLog = async (props, formData) => {
//     const response = await postCall(CREATE_AUDIT_LOG, {...formData, user_id : props?.user?.userId}, props?.user?.access_token)
//     if (response?.code === 200) {
//         console.log('Log generated!');
//     }
//     else{
//         console.error('Log generation failed!');
//     } 
// }
// // usage
// // import { permissionsResets, createActivityLog, getCrrentUrlFull } from '../components/Helpers/CommonHelpers'
// // createActivityLog(props, {log_type_id:2, hit_map:'page', page:breadcrumb?.pageTitle, page_url:getCrrentUrlFull()})


export const capitalizeFirstLetter = (string='') => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

