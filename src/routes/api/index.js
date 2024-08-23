const express = require("express")
const router = express.Router()

const videoRoutes = require('./videoRoutes')
const authRoutes = require('./authRoutes')

router.use("/videos", videoRoutes)
router.use("/auth", authRoutes)


module.exports = router;