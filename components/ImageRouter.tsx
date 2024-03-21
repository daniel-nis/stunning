"use client";

import { supabase } from "@/supabaseClient";
import { useState, useEffect } from "react";

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

      //console.log(data);
      //console.log('d');

      const response = await supabase.from('image_data').select('image_path, website_url')
      //console.log('Response:', response)

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
          <img
            src={`https://your-bucket-name.supabase.co/storage/v1/object/public/${image.image_path}`}
            alt={`Image for ${image.website_url}`}
          />
          <a href={image.website_url} target="_blank" rel="noopener noreferrer">
            {image.website_url}
          </a>
        </div>
      ))}
    </div>
  );
};

export default GetImagesMaybe;
