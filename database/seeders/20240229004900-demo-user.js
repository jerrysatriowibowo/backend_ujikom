const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    users = [];
    let salt = bcrypt.genSaltSync(10);
    users.push({
      name: 'aa',
      image: 'aa.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'aa@gmail.com',
      password: bcrypt.hashSync('aa', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'bb',
      image: 'bb.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'bb@gmail.com',
      password: bcrypt.hashSync('bb', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'cc',
      image: 'cc.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'cc@gmail.com',
      password: bcrypt.hashSync('cc', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'dd',
      image: 'dd.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'dd@gmail.com',
      password: bcrypt.hashSync('dd', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'ee',
      image: 'ee.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'ee@gmail.com',
      password: bcrypt.hashSync('ee', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'ff',
      image: 'ff.jpg',
      firstName: 'smk',
      lastName: 'assalaam',
      role: 'member',
      email: 'ff@gmail.com',
      password: bcrypt.hashSync('ff', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};