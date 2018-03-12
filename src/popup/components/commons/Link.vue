<script>
    import { utmUrl } from '~/utils/url';
    import Tab from '~/services/Tab';
    import { webUrl } from '~/config';
    import _flow from 'lodash/fp/flow';

    const open = (url) => {
        Tab.create(url);
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
            utm: Boolean,
            className: [Array, Object, String]
        },

        render: (h, { props, slots }) => {
            const url = _flow(
                absolute,
                url => (props.utm ? utmUrl(url) : url)
            )(props.to);

            return (
                <a href={url} onClick={open.bind(null, url)} class={props.className}>
                    {slots().default}
                </a>
            );
        }
    };
</script>
