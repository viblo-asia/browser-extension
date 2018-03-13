import { webUrl } from '~/config';
import { toPost } from '~/utils/url';
import _debounce from 'lodash/debounce';
import { search, SearchType } from 'viblo-sdk/api/search';

import { openNewTab, updateCurrentUrl } from '~/utils/extension';

const createSuggestionsFromResponse = posts => posts.data.map(post => ({
    content: post.url || toPost(post),
    description: post.title
}));


const searchPost = (query, addSuggestion) =>
    search(SearchType.Post, { q: query })
        .then(createSuggestionsFromResponse)
        .then(addSuggestion);

const debouncedSearch = _debounce(searchPost, 300);

export function initQuickSearch() {
    if (chrome.omnibox === undefined) {
        return;
    }

    chrome.omnibox.onInputChanged.addListener((text, addSuggestion) => {
        text = text.trim();

        if (text) {
            debouncedSearch(text, addSuggestion);
        }

        const description = text ? `Search "${text}" in Viblo` : 'Search Viblo';
        chrome.omnibox.setDefaultSuggestion({ description });
    });

    chrome.omnibox.onInputEntered.addListener((text, disposition) => {
        const isUrl = /^(https?):\/\/[^\s/$.?#].[^\s]*$/.test(text);
        const url = isUrl ? text : `${webUrl}/search/?q=${text}`;

        switch (disposition) {
            case 'currentTab':
                updateCurrentUrl(url);
                break;
            case 'newForegroundTab':
                openNewTab(url);
                break;
            case 'newBackgroundTab':
                openNewTab(url, true, false);
                break;
            default:
                break;
        }
    });
}
