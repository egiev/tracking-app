const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, branch } = req.body;

    if (!(email && password && first_name && last_name && branch)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await new User({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      branch,
    });
    user.save();

    // return new user
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email }).populate("virtualBranch");

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = await jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      const data = {
        slug: user.slug,
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        token: token,
        branch: user.virtualBranch[0],
      };

      // user
      res.status(200).json(data);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    return res.status(500);
  }
};
