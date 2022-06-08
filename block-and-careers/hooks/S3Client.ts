import { ChangeEvent } from "react";
import AWS from "aws-sdk";

interface ProfileUpload_props {
  id: string;
  uploadComplete: (id: string) => void;
  e: ChangeEvent<HTMLInputElement>;
}

export const useS3 = () => {
  const region = "ap-northeast-2";
  const bucket = "blockjobsawsbucket";
  const fileBaseUrl = `https://${bucket}.s3.${region}.amazonaws.com/`;

  AWS.config.update({
    region: region,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  });

  const handleFileInput = async ({
    id,
    uploadComplete,
    e,
  }: ProfileUpload_props) => {
    const file = e.target.files?.[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucket, // 버킷 이름
        Key: id + ".png", // 유저 아이디 혹은 enterpriseid
        Body: file, // 파일 객체
      },
    });

    const promise = upload.promise();
    promise.then(
      function () {
        uploadComplete(id);
      },
      function (err) {
        console.log(err);
        // 이미지 업로드 실패
      }
    );
  };

  return { handleFileInput, fileBaseUrl };
};
