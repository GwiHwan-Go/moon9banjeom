import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESSKEY,
        secretAccessKey: process.env.AWS_SECRETKEY
    }
});

export const uploadToS3 = async (file, userId, folderName) => {
    console.log("in s3")
    const {filename, createReadStream } = await file;
    const readStream = createReadStream();
    console.log("file, userId, folderName",file, userId, folderName)
    const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const {Location} = await new AWS.S3().upload({
        Bucket: "moon9storage",
        Key : newFilename,
        ACL: "public-read",
        Body: readStream,
    }).promise()

    return Location;
}