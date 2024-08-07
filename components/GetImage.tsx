"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

type ImageData = {
  id: number;
  image_path: string;
  website_url: string;
  publicUrl?: string;
};

// step 1: get url of image from bucket
// step 2: set url as key in db? retrieve image data from url
// step 3: map (image, data) in array
// step 4: export images

const GetImages: React.FC = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  
  //console.log('hi');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data: imageData, error } = await supabase
        .from("image_data")
        .select("*");

      //console.log(imageData);

      if (error) {
        console.error("Error fetching image data:", error);
        setLoading(false);
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
      setLoading(false);
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            style={{ position: "relative", width: "400px", height: "300px" }}
          >
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "15px" }}>
      {images.map((image, index) => (
        <a
          key={index}
          href={image.website_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: "relative", width: "400px", height: "300px" }} // Adjust sizes as needed
        >
          <Image
            src={image.image_path || ""}
            alt={`Website ${index}`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg hover:ring-2 hover:ring-violet-500 hover:ring-offset-2 shadow-2xl shadow-violet-200 hover:drop-shadow-xl"
          />
        </a>
      ))}
    </div>
  );
};

export default GetImages;
