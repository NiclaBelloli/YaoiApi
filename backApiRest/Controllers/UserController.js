const User = require('../Models/User');

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
        const user = new User({ name, email, password, admin });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};