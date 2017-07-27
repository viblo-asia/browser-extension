<script>
    import utils from '../../util'
    import Tab from '../../services/Tab'

    const open = (url) => {
        Tab.create(url)
    }

    export default {
        props: {
            to: String,
            utm: Boolean,
            className: [Array, Object, String]
        },

        functional: true,

        render: (h, { props, slots }) => {
            const url = props.utm ? utils.utmUrl(props.to) : props.to;

            return (
                <a href={url} onClick={open.bind(null, url)} class={props.className}>
                    {slots().default}
                </a>
            );
        },
    }
</script>
