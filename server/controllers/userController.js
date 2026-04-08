import User from "../models/userModels.js";

export const getUserData = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.is_account_verified
            }
        });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
