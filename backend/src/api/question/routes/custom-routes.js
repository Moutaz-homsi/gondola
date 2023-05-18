
module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/random-question',
      handler: 'question.getRandomQuestion',
    },

  ]
};
