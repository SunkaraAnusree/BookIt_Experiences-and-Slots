import express from "express";
const router = express.Router();

const promoCodes = {
  WELCOME100: 100,
};

router.post("/validate", (req, res) => {
  const { code } = req.body;
  const discount = promoCodes[code.toUpperCase()];
  if (discount) {
    res.json({ valid: true, discount });
  } else {
    res.json({ valid: false, message: "Invalid promo code" });
  }
});

export default router;
