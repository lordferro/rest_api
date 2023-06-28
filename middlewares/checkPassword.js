const { User } = require("../models/users");

const checkPassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('password');
    
};
