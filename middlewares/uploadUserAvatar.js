const ImageService = require("../services/imageService")

const uploadUserAvatar = ImageService.upload("avatar");

module.exports = uploadUserAvatar