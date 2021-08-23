import React, { useRef, useState } from "react";

// import image from "../../../../assets/imgs/avatar.png";

const ImageUpload = () => {
  const imgInput = useRef<HTMLInputElement>(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const changeHandler = (e: any) => {
    setSelectedImg(e.target.files[0]);
  };

  const chooseImgHandler = () => {
    imgInput.current?.click();
  };

  return (
    <div>
      <input
        ref={imgInput}
        className="hidden"
        onChange={changeHandler}
        type="file"
      />
      <div className=" h-32 my-4 relative">
        <img
          className="h-full rounded-full mx-auto"
          src="https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjc5MS10YW5nLTM1LnBuZw.png?s=aLxshBxLcykO2UAnr6F0Nzhqtdx6iR6UuKi4bFSTzC8"
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
