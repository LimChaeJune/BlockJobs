import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import AWS from "aws-sdk";
import { Input } from "@chakra-ui/react";

interface ProfileUpload_props {
  id: string;
  uploadComplete: () => void;
}

function ProfileUpload({ id, uploadComplete }: ProfileUpload_props) {
  let fileRef;

  const region = "ap-northeast-2";
  const bucket = "blockjobsawsbucket";

  AWS.config.update({
    region: region,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  });

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
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
        uploadComplete();
      },
      function (err) {
        console.log(err);
        // 이미지 업로드 실패
      }
    );
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
