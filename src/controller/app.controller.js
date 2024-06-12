import User from '../model/user.model.js';
import userService from '../services/user.service.js';
import bcrypt from 'bcrypt';
const appCtrl = {};

appCtrl.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

appCtrl.postRegister = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const newUser = await userService.createUser({
            name,
            email,
            password: hashedPassword
        });

        if (!newUser) {
            return res.status(400).json({ message: 'User not created' });
        }

        res.status(201).json({
            message: 'User created successfully',
            data: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
}
appCtrl.getUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};

appCtrl.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};


appCtrl.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = await userService.updateUser(id, { name, email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};

appCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userService.deleteUser(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    };
};


export default appCtrl;