const createElementFromObject = (html) => {
    const { element, className, text, data } = html;
    const htmlelement = document.createElement(element)
    if (className) {
        if (Array.isArray(className)) {
            htmlelement.classList.add(...className)
        } else {
            htmlelement.classList.add(className)
        }
    }
    if (text) {
        htmlelement.innerText = text
    }
    if (typeof data === 'object') {
        for (const key in data) {
            htmlelement[key] = data[key];
        }
    }

    return htmlelement
}
export default createElementFromObject