import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const DisplayImage = ({ imageUrl }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  console.log(imageUrl)
  return (
    <div>
      <img
        src={imageUrl}
        alt="DisplayedImage"
        style={{ cursor: "pointer" }}
        onClick={() => setLightboxOpen(true)}
      />
      {lightboxOpen && (
        <Lightbox
          mainSrc={imageUrl}
          onCloseRequest={() => setLightboxOpen(false)}
        />
      )}
      <a href={imageUrl} download="image.jpg">
        Download Image
      </a>
    </div>
  );
};

export default DisplayImage;
