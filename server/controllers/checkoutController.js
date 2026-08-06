export const checkout = async (req, res, next) => {
  try {
    const { items, prices, total } = req.body;

    if (!items || !prices || !total) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const totalPayout = total;

    // the code for the payment integration to handle 

    
    return res
      .status(200)
      .json({
        message: "Purchase Successful!",
        productName: items,
        paidAmount: totalPayout,
      });
  } catch (err) {
    next(err);
  }
};
