/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    categoris = [];

    categoris.push({
      title: 'Bisnis',
      image: 'bisnis.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    categoris.push({
      title: 'Pendidikan',
      image: 'pendidikan.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    categoris.push({
      title: 'Custom',
      image: 'custom.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Categoris', categoris, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categoris', null, {});
  }
};