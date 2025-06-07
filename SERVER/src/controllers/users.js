import User from "#models/users.js";
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        // Differentiate between server errors and validation errors
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
                code: "INVALID_ID_FORMAT",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            code: "INTERNAL_SERVER_ERROR",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }
};
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (status == "online") await User.userOnline(req.user.userId);
        else await User.userOffline(req.user.userId);
        res.json({ message: "Status updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating status", error });
    }
};
