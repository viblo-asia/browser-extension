<script>
    import utils from '../../util'
    import _flow from 'lodash/fp/flow'
    import Tab from '../../services/Tab'
    import { WEB_URL } from '../../constants'

    const open = (url) => {
        Tab.create(url)
    }

    /** @argument {String} url */
    const absolute = (url) => {
        if (/^https?:\/\/|^\/\//i.test(url)) {
            return url
        }

        return url.startsWith('/') ? `${WEB_URL}${url}` : `${WEB_URL}/${url}`
    }

    export default {
        props: {
            to: String,
            utm: Boolean,
            className: [Array, Object, String]
        },

        functional: true,

        render: (h, { props, slots }) => {
            const url = _flow(
                absolute,
                (url) => props.utm ? utils.utmUrl(url) : url
            )(props.to)

            return (
                <a href={url} onClick={open.bind(null, url)} class={props.className}>
                    {slots().default}
                </a>
            );
        },
    }
</script>
