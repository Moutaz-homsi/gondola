'use strict';

/**
 * question controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const uid = 'api::question.question'

module.exports = createCoreController(uid, ({ strapi }) => ({
    async getRandomQuestion(ctx) {

        const user = ctx.state.user;
        // TODO : check user in middleware

        const previousAnswers = await strapi.db.query('plugin::users-permissions.user').findOne({
            where: { id: user.id },
            populate: ['answers']
        })

        const previousAnswersIds = previousAnswers.answers.map(ans => ans.questionId)

        const questionsCount = await strapi.db.query(uid).count({
            where: {
                id: {
                    $notIn: previousAnswersIds
                }
            }
        })

        if ( questionsCount == 0 ) {
            return { stat: 'You have answered all the questions !' }
        }

        const randomOffset = Math.floor(Math.random() * questionsCount);

        const randomQuestion = await strapi.db.query(uid).findOne({
            where: {
                id: {
                    $notIn: previousAnswersIds
                }
            },
            offset: randomOffset,
            populate: ['choices']
        })



        return { stat: 'Ok!', randomQuestion }
    }
}));
