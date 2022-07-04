import React, { ChangeEvent } from "react";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { Input } from "@chakra-ui/react";

interface ProfileUpload_props {
  id: string;
  uploadComplete: () => void;
}

function ProfileUpload({ id, uploadComplete }: ProfileUpload_props) {
  let fileRef;

  const region = "ap-northeast-2";
  const bucket = "blockjobsawsbucket";

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
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
      await uploadComplete();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    (
      <>
        <Input
          hidden={true}
          type="file"
          ref={fileRef}
          onChange={handleFileInput}
        />
      </>
    ),
    fileRef
  );
}

export default ProfileUpload;
