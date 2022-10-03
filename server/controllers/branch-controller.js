const Branch = require("../models/branch");

exports.list = async (req, res) => {
  try {
    const objs = await Branch.find({});

    res.status(200).send(objs);
  } catch (e) {
    res.statusCode(400).json(e);
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const obj = await new Branch({ name });
    obj.save();

    res.status(200).json(obj);
  } catch (e) {
    res.status(400).json(e);
  }
};
