/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    templates = [];

    templates.push({
      title: 'admin',
      des: 'smk',
      image: 'admin.jpg',
      id_user: 'assalaam',
      id_kategori: 'admin',
      source: 'admin@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    templates.push({
      title: 'member',
      des: 'smk',
      image: 'member.jpg',
      id_user: 'assalaam',
      id_kategori: 'member',
      source: 'member@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Templates', templates, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Templates', null, {});
  }
};