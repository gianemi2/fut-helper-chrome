// Global variable
// delete sold players route https://utas.external.s2.fut.ea.com/ut/game/fifa20/trade/sold
import Bot from './Class/Bot.js'
import FutbinHelper from './Class/Futbin.js';
import Tasks from './Class/Tasks.js'

import { createSearchByID, createSearchResults } from './Components/index.js'

var map = {};
const bot = new Bot(10)
const futbin = new FutbinHelper();
const tasks = Tasks;

onkeydown = onkeyup = async function (e) {
	map[e.keyCode] = e.type == 'keydown';
	if (map[17] && map[77]) {
		const running = bot.toggle();

		sendStatusToBackground(running)
		var username = document.querySelector('.view-navbar-clubinfo-name').innerText;
		sendUsernameToBackground(username);
	}
}

// Tutte le funzioni da lanciare all'avvio
export function bootstrap() {
	//showIndicator();
	futbin.ping()
}

function sendStatusToBackground(botStatus) {
	chrome.runtime.sendMessage(
		{
			PAYLOAD: 'status',
			status: botStatus
		}
	);
}

function sendUsernameToBackground(username) {
	chrome.runtime.sendMessage(
		{
			PAYLOAD: 'username',
			username: username
		}
	)
}

document.addEventListener('click', async ({ target }) => {
	const classes = target.classList;
	if (classes.contains('js-searching-by-id')) {
		handleSearchAction()
	}
	if (classes.contains('js-save-searching-by-id')) {
		alert('save pressed!');
		return true;
	}
})

const handleSearchAction = async () => {
	const name = document.querySelector('.js-search-by-id').value;
	if (name.length > 3) {
		const results = await futbin.searchPlayer(name)
		createSearchResults(results);
	} else {
		alert('Digita almeno 3 caratteri.');
	}
	return true;
}

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		if (mutation.attributeName === "class") {
			var attributeValue = mutation.target.classList;
			if (attributeValue.contains("ut-player-search-control")) {
				if (tasks.searchByID() == false && tasks.cooldown == false) {
					createSearchByID();
					tasks.cooldown = setTimeout(() => tasks.cooldown = false, 1000);
				}
			}
		}
	});
});

observer.observe(document.body, {
	attributes: true,
	subtree: true,
});