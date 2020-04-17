import { saveOptions, handleNotifications } from './Helpers/Extension.js'

var lastRequest;
var isBotRunning;
var captchaSent = false;
var savedID = false
var username;

chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
    if (!savedID) {
        const { requestHeaders } = details
        if (typeof requestHeaders !== undefined) {
            const x_ut_sid = requestHeaders.filter((item) => {
                if (item.name === 'X-UT-SID') {
                    return item.value
                }
                return false;
            })
            if (x_ut_sid.length > 0) {
                saveOptions({ id: x_ut_sid })
                savedID = true;
            }
        }
    }
}, { urls: ["<all_urls>"] }, ["requestHeaders"])

chrome.webRequest.onCompleted.addListener((details) => {
    const { statusCode } = details;
    lastRequest = setupTimer(lastRequest)
    if (statusCode === 458) {
        if (!captchaSent) {
            // Do something if get captcha
            handleNotifications({
                notificationID: "got-captca",
                title: "You got a captcha!",
                message: "Open the website for solve it as soon as possible!",
                telegram: true
            })
            captchaSent = true;
        }
    }
}, { urls: ["<all_urls>"] })

const setupTimer = intervalID => {
    clearTimeout(intervalID)
    if (isBotRunning) {
        intervalID = setTimeout(() => {
            if (isBotRunning) {
                handleNotifications({
                    notificationID: 'bot-bugged',
                    title: "Your bot is freezed. ",
                    message: "Open the website for solve it as soon as possible! ",
                    telegram: true
                })
            }
        }, 60 * 1000);
    }
    return intervalID;
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.PAYLOAD) {
            case 'status':
                isBotRunning = request.status;
                setupTimer(lastRequest)
                break;
            case 'username':
                username = request.username;
            default:
                break;
        }
    }
);