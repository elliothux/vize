/* eslint-disable */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DATE, NOW } = Sequelize;
    await queryInterface.createTable(
      'biz',
      {
        id: {
          type: INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        key: {
          type: STRING(128),
          allowNull: false,
        },
        name: {
          type: STRING(128),
          allowNull: false,
        },
        logo: {
          type: STRING(256),
          allowNull: false,
        },
        createdTime: {
          type: DATE,
          allowNull: false,
          defaultValue: NOW,
        },
        modifiedTime: {
          type: DATE,
          allowNull: true,
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true,
      },
    );

    await queryInterface.createTable(
      'history',
      {
        id: {
          type: INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        page: {
          type: INTEGER.UNSIGNED,
          allowNull: false,
        },
        createdTime: {
          type: DATE,
          allowNull: false,
          defaultValue: NOW,
        },
        author: {
          type: STRING(128),
          allowNull: false,
        },
        title: {
          type: STRING(128),
          allowNull: false,
        },
        desc: {
          type: STRING(256),
          allowNull: false,
        },
        startTime: {
          type: DATE,
          allowNull: true,
        },
        endTime: {
          type: DATE,
          allowNull: true,
        },
        expiredJump: {
          type: STRING(256),
          allowNull: false,
        },
        globalProps: {
          type: TEXT,
          allowNull: false,
        },
        globalStyle: {
          type: TEXT,
          allowNull: false,
        },
        pageInstances: {
          type: TEXT('medium'),
          allowNull: false,
        },
        pluginInstances: {
          type: TEXT,
          allowNull: true,
        },
        editInfo: {
          type: TEXT,
          allowNull: false,
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true,
      },
    );

    await queryInterface.createTable(
      'page',
      {
        id: {
          type: INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        key: {
          type: STRING(128),
          allowNull: false,
        },
        createdTime: {
          type: DATE,
          allowNull: false,
          defaultValue: NOW,
        },
        author: {
          type: STRING(128),
          allowNull: false,
        },
        layoutMode: {
          type: STRING(16),
          allowNull: false,
        },
        pageMode: {
          type: STRING(16),
          allowNull: false,
        },
        biz: {
          type: INTEGER.UNSIGNED,
          allowNull: false,
        },
        latestHistory: {
          type: INTEGER.UNSIGNED,
          allowNull: true,
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        freezeTableName: true,
      },
    );

    await queryInterface.addConstraint('page', {
      fields: ['biz'],
      type: 'FOREIGN KEY',
      references: {
        table: 'biz',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('page', {
      fields: ['latestHistory'],
      type: 'FOREIGN KEY',
      references: {
        table: 'history',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });

    await queryInterface.addConstraint('history', {
      fields: ['page'],
      type: 'FOREIGN KEY',
      references: {
        table: 'page',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  down: async queryInterface => {
    return queryInterface.dropAllTables();
  },
};
