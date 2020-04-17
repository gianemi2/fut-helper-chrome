import { getOptions } from '../Helpers/Extension.js'

export default class Bot {
    constructor(maxSearches) {
        this.indicator
        this.running
        this.searches = 0;
        this.sleeping
        this.maxSearches = maxSearches
        this.flushtimeout = 0;

        this.showIndicator()
    }

    showIndicator() {
        this.indicator = document.createElement("div");
        const newContent = document.createTextNode("MACRO STATUS");
        this.indicator.classList.add('runningDisplay');
        this.indicator.appendChild(newContent);
        document.body.appendChild(this.indicator);
    }

    // Funzione di ricerca
    async macro() {
        // Inizio il processo. Alzo il prezzo minimo.
        await sleep(500);
        press(key('keyQ', 81));
        console.log('q');

        // Cerco e acquisto con la shortcut.
        await sleep(100);
        press(key("key2", 50));
        console.log('2');

        // Attendo due secondi e provo a mandare l'ipotetico giocatore nel mercato.
        await sleep(2000);
        press(key("keyZ", 90));
        console.log('z');
        //await multiplePresses(key("keyP", 80), 10, 50);

        // Attendo qualche ms e torno al mercato trasferimenti. Il giro è concluso
        await sleep(300);
        press(key("backSpace", 8));
        console.log('back');

        // Attendo 4s prima di far partire la prossima ricerca.
        await sleep(getRandomInt(3000, 7000));
    }

    handleIndicator() {
        if (this.sleeping) {
            this.indicator.classList.add('sleeping');
        } else {
            if (this.running) {
                this.indicator.classList.remove('sleeping');
                this.indicator.classList.add('active');
            } else {
                this.indicator.classList.remove('active');
            }
        }
    }

    async handleMaxIterations() {
        console.log(`${this.searches} > ${this.maxSearches}`)
        if (this.searches > this.maxSearches) {
            this.sleeping = true;
            this.running = false;
            this.handleIndicator();

            press(key('keyE', 69));

            /* if (document.querySelectorAll('.price-filter').length > 0) {
                document.querySelectorAll('.price-filter')[0].querySelector('input').value = 0;
            } */
            await sleep(getRandomInt(10000, 14000));
            this.running = true;
            this.sleeping = false;
            this.searches = 0;
            this.handleIndicator();
            this.run();
        }
    }

    async run() {
        while (this.running) {
            await this.macro();

            // Aumento il numero di ricerche effettuate.
            this.searches++;
            console.log(this.searches);
            this.handleMaxIterations();
        }
    }

    async toggle() {
        if (!this.running) {
            this.running = true;
            this.handleIndicator();
            this.flushTransferList();
            this.flushtimeout = setInterval(() => this.flushTransferList(), 1000 * 60 * 60)
            await sleep(5000);
            this.run();
        } else {
            this.running = false;
            this.sleeping = false;
            this.searches = 0;
            clearInterval(this.flushtimeout)
            this.flushtimeout = 0
            this.handleIndicator();
        }
        return this.running;
    }

    async flushTransferList() {
        getOptions('id', (items) => {
            const { id } = items
            if (id.length > 0) {
                const SESSID = id[0].value
                fetch('https://utas.external.s2.fut.ea.com/ut/game/fifa20/trade/sold', {
                    method: 'DELETE',
                    headers: {
                        'X-UT-SID': SESSID
                    }
                }).then(res => console.log(res.status))
            }
        })
    }
}

function key(kName, kCode) {
    const baseKeyEvent = {
        "altKey": false,
        "bubbles": true,
        "cancelBubble": false,
        "cancelable": true,
        "charCode": 0,
        "code": kName,
        "composed": true,
        "ctrlKey": false,
        "currentTarget": null,
        "defaultPrevented": false,
        "detail": 0,
        "eventPhase": 0,
        "isComposing": false,
        "isTrusted": true,
        "key": kName,
        "keyCode": kCode,
        "location": 0,
        "metaKey": false,
        "repeat": false,
        "returnValue": true,
        "shiftKey": false,
        "type": "keydown",
        "which": kCode
    };
    return baseKeyEvent;
}

// Delivera l'evento del keypress
function press(keyEvent) {
    document.dispatchEvent(new KeyboardEvent('keydown', keyEvent))
}

// Effettua un loop premendo più volte un tasto.
async function multiplePresses(keyEvent, times, sleepTime) {
    for (var i = 0; i < times; i++) {
        press(keyEvent);
        await sleep(sleepTime);
    }
}

// Ferma l'esecuzione del codice per n millisecondi
function sleep(ms) {
    var random = getRandomInt(ms * 0.90, ms * 1.10);
    return new Promise(resolve => setTimeout(resolve, random));
}

// Restituisce un int random tra il min e il max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

