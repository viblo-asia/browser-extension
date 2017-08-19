import _get from 'lodash/get'
import _assign from 'lodash/assign'
import _escape from 'lodash/escape'
import _reduce from 'lodash/reduce'
import _isArray from 'lodash/isArray'
import _mapValues from 'lodash/mapValues'

const messages = {
    comment_left: '{user} commented on your {type} {title}',
    comment_voted: 'Your comment in {type} {title} was {vote_type}',
    mentioned_in_comment: '{user} mentioned you in a comment',
    mentioned_in_post: '{user} mentioned you in {post}',
    mentioned_in_answer: '{user} mentioned you in {answered_question}',
    new_follower: '{user} followed you',
    post_clipped: '{user} clipped your post {post}',
    question_clipped: '{user} clipped your question {question}',
    post_promoted: 'Your post {post} was featured as Editor\'s choice',
    post_published: '{user} published a new post {post}',
    post_trended: 'Your post {post} is trending now',
    post_voted: 'Your post {post} was {vote_type}',
    question_answered: '{user} answered your question {answered_question}',
    question_voted: 'Your question {question} was {vote_type}',
    answer_voted: 'Your answer to {answered_question} was {vote_type}',
    reply_left: '{user} replied to your comment',
}

const params = {
    post_promoted: ['post'],
    post_published: ['user', 'post'],
    post_trended: ['post'],
    question_clipped: ['user', 'question'],
    question_answered: ['user', 'answered_question'],
    mentioned_in_comment: ['user'],
    mentioned_in_post: ['user', 'post'],
    mentioned_in_answer: ['user', 'answered_question'],
    new_follower: ['user'],
    comment_voted: {
        collect: ['commented_main_post', 'vote_type'],
        highlight: ['title']
    },
    question_voted: {
        collect: ['question', 'vote_type'],
        highlight: ['question']
    },
    post_clipped: ['user', 'post'],
    post_voted: {
        collect: ['post', 'vote_type'],
        highlight: ['post']
    },
    answer_voted: {
        collect: ['answered_question', 'vote_type'],
        highlight: ['answered_question']
    },
    reply_left: ['user'],
    comment_left: {
        collect: ['user', 'commented_main_post'],
        highlight: ['user', 'title']
    }
}

const b = (str) => `<b>${str}</b>`
const __ = (str, params) => _reduce(params, (acc, value, key) => acc.replace(`{${key}}`, value), str)

const getCommentContext = (data) => {
    // Fallback to post for pre Q&A legacy notification
    const commentableType = _get(data, 'entities.comment.commentable_type', 'Post')
    const type = {
        Post: 'post',
        Question: 'question',
        Answer: 'answer to'
    }[commentableType]

    const titlePath = commentableType !== 'Answer'
        ? 'entities.commentable.title'
        : 'entities.commentable.question.title'

    const title = _get(data, titlePath) || _get(data, 'post.title')

    return { type, title }
}

/**
 * Collectors for getting common notification data
 */
const collectors = {
    user: (data) => _get(data, 'user.name'),
    post: (data) => _get(data, 'post.title'),
    question: (data) => _get(data, 'question.title'),
    answered_question: (data) => _get(data, 'answer.question.title'),
    vote_type: (data) => data.vote ? _get(data, 'vote.type') === 'up' ? 'upvoted' : 'downvoted' : null,
    commented_main_post: getCommentContext
}

/**
 * Utility function for getting common data from notification
 * @param {Object} data
 * @param {Array} names
 */
const collectParamsFromData = (data, names) => _reduce(names, (acc, name) => {
    const values = collectors[name](data)
    const result = typeof values === 'object' ? {...values} : { [name]: values }

    return _assign({}, acc, result)
}, {})

/**
 * Get params for message template
 * @param {Object} data
 * @param {Object|Array} options
 * @param {Boolean} html
 */
const getParams = (data, options, html) => {
    const { collect, highlight } = _isArray(options)
        ? { collect: options, highlight: options }
        : options

    const params = collectParamsFromData(data, collect)

    return html
        ? _mapValues(params, (value, name) => {
            const escaped = _escape(value)
            return highlight.includes(name) ? b(escaped) : escaped
        }) : params
}

const getMessage = (notification, html) => {
    const type = notification.type
    const data = notification.data

    const template = messages[type]
    if (!template) return ''

    const paramFill = params[type]
    const templateParams = getParams(data, paramFill, html)

    return __(template, templateParams)
}

// notification.message is for legacy notification only
export const message = (notification) => notification.data.message || getMessage(notification, true)
export const pushMessage = (notification) => getMessage(notification, false)
