import User from "#models/users.js";
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if(status == "online")
            await User.userOnline(req.user.userId);
        else
            await User.userOffline(req.user.userId);
        res.json({ message: 'Status updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status', error });
    }
};