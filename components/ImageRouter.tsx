"use client";

import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageData {
  image_path: string;
  website_url: string;
}

const GetImagesMaybe = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from("image_data")
        .select("image_path, website_url");

      //console.log("data:", data);
      //console.log('d');

      if (error) {
        console.error("Error fetching images:", error);
      } else {
        setImages(data);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      {images.map((image) => (
        <div key={image.image_path}>
          <Image
            src={image.image_path}
            width={300}
            height={200}
            alt={`Image for ${image.website_url}`}
          />
          <p>{image.image_path}</p>
          <a href={image.website_url} target="_blank" rel="noopener noreferrer">
            {image.website_url}
          </a>
        </div>
      ))}
    </div>
  );
};

export default GetImagesMaybe;
