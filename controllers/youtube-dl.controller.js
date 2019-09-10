import YoutubseDLService from "../services/youtube-dl.service";

const YoutubeDLController = {};

YoutubeDLController.download = async (req, res) => {
  try {
    const payload = req.body;
    const { url, format } = payload;
    console.info("URL", url);
    console.info("FORMAT", format);
    if (!payload) {
      return res
        .status(400)
        .json({ error: true, message: "Valid payload not found!" });
    }

    try {
      YoutubseDLService.download(payload, res, function onComplete(response) {
        return response.status(200).json("Download completed");
      });
      // return res.status(200).json("Download started");
    }catch (er) {
      console.error("[ERROR] Error occured while downloading ", error);
      return res.status(200).json({ error });
    }

  } catch (error) {
    console.error("[ERROR] Internal Server Error ", error);
    return res.status(500).json({ error });
  }
};

export default YoutubeDLController;
