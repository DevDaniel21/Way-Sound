'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        return await queryInterface.createTable('musicas', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            autor: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            foto: {
                type: Sequelize.STRING,
                allowNull: false
            },
            audio: {
                type: Sequelize.STRING,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        })
    },

    async down (queryInterface) {
        return await queryInterface.dropTable('musicas')
    }
};
