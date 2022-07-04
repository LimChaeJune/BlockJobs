import { ChangeEvent } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

interface ProfileUpload_props {
  id: string;
  uploadComplete: (id: string) => void;
  e: ChangeEvent<HTMLInputElement>;
}

export const useS3 = () => {
  const region = "ap-northeast-2";
  const bucket = "blockjobsawsbucket";
  const fileBaseUrl = `https://${bucket}.s3.${region}.amazonaws.com/`;

  const handleFileInput = async ({
    id,
    uploadComplete,
    e,
  }: ProfileUpload_props) => {
    const file = e.target.files?.[0];

    const s3 = new S3Client({
      region: region,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID ?? "",
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY ?? "",
      },
    });

    try {
      const mulitpartUpload = new Upload({
        client: s3,
        params: {
          Bucket: bucket, // 버킷 이름
          Key: id + ".png", // 유저 아이디 혹은 enterpriseid
          Body: file, // 파일 객체
        },
      });

      await mulitpartUpload.done();
      await uploadComplete(id);
    } catch (e) {
      console.log(e);
    }
  };

  return { handleFileInput, fileBaseUrl };
};
