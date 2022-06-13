import { create } from "ipfs-http-client";

export const useIpfs = () => {
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
    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    // write the bytes of the string to a typed array
    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  const UploadIpfs = async (form: Blob, name: string, description: string) => {
    const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });
    const cid = await client.add(form);

    console.log(cid.path);
    const meta = { name, description, img: cid.path };
    const buffer = Buffer.from(JSON.stringify(meta));
    await client.add(buffer);
    return cid.path;
  };

  return { dataURItoBlob, UploadIpfs };
};
