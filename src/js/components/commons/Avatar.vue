<script>
    import utils from '../../util'
    import Link from './Link.vue'

    export default {
        props: {
            className: [String, Array, Object],
            username: String,
            images: {
                type: [Array, String],
                required: true,
            }
        },

        functional: true,

        render: (h, { props }) => {
            const images = props.images ? props.images : `${EXTENSION_ROOT_URL}/images/mm.png`
            const user = { username: props.username }
            const [desktop, retina] = typeof images === 'string' ? [images, images] : images

            return (
                <Link
                    to={utils.userUrl(user)}
                    className={['image avatar', props.className]}
                >
                    <img
                        src={desktop}
                        srcset={`${desktop} 1x, ${retina} 2x`}
                        title={props.username}
                    />
                </Link>
            )
        }
    }
</script>
