const password = require("generate-password");
const Booking = require("../models/booking");

const { async_send_mail } = require("../utils/email-sender");

exports.list = async (req, res) => {
  try {
    const objs = await Booking.find({});

    res.status(200).json(objs);
  } catch (e) {
    res.send({});
  }
};

exports.detail = async (req, res) => {
  try {
    const { slug } = req.params;
    const obj = await Booking.findOne({ slug: slug });

    res.status(200).json(obj);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.create = async (req, res) => {
  try {
    const { branch, name, email, contact, companions, date_of_departure } =
      req.body;

    const obj = await Booking.create({
      branch,
      name,
      email,
      contact,
      companions,
      date_of_departure,
    });

    res.status(200).json(obj);
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { slug, status } = req.body;

    const obj = await Booking.findOneAndUpdate(
      { slug },
      { status },
      {
        upsert: true,
      }
    );
    obj.status = status;

    if (status === "approve") {
      const code = password.generate({ length: 10, numbers: true });

      await Booking.findOneAndUpdate(
        { slug },
        { code },
        {
          upsert: true,
        }
      );

      obj.code = code;

      async_send_mail(obj.email);
    }

    res.status(200).json(obj);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

exports.start = async (req, res) => {
  try {
    const { code } = req.body;
    const obj = await Booking.findOne({ code });

    if (obj) {
      res.status(200).json(obj);
    } else {
      res.status(400).json("Invalid code");
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.delete = async (req, res) => {
  console.log("test");
};
