import { createElementFromObject } from '../Helpers/index.js'

const createSearchByID = () => {
    const searchNode = createElementFromObject({ element: 'div', className: 'search-node' });
    const searchContainer = document.querySelector('.search-prices');
    searchContainer.append(createFieldHeader('Search by player ID'));
    searchNode.append(createField());

    const searchButton = createElementFromObject(
        {
            element: 'button',
            className: ['alt-btn-standard', 'alt-call-to-action', 'js-searching-by-id'],
            text: 'Search'
        }
    )
    const submitButton = createElementFromObject(
        {
            element: 'button',
            className: ['alt-btn-standard', 'alt-call-to-action', 'js-save-searching-by-id'],
            text: 'Save'
        }
    )
    searchNode.append(searchButton)
    searchNode.append(submitButton)
    searchContainer.append(searchNode)
}

const createFieldHeader = (title) => {
    const containerMeta = { element: 'div', className: 'search-price-header' };
    const container = createElementFromObject(containerMeta)
    const titleMeta = { element: 'h1', text: title }
    const titleNode = createElementFromObject(titleMeta);

    container.append(titleNode);
    return container;
}

const createField = () => {
    const containerMeta = { element: 'div', className: 'price-filter' }
    const container = createElementFromObject(containerMeta);
    const contentMeta = {
        element: 'input',
        className: ['ut-text-input-control', 'js-search-by-id'],
        data: {
            placeholder: 'Type player name',
            type: 'text'
        }
    }
    const inputField = createElementFromObject(contentMeta);

    container.append(inputField)
    return container
}

export default createSearchByID