'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      tittle: {
        type: Sequelize.STRING
      },
      done: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // await queryInterface.addConstraint('Tasks', {
    //   fields: ['user_id'],
    //   type: 'foreign key',
    //   name: 'FK_USER__TASKS',
    //   references: {
    //     table: 'Users',
    //     field: 'id'
    //   }
    // })
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeConstraint('Tasks', 'FK_USER__TASKS')
    await queryInterface.dropTable('Tasks');
  }
};