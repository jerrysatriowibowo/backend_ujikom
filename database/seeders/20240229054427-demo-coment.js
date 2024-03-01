/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    coments = [];

    coments.push({
      des: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    coments.push({
      des: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Coments', coments, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Coments', null, {});
  }
};