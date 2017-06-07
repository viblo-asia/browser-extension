import Tab from '../services/Tab';
import {ROOT_URL} from '../constants';
import api from '../api';
import _ from 'lodash';

const createSuggestionsFromResponse = (posts) => posts.map((post) => ({
    content: post.url,
    description: post.title
}));

const search = _.debounce((query, addSuggestion) => {
    api.searchPost(query)
        .then(createSuggestionsFromResponse)
        .then(addSuggestion);
}, 300);

export default({
    init() {
        if (chrome.omnibox === undefined) {
            return;
        }

        chrome.omnibox.onInputChanged.addListener((text, addSuggestion) => {
            text = text.trim();

            if (text) {
                search(text, addSuggestion);
            }

            const description = text ? `Search "${text}" in Viblo` : 'Search Viblo';
            chrome.omnibox.setDefaultSuggestion({ description });
        });

        chrome.omnibox.onInputEntered.addListener((text, disposition) => {
            const isUrl = /^(https?):\/\/[^\s/$.?#].[^\s]*$/.test(text);
            const url = isUrl ? text : `${ROOT_URL}/search/?q=${text}`;

            switch (disposition) {
                case 'currentTab':
                    Tab.update(url);
                    break;
                case 'newForegroundTab':
                    Tab.create(url);
                    break;
                case 'newBackgroundTab':
                    Tab.create(url, true, false);
                    break;
            }
        })
    }
})
