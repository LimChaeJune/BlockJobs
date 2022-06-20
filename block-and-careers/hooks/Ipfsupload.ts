import { create } from "ipfs-http-client";

export const useIpfs = () => {
  const infura = "https://ipfs.infura.io/ipfs/";

  // URI를 Blob 형식으로 변경
  const dataURItoBlob = (dataURI: string) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0) {
      byteString = atob(dataURI.split(",")[1]);
    } else {
      byteString = unescape(dataURI.split(",")[1]);
    }
    // 마임타입 추출
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  const UploadIpfs = async (form: Blob, name: string, description: string) => {
    const projectId = process.env.NEXT_PUBLIC_IPFS_ID;
    const projectSecret = process.env.NEXT_PUBLIC_IPFS_KEY;
    const auth =
      `Basic ` +
      Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = create({
      host: "ipfs.infura.io",
      port: 5001,
      protocol: "https",
      headers: {
        authorizeation: auth,
      },
    });
    const cid = await client.add(form);
    const imageUri = infura + cid.path;
    const meta = {
      name: name,
      description: description,
      image: imageUri,
    };
    const buffer = Buffer.from(JSON.stringify(meta));
    const resultUri = await client.add(buffer);
    return resultUri.path;
  };

  return { dataURItoBlob, UploadIpfs, infura };
};
