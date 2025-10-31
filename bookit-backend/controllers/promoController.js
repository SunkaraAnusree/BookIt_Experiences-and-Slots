export const validatePromo = async (req, res) => {
  const { code } = req.body;
  const validCodes = {
    WELCOME100: 100,

  };

  if (validCodes[code]) {
    res.json({ success: true, discount: validCodes[code] });
  } else {
    res.status(400).json({ success: false, message: "Invalid promo code" });
  }
};
