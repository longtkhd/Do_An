import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { find } from 'lodash';
import { VALIDATOR } from '@constants';
import { v4 as uuidv4 } from 'uuid';
import { systemConfig } from '@configs';
import bluebird from 'bluebird';

const s3 = new aws.S3(systemConfig.bucket);

const uploadFileFs = (
  field,
  folderDes,
  fileSizeMb = 5,
  fileExtension = 'jpeg|jpg|png|gif'
) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync('public/uploads/' + folderDes)) {
        fs.mkdirSync('public/uploads/' + folderDes, { recursive: true });
      }
      cb(null, 'public/uploads/' + folderDes + '/');
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname.replace(path.extname(file.originalname), '') +
          '-' +
          uuidv4() +
          path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const filetypes = new RegExp(fileExtension);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(VALIDATOR.ERROR_FILE_EXTENSION);
      }
    },
  }).single(field);
  return upload;
};

const uploadFileMultiFieldFs = (fields, fileSizeMb = 500) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const { fieldname } = file;
      const field = find(fields, { name: fieldname });
      if (!fs.existsSync('public/uploads/' + field.destination)) {
        fs.mkdirSync('public/uploads/' + field.destination, {
          recursive: true,
        });
      }
      cb(null, 'public/uploads/' + field.destination + '/');
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname.replace(path.extname(file.originalname), '') +
          '-' +
          uuidv4() +
          path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const { fieldname } = file;
      const field = find(fields, { name: fieldname });
      const filetypes = new RegExp(field.fileExtension || 'jpeg|jpg|png|gif');
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(VALIDATOR.ERROR_FILE_EXTENSION);
      }
    },
  }).fields(fields);
  return upload;
};

const uploadFile = (
  field,
  folderDes,
  fileSizeMb = 5,
  fileExtension = 'jpeg|jpg|png|gif'
) => {
  const storage = multerS3({
    s3: s3,
    bucket: systemConfig.BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        folderDes +
          '/' +
          file.originalname.replace(path.extname(file.originalname), '') +
          '-' +
          uuidv4() +
          path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const filetypes = new RegExp(fileExtension);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(VALIDATOR.ERROR_FILE_EXTENSION);
      }
    },
  }).single(field);
  return upload;
};

const uploadFileMultiField = (fields, fileSizeMb = 500) => {
  const storage = multerS3({
    s3: s3,
    bucket: systemConfig.BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      const { fieldname } = file;
      const field = find(fields, { name: fieldname });
      cb(
        null,
        field.destination +
          '/' +
          file.originalname.replace(path.extname(file.originalname), '') +
          '-' +
          uuidv4() +
          path.extname(file.originalname)
      );
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: fileSizeMb * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      const { fieldname } = file;
      const field = find(fields, { name: fieldname });
      const filetypes = new RegExp(field.fileExtension);
      const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = filetypes.test(file.mimetype);
      if (!field.fileExtension || (mimetype && extname)) {
        return cb(null, true);
      } else {
        cb(VALIDATOR.ERROR_FILE_EXTENSION);
      }
    },
  }).fields(fields);
  return upload;
};

const removeFile = async (key) => {
  return await s3
    .deleteObject({
      Bucket: systemConfig.BUCKET_NAME,
      Key: key,
    })
    .promise();
};

const renameFolder = async (oldPrefix, newPrefix) => {
  const { Contents } =
    (await s3
      .listObjects({
        Bucket: systemConfig.BUCKET_NAME,
        Prefix: oldPrefix,
      })
      .promise()) || {};
  if (Contents.length) {
    const deleteObjects = [];
    await Promise.all(
      Contents.map((file) => {
        deleteObjects.push({ Key: file.Key });
        return s3
          .copyObject({
            Bucket: systemConfig.BUCKET_NAME,
            CopySource: systemConfig.BUCKET_NAME + '/' + file.Key,
            Key: file.Key.replace(oldPrefix, newPrefix),
            ACL: 'public-read',
          })
          .promise();
      })
    );

    return await s3
      .deleteObjects({
        Bucket: systemConfig.BUCKET_NAME,
        Delete: { Objects: deleteObjects },
      })
      .promise();
  }
};

const copyFolder = async (oldPrefix, newPrefix) => {
  const { Contents } =
    (await s3
      .listObjects({
        Bucket: systemConfig.BUCKET_NAME,
        Prefix: oldPrefix,
      })
      .promise()) || {};
  if (Contents.length) {
    const deleteObjects = [];
    return await Promise.all(
      Contents.map((file) => {
        deleteObjects.push({ Key: file.Key });
        return s3
          .copyObject({
            Bucket: systemConfig.BUCKET_NAME,
            CopySource: systemConfig.BUCKET_NAME + '/' + file.Key,
            Key: file.Key.replace(oldPrefix, newPrefix),
            ACL: 'public-read',
          })
          .promise();
      })
    );
  }
};

const removeFolder = async (prefix) => {
  const { Contents } =
    (await s3
      .listObjects({
        Bucket: systemConfig.BUCKET_NAME,
        Prefix: prefix,
      })
      .promise()) || {};
  if (Contents.length) {
    const deleteObjects = Contents.map((file) => ({ Key: file.Key }));
    return await s3
      .deleteObjects({
        Bucket: systemConfig.BUCKET_NAME,
        Delete: { Objects: deleteObjects },
      })
      .promise();
  }
};

const removeFolderFs = (path) => {
  if (fs.existsSync(path)) {
    fs.removeSync(path);
  }
};

const downloadFile = async (key) => {
  return new Promise((resolve, reject) => {
    const res = s3
      .getObject({
        Bucket: systemConfig.BUCKET_NAME,
        Key: key,
      })
      .createReadStream()
      .on('error', (error) => {
        return reject(error);
      });
    return resolve(res);
  });
};

const getAllPathInDir = (currentDirPath) => {
  if (fs.existsSync(currentDirPath)) {
    const names = fs.readdirSync(currentDirPath);
    const fileNames = names
      .map((name) => {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
          return [filePath];
        } else if (stat.isDirectory()) {
          return getAllPathInDir(filePath);
        }
      })
      .filter((item) => item);
    return [].concat(...fileNames);
  }
  return [];
};

const uploadToS3 = async (file, path) => {
  const params = {
    Bucket: systemConfig.BUCKET_NAME,
    Key: path,
    Body: file,
    ACL: 'public-read',
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

const uploadFolder = async (dirPath) => {
  const paths = getAllPathInDir(dirPath);
  await bluebird.map(
    paths,
    async (path) => {
      try {
        const file = fs.readFileSync(path);
        const s3Path = path.replace(new RegExp('public/uploads/', 'g'), '');
        const data = await uploadToS3(file, s3Path);
        console.log('DONE: ' + s3Path);
      } catch (e) {
        console.log(e);
        if (fs.existsSync('errors.txt'))
          fs.appendFileSync('errors.txt', path + '\n');
        else fs.writeFileSync('errors.txt', path + '\n');
      }
    },
    { concurrency: 500 }
  );
};

const removeFileFs = (path) => {
  if (fs.existsSync(path)) {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
  }
};

const renameFolderFs = (folder, newName) => {
  if (fs.existsSync(folder)) {
    fs.copySync(folder, newName);
    fs.removeSync(folder);
  } else {
    console.log('Directory path not found.');
  }
};

export {
  uploadFileMultiField,
  uploadFile,
  removeFile,
  removeFolder,
  renameFolder,
  uploadFolder,
  removeFolderFs,
  downloadFile,
  uploadFileFs,
  uploadFileMultiFieldFs,
  removeFileFs,
  renameFolderFs,
  copyFolder,
};
