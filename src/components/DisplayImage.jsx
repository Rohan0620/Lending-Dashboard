import React, { useState } from "react";
import Lightbox from "react-18-image-lightbox";
import "react-18-image-lightbox/style.css";


const DisplayImage = ({ imageUrl , open }) => {
  const [lightboxOpen, setLightboxOpen] = useState(imageUrl ? true : false);
  console.log(imageUrl)
  return (
    <div>
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
