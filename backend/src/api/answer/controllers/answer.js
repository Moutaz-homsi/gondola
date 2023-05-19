'use strict';

/**
 * answer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const uid = 'api::answer.answer'

module.exports = createCoreController(uid, ({strapi}) => ({
    async addAnswer(ctx) {
        
        const {questionId, answers} = ctx.request.body
        const user = ctx.state.user;
        // TODO : check user in middleware

        const addedAnswer = await strapi.db.query(uid).create({
            data: {
                user: user.id,
                question: questionId,
                answerJson: answers,
                questionId // I have add it here to aviod deep query while ignoring previous answered questions .
            }
        })

        return addedAnswer
    }
}));
