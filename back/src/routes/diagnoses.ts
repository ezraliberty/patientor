import express from "express";

const router = express.Router();

router.get("/diagnoses", (_req, res) => {
  res.send();
});

export default router;
