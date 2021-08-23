import React, { useRef, useState } from "react";

interface IProps {
  changeAvatar: (e: any) => void;
}

const ImageUpload: React.FC<IProps> = ({ changeAvatar }) => {
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const imgInput = useRef<HTMLInputElement>(null);

  const chooseImgHandler = () => {
    imgInput.current?.click();
  };

  const changeImgHandler = (e: any) => {
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
    changeAvatar(e);
  };

  return (
    <div>
      <input
        ref={imgInput}
        className="hidden"
        onChange={changeImgHandler}
        type="file"
      />
      <div className=" h-32 my-4 relative">
        <img
          className="h-full w-32 rounded-full mx-auto"
          src={avatarPreview}
          alt="Avatar"
        />
        <div
          style={{ bottom: "1rem", left: "11rem" }}
          onClick={chooseImgHandler}
          className="absolute shadow cursor-pointer bg-primary text-white rounded px-2 py-1"
        >
          <i className="fas fa-pencil-alt mr-2"></i>Upload
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
