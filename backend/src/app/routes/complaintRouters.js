const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController");

router.get("/", complaintController.getAll);
router.post("/", complaintController.create);
router.delete("/:id", complaintController.remove);
router.delete("/approve/:id", complaintController.approve);

module.exports = router;
