const downloader = require("youtube-dl");
const YoutubeDLService = {};

YoutubeDLService.download = (payload, res, onComplete) => {
  const { url, format, path } = payload;
  let location = ""; // /Users/anuradha/Documents/projects/my-projects/youtube-dl-mp3/downloads/
  if(path) {
    location = path;
  }
  downloader.exec(
    url,
    [
      "-x",
      "--audio-format",
      format,
      "--output",
      `${location}%(title)s.%(ext)s`
    ],
    {},
    function exec(err, output) {
      "use strict";
      if (err) {
        throw err;
      }
      console.log(output.join("\n"));
      onComplete(res);
    }
  );
};
export default YoutubeDLService;
