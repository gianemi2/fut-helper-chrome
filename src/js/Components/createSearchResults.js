import { createElementFromObject } from '../Helpers/index.js'

const createSearchResults = (results) => {
    const searchResults = createElementFromObject({ element: 'ul', className: 'resultList' });
    const searchContainer = document.querySelector('.search-node .price-filter');

    searchResults.innerHTML = '';

    if (results.length > 0) {
        results.forEach(item => {
            const { playername, rating } = item;

            const searchItem = createElementFromObject({ element: 'li', className: 'resultItem' })
            const itemName = createElementFromObject({ element: 'div', className: 'resultItemName', text: playername })
            const itemRating = createElementFromObject({ element: 'div', className: 'resultItemRating', text: rating })

            searchItem.append(itemName)
            searchItem.append(itemRating)
            searchResults.append(searchItem);
        });
    } else {
        searchResults.innerHTML = '<li>No results found...<li/>'
    }
    searchContainer.append(searchResults)
}
export default createSearchResults