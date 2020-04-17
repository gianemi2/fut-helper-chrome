var botTOKEN = '1128584999:AAHi8AJtLaMVl0urUBQ7KFkhfARCN4Pzt10';
var chatID = '-1001278522137';

/**
 * 
 * @param {string or array} optionsToGet 
 * @param {function} callback 
 */
export const getOptions = (optionsToGet, callback) => {

    chrome.storage.sync.get(optionsToGet, items => {
        callback(items)
    })
}

/**
 * 
 * @param {object} options 
 * @param {string} message
 */
export const saveOptions = (options, container = false, message = "Options saved.") => {
    chrome.storage.sync.set(options, () => {
        if (container) {
            handleStatusMessage(container, message)
        }
    });
}

/**
 * 
 * @param {string} message 
 */
export const handleStatusMessage = (container, message) => {
    container.textContent = message;
    container.classList.remove('hidden');

    setTimeout(function () {
        container.classList.add('hidden');
    }, 3000);
}

/**
 * 
 * @param {object} object every notifications required info 
 */
export const handleNotifications = ({ notificationID, title, message, telegram = false }) => {
    createChromeNotification({ notificationID, title, message })
    if (telegram) {
        sendTelegramMessage(title)
    }
}

/**
 * 
 * @param {string} telegramMessage
 */
export const sendTelegramMessage = text => {
    var endpoint = `https://api.telegram.org/bot${botTOKEN}/sendMessage?chat_id=${chatID}&text=${text}`
    fetch(endpoint)
}

/**
 * 
 * @param {object} object every notifications required info
 */
export const createChromeNotification = ({ notificationID, title, message }) => {
    chrome.notifications.create(notificationID, {
        type: 'basic',
        iconUrl: 'https://www.easports.com/fifa/ultimate-team/web-app/images/logo/dark/ea_sports_logo.png',
        title,
        message
    })
}