import _get from 'lodash/fp/get'
import _reduce from 'lodash/reduce'
import _findKey from 'lodash/fp/findKey'
import { ROOT_URL } from '../../constants'

const getMessages = (notification) => {
    const data = notification.data
    const user = data.user ? `<b>${data.user.name}</b>` : ''
    const post = data.post ? `<b>${data.post.title}</b>` : ''
    const voteType = data.vote ? getVoteType(data.vote) : ''

    const message = _get(notification.type, notificationMessages)

    return replace(message, { user, post, voteType })
}

const getVoteType = (vote) => vote.type === 'up' ? 'upvoted' : 'downvoted'

const replace = (str, params) => _reduce(params, (acc, value, key) => acc.replace(`{${key}}`, value), str)
const notificationMessages = {
    comment_left: '{user} commented on your post {post}',
    comment_voted: 'Your comment in {post} was {voteType}',
    mentioned_in_comment: '{user} mentioned you in a comment',
    mentioned_in_post: '{user} mentioned you in {post}',
    new_follower: '{user} is following you',
    post_clipped: '{user} clipped your post {post}',
    post_promoted: 'Your post {post} was featured as Editor\'s choice',
    post_published: '{user} published a new post {post}',
    post_trended: 'Your post {post} is trending now',
    post_voted: 'Your post {post} was {voteType}',
    reply_left: '{user} replied to your comment'
}

const notificationTypes = {
    post: ['mentioned_in_post', 'post_clipped', 'post_promoted', 'post_published', 'post_trended', 'post_voted'],
    comment: ['comment_left', 'comment_voted', 'mentioned_in_comment', 'reply_left'],
    user: ['new_follower']
}

const notificationUrls = (type, data) => {
    switch (type) {
        case 'post':
            return `${ROOT_URL}/p/${data.post.slug}`;
        case 'comment':
            return `${ROOT_URL}/p/${data.post.slug}#comment-${data.comment.id}`;
        case 'user':
            return `${ROOT_URL}/u/${data.user.username}`;
    }
}

const to = (notification) => {
    const type = _findKey((types) => types.includes(notification.type))(notificationTypes);

    return notificationUrls(type, notification.data);
}

// notification.message is for legacy notification only
export const message = (notification) => notification.data.message || getMessages(notification)
export const url = to
