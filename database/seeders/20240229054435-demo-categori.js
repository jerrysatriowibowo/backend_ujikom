/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    categoris = [];

    categoris.push({
      title: 'Bisnis',
      image: 'smk.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    categoris.push({
      title: 'Pendidikan',
      image: 'smk.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Categoris', categoris, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categoris', null, {});
  }
};