"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const handleClickThumbnail = (index: number) => {
    setCurrentIndex(index);

    // Scroll الصورة المختارة للوسط تقريبًا
    const container = thumbnailsRef.current;
    if (container) {
      const thumb = container.children[index] as HTMLElement;
      const offset = thumb.offsetLeft - container.clientWidth / 2 + thumb.clientWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-70 max-w-md">
      {/* الصورة الكبيرة مع sliding */}
      <div className="w-full h-96 overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div key={idx} className="relative w-full h-full shrink-0">
              <Image
                src={img}
                alt={`Image ${idx + 1}`}
                fill
                className="object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* شريط الصور المصغرة */}
      <div
        className="flex gap-2 overflow-x-auto w-full py-2 no-scrollbar"
        ref={thumbnailsRef}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`relative w-24 h-24 shrink-0 cursor-pointer border-2 rounded ${
              currentIndex === idx ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => handleClickThumbnail(idx)}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;