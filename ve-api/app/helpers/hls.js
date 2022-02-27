import fs from 'fs-extra';
import ffmpeg from 'fluent-ffmpeg';

const createHls = async (dir, fileInput, fileOutput) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
  }
  return await new Promise((resolve, reject) => {
    ffmpeg(fileInput)
      .audioCodec('libopus')
      .audioBitrate(96)
      .outputOptions(['-codec: copy', '-hls_time 10', '-hls_playlist_type vod'])
      .save(fileOutput)
      .on('progress', function (progress) {
        console.log('Processing: ' + progress.percent + '% done');
      })
      .on('error', (err) => {
        console.log('Process error: ' + err.message);
        reject(err);
      })
      .on('end', function (err, stdout, stderr) {
        console.log('Finished processing!');
        ffmpeg(fileInput).ffprobe(function (err, data) {
          resolve({
            duration: data.format.duration,
          });
        });
      });
  });
};

export { createHls };
