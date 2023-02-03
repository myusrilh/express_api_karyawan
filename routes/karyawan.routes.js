const express = require('express');
const router = express.Router();
const karyawan = require("../models/karyawan.model.js");

router.get("/getAll", karyawan.getAllKaryawan);
router.get("/getManager", karyawan.getAllManager);

router.post("/getByManagerID", karyawan.getKaryawanByManagerID);
router.post("/getByRepID", karyawan.getKaryawanByRepID);
router.post("/insertKaryawan", karyawan.insertNewKaryawan);

router.put("/updateKaryawan", karyawan.updateKaryawan);

router.delete("/deleteKaryawan/(:rep_id)", karyawan.deleteKaryawan);

module.exports = router;

