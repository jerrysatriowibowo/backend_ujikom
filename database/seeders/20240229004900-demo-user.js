const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    users = [];
    let salt = bcrypt.genSaltSync(10);
    users.push({
      name: 'mimin',
      image: 'aa.jpg',
      firstName: 'min',
      lastName: 'premu',
      role: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'member',
      image: 'member.jpg',
      firstName: 'mem',
      lastName: 'premu',
      role: 'member',
      email: 'member@gmail.com',
      password: bcrypt.hashSync('member', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'memberTest',
      image: 'memberTest.jpg',
      firstName: 'member',
      lastName: 'test',
      role: 'member',
      email: 'memberTest@gmail.com',
      password: bcrypt.hashSync('memberTest', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'memberTest2',
      image: 'memberTest2.jpg',
      firstName: 'member',
      lastName: 'test2',
      role: 'member',
      email: 'memberTest2@gmail.com',
      password: bcrypt.hashSync('memberTest2', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'memberTest4',
      image: 'memberTest4.jpg',
      firstName: 'member',
      lastName: 'test4',
      role: 'member',
      email: 'memberTest4@gmail.com',
      password: bcrypt.hashSync('memberTest4', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    users.push({
      name: 'memberTest5',
      image: 'memberTest5.jpg',
      firstName: 'member',
      lastName: 'test5',
      role: 'member',
      email: 'memberTest5@gmail.com',
      password: bcrypt.hashSync('memberTest5', salt),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return queryInterface.bulkInsert('Users', users, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};