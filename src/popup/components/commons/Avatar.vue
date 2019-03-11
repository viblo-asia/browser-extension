<script>
    import { toUser, imageUrl } from '~/utils/url';
    import defaultImage from '~assets/images/mm.png';

    const getImageAttributes = image => {
        if (!image) {
            return { src: defaultImage };
        }

        const avatar = imageUrl(image, 'avatar');
        const avatarRetina = imageUrl(image, 'avatar-retina');

        return {
            src: avatar,
            srcset: `${avatar} 1x, ${avatarRetina} 2x`,
        };
    }

    export default {
        functional: true,

        props: {
            username: {
                type: String,
                required: true
            },
            image: String,
        },

        render: (h, { props, data }) => {
            const imageAttrs = getImageAttributes(props.image);
            const className = ['avatar', data.staticClass];

            return (
                <ext-link
                    to={toUser(props.username)}
                    staticClass={className}
                >
                    <img
                        {...{attrs: {...imageAttrs}}}
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

