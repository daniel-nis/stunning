"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import Image from "next/image";

type ImageData = {
  id: number;
  image_path: string;
  website_url: string;
  publicUrl?: string;
};

// step 1: get url of image from bucket
// step 2: set url as key in db? retrieve image data from url
// step 3: map (image, data) in array
// step 4: export array

const GetImages: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  
  //console.log('hi');

  useEffect(() => {
    const fetchImages = async () => {
      const { data: imageData, error } = await supabase
        .from("image_data")
        .select("*");

      //console.log(imageData);

      if (error) {
        console.error("Error fetching image data:", error);
        return;
      }

      // Correctly map over imageData to include publicUrl
      const imagesWithUrls: ImageData[] = imageData.map((image) => {
        // Correctly access the publicUrl
        const { data } = supabase.storage
          .from("images")
          .getPublicUrl(image.image_path);
        
        //console.log(data);
        return { ...image, publicUrl: data.publicUrl };
      });

      setImages(imagesWithUrls);
    };

    fetchImages();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
      {images.map((image, index) => (
        <a
          key={index}
          href={image.website_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: "relative", width: "300px", height: "200px" }} // Adjust sizes as needed
        >
          <Image
            src={image.image_path || ""}
            alt={`Website ${index}`}
            layout="fill"
            objectFit="cover"
          />
        </a>
      ))}
    </div>
  );
};

export default GetImages;
