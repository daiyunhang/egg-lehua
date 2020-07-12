module.exports = app => {
    const { STRING, INTEGER } = app.Sequelize;
    const User = app.model.define("user", {
        id: {
            type: INTEGER,
            text: "id",
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: STRING(30),
            text: "用户名"
        },
        password: {
            type: STRING(30),
            text: "密码"
        },
        phone: {
            type: STRING(30),
            text: "电话"
        },
        nickname: {
            type: STRING(30),
            text: "昵称"
        },
        roleId: {
            type: INTEGER,
            text: "角色"
        },
        imgUrl: {
            type: STRING(30),
            text: "头像"
        }
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'User',
    });


    User.sync({ force: false })
    User.associate = function () {
        // app.model.User.belongsTo(app.model.Role, {
        //     foreignKey: 'roleId',
        //     as: "Role"
        // });



    }

    return User;
};