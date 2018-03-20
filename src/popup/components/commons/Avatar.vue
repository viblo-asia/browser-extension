<script>
    import { toUser } from '~/utils/url';

    export default {
        functional: true,

        props: {
            username: {
                type: String,
                required: true
            },
            images: {
                type: [Array, String],
                required: true
            }
        },

        render: (h, { props, data }) => {
            const images = props.images ? props.images : '~assets/images/mm.png';
            const [desktop, retina] = typeof images === 'string' ? [images, images] : images;
            const className = ['avatar', data.staticClass];

            return (
                <ext-link
                    to={toUser(props.username)}
                    staticClass={className}
                >
                    <img
                        src={desktop}
                        srcset={`${desktop} 1x, ${retina} 2x`}
                        title={props.username}
                    />
                </ext-link>
            );
        }
    };
</script>

<style lang="scss">
    img.avatar, .avatar > img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 100%;
        max-width: 3.75rem;
        max-height: 3.75rem;
        margin: 0 auto;
    }

    .avatar {
        & > img {
            height: auto;
        }

        &--md > img {
            width: 2.8rem;
        }

        &--sm > img {
            width: 2rem;
        }

        &--xs > img {
            width: 1.3rem;
        }
    }
</style>

