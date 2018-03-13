<script>
    import _flow from 'lodash/fp/flow';
    import { webUrl } from '~/config';
    import { utmUrl } from '~/utils/url';
    import { openNewTab } from '~/utils/extension';

    const open = url => (event) => {
        event.stopPropagation();
        openNewTab(url);
    };

    /** @argument {String} url */
    const absolute = (url) => {
        if (/^https?:\/\/|^\/\//i.test(url)) {
            return url;
        }

        return url.startsWith('/') ? `${webUrl}${url}` : `${webUrl}/${url}`;
    };

    export default {
        functional: true,

        props: {
            to: String,
            utm: Boolean
        },

        render: (h, { props, data, slots }) => {
            const className = ['link', data.class, data.staticClass];

            const url = _flow(
                absolute,
                url => (props.utm ? utmUrl(url) : url)
            )(props.to);

            return (
                <a href={url} onClick={open(url)} {...data.attrs} class={className}>
                    {slots().default}
                </a>
            );
        }
    };
</script>
