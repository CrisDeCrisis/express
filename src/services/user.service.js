import User from '../model/user.model.js';


const userService = {};

//crud operations

userService.getAllUsers = async () => {
    try {
        return await User.findAll();
    } catch (error) {
        console.log(error);   
    }
};

userService.getUserById = async (id) => {
    try {
        return await User.findByPk(id);
    }
    catch (error) {
        console.log(error);
    }
};

userService.getUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    }
    catch (error) {
        console.log(error);
    }
}

userService.createUser = async (user) => {
    try {
        const userExists = await userService.getUserByEmail(user.email);
        if (userExists) {
            return null;
        }
        const newUser = await User.create(user);
        return newUser;
    } catch (error) {
        console.log(error);
    }
};

userService.updateUser = async (id, user) => {
    try {
        const updateUser = await User.update(user, { where: { id } });
        return updateUser;
    }
    catch (error) {
        console.log(error);
    }
};


userService.deleteUser = async (id) => {
    try {
        const deleteUser = await User.destroy({ where: { id } });
        return deleteUser;

    }
    catch (error) {
        console.log(error);
    }
};

export default userService;