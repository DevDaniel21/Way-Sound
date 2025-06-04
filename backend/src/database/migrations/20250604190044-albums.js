"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return await queryInterface.createTable("albums", {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            nome: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            descricao: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        return await queryInterface.dropTable("albums");
    },
};

