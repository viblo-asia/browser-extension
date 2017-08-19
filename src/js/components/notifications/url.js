import _assign from 'lodash/assign'
import _findKey from 'lodash/fp/findKey'
import { ROOT_URL } from '../../constants'

const getUserLocation = (user) => `${ROOT_URL}/u/${user.username}`

const getPostLocation = (key) => `${ROOT_URL}/p/${key}`

const getQuestionLocation = (key) => `${ROOT_URL}/q/${key}`

const getAnswerLocation = (key) => `${ROOT_URL}/q/${key}`

const getCommentLocation = (data) => {
    // Fallback to post for pre Q&A legacy notification
    if (!data.context) {
        return `${location}#comment-${data.comment.id}`
    }

    const location = getRouteFromContext(data.context)

    return `${location}#comment-${data.entities.comment.id}`
}

const getRouteFromContext = (context) => {
    const routeKey = context.route_key

    switch (context.type) {
        case 'User':
            return getUserLocation(routeKey)
        case 'Post':
            return getPostLocation(routeKey)
        case 'Question':
            return getQuestionLocation(routeKey)
        case 'Answer':
            return getAnswerLocation(routeKey)
    }

    return null
}

const notificationUrls = (type, data) => {
    if (data.contest) return getRouteFromContext(data.context)

    switch (type) {
        case 'user':
            return getUserLocation(data.user.username)
        case 'post':
            return getPostLocation(data.post.slug)
        case 'question':
            return getQuestionLocation(data.question.hash_id)
        case 'answer':
            return getAnswerLocation(data.answer.hash_id)
        case 'comment':
            return getCommentLocation(data)
    }

    return null
}

const notificationUrlTypes = {
    post: ['mentioned_in_post', 'post_clipped', 'post_promoted', 'post_published', 'post_trended', 'post_voted'],
    question: ['question_voted', 'question_clipped'],
    answer: ['question_answered', 'mentioned_in_answer', 'answer_voted'],
    comment: ['comment_left', 'comment_voted', 'mentioned_in_comment', 'reply_left'],
    user: ['new_follower']
}

export const url = (notification) => {
    const type = _findKey(types => types.includes(notification.type))(notificationUrlTypes)

    return notificationUrls(type, notification.data)
}
