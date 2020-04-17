import { saveOptions } from '../js/Helpers/Extension'

// Saves options to chrome.storage
const handleSaveClick = (container = false) => {
    const options = {
        username: document.getElementById('username').value
    }
    saveOptions(options, container);
}

/**
 * Load manifest version, must be set on bootstrap.
 */
const loadManifestVersion = () => {
    const manifestSpan = document.getElementById('manifestVersion');
    manifestSpan.innerText = chrome.runtime.getManifest().version;
}


const restoreOptions = () => {
    chrome.storage.sync.get(defaultOptions, (items) => {
        for (const option in items) {
            document.getElementById(option).value = items[option];
        }
    });
}

const defaultOptions = {
    username: 'Fifa user'
}

const bootstrap = () => {
    const statusContainer = document.getElementById('status')
    document.addEventListener('DOMContentLoaded', restoreOptions);
    document.getElementById('save').addEventListener('click',
        () => handleSaveClick(statusContainer));

    loadManifestVersion();
}
bootstrap();