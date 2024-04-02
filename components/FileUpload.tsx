"use client";

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 15; // 15MB
const ACCEPTED_FILE_TYPES = ["image/png", "image/jpeg"];

// const formSchema = z.object({
//   file: z
//     .instanceof(File)
//     .refine((file) => file.size <= MAX_UPLOAD_SIZE, "File size must be less than 15MB")
//     .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "File must be a PNG or JPEG"),
//   website_url: z
//     .string()
//     .min(1, "Website URL is required")
//     .url("Invalid URL format"),
// });

const formSchema = z.object({
    file: z.unknown().refine((file) => {
      if (!(file instanceof File)) {
        return false;
      }
      return file.size <= MAX_UPLOAD_SIZE && ACCEPTED_FILE_TYPES.includes(file.type);
    }, "Invalid file"),
    website_url: z
      .string()
      .min(1, "Website URL is required")
      .url("Invalid URL format"),
  });

type FormValues = z.infer<typeof formSchema>;

export function FileUploadForm() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

//   const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       setValue('file', files[0]);
//     }
//   };
    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
        setValue('file', files[0]);
        }
    };

  const onSubmit = async (data: FormValues) => {
    // const formData = new FormData();
    // formData.append("file", data.file);
    // formData.append("website_url", data.website_url);
    const formData = new FormData();
    if (data.file && data.file instanceof File) {
        formData.append("file", data.file);
    }
    formData.append("website_url", data.website_url);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("File upload failed");
      }
      const result = await response.json();
      console.log("Upload success:", result);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
        />
        {errors.file && <p>{errors.file.message}</p>}
      </div>
      <div>
        <label htmlFor="website_url">Website URL</label>
        <Input
          {...register('website_url')}
          placeholder="https://example.com"
        />
        {errors.website_url && <p>{errors.website_url.message}</p>}
      </div>
      <Button type="submit">Upload File</Button>
    </form>
  );
}