const Videos = require("../models/Video");

// @route   GET api/videos/all
// @desc    VideoData
// @access  Public
const all = async (req, res) => {
  await Videos.find()
    // .sort({ date: 1 })
    .then((videos) => res.status(200).json({ success: true, data: { videos } }))
    .catch((err) =>
      res.status(404).json({ msg: "No videos found.", err: err.message })
    );
};

// @route   GET api/videos/add
// @desc    VideoData
// @access  Public

const addVideo = async (req, res) => {
  try {
    const { title, image, publishingYear } = req.body;
    const video = await Videos.findOne({ title });
    if (video) {
      return res.status(400).json({ msg: "Video already exist." });
    }

    const newVideo = new Videos({
      title: title,
      image: image,
      publishingYear: publishingYear,
    });

    newVideo
      .save()
      .then(
        res.status(200).json({ msg: "Successfully added!", data: newVideo })
      )
      .catch((error) => {
        res.status(400).json({ msg: "The save failed!", error: error.message });
      });
  } catch (error) {
    res.status(500).json({ msg: error.message, data: error });
  }
};

// @route   GET api/videos/video
// @desc    VideoData
// @access  Public

const videoInfo = async (req, res) => {
  try {
    const { video_id } = req.params;
    console.log(video_id);

    const video = await Videos.findById(video_id);
    if (video) {
      return res.status(200).json({ msg: "Video found", data: video });
    } else {
      return res.status(404).json({ msg: "Video not found!", data: error });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message, data: error });
  }
};

// @route   Put api/videos/video
// @desc    VideoData
// @access  Public

const updateVideo = async (req, res) => {
    try {
      const { title, image, publishingYear } = req.body;
      const { video_id } = req.params;
      const video = await Videos.findById(video_id);
      if (video) {
        video.title = title;
        video.image = image;
        video.publishingYear = publishingYear;
        await video.save();
        res.status(200).json({ msg: "Updated successfully!", data: video });
      } else {
        res.status(404).json({ msg: "Video not found!", data: error });
      }
    } catch (error) {
      res.status(500).json({ msg: error.message, data: error });
    }
  };

module.exports = { all, addVideo, videoInfo, updateVideo };
