/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    templates = [];

    templates.push({
      title: 'Template bisnis',
      des: 'template for bussines',
      image: 'template.jpg',
      id_user: 1,
      id_categori: 1,
      source: 'www.abawgs.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    templates.push({
      title: 'Template pendidikan',
      des: 'template for education',
      image: 'template.jpg',
      id_user: 1,
      id_categori: 2,
      source: 'www.tadads.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    templates.push({
      title: 'Template custom',
      des: 'template for fun',
      image: 'template.jpg',
      id_user: 1,
      id_categori: 3,
      source: 'www.tadmja.com',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Templates', templates, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Templates', null, {});
  }
};