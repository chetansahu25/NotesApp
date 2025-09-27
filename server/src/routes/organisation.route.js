const express = require('express');
const { handleCreateOrganisation } = require('../controllers/organisation.controller');
const router = express.Router();


router.post("/create", handleCreateOrganisation)


module.exports = router