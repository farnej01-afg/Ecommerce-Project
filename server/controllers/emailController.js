import Email from "../models/email.js";

// create inquiry
const createInquiry = async (req, res, next) => {
  try {
    const { type, name, phone, email, material, size, subject, message } =
      req.body;

    if (!type || !["short_message", "email"].includes(type)) {
      return res.status(400).json({ message: "Invalid inquiry type" });
    }

    const inquiry = await Email.create({
      type,
      name,
      phone,
      email,
      material,
      size,
      subject,
      message,
    });

    res.status(201).json(inquiry);
  } catch (err) {
    next(err);
  }
};

// get all inquiries
const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Email.find({}).sort({ createdAt: -1 });
    res.status(200).json(inquiries);
  } catch (err) {
    next(err);
  }
};

export { createInquiry, getInquiries };
