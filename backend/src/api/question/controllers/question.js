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
            where: {id: user.id},
            populate: ['answers']
        })

        return previousAnswers
    }
}));
