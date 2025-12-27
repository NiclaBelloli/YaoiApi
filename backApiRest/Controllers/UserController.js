const User = require('../Models/User');
const { decryptData, encryptData } = require('../encryptation');

exports.get_users = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
        //res.send(users)
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.create_user = async (req, res) => {
    try {
        const { name, email, password, admin } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Missing name, email, or password' });
        }
        const encryptedPassword = encryptData(password);
        const user = new User({ name, email, password: encryptedPassword, admin });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login_user = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing email or password' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const decryptedPassword = decryptData(user.password);
        if (decryptedPassword !== password) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}