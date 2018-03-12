<script>
    import { toUser } from '~/utils/url';
    import Link from './Link.vue';

    export default {
        functional: true,

        props: {
            className: [String, Array, Object],
            username: String,
            images: {
                type: [Array, String],
                required: true
            }
        },

        render: (h, { props }) => {
            const images = props.images ? props.images : '~assets/images/mm.png';
            const user = { username: props.username };
            const [desktop, retina] = typeof images === 'string' ? [images, images] : images;

            return (
                <Link
                    to={toUser(user)}
                    className={['image avatar', props.className]}
                >
                    <img
                        src={desktop}
                        srcset={`${desktop} 1x, ${retina} 2x`}
                        title={props.username}
                    />
                </Link>
            );
        }
    };
</script>
