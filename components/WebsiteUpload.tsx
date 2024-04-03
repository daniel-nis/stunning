"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  website_url: z
    .string()
    .min(1, "Website URL is required")
    .url("Invalid URL format"),
});

type FormValues = z.infer<typeof formSchema>;

export function WebsiteUploadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [screenshotUrl, setScreenshotUrl] = useState('');

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ website_url: data.website_url }),
      });

      if (!response.ok) {
        //throw new Error("Failed to generate screenshot");
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const { imagePath } = await response.json();
      setScreenshotUrl(imagePath);
    } catch (error) {
      console.error("Error:", error);
      alert(`Failed to generate screenshot: ${(error as Error).message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label htmlFor="website_url">Website URL</label>
        <Input
          {...register('website_url')}
          placeholder="https://example.com"
        />
        {errors.website_url && <p>{errors.website_url.message}</p>}
      </div>
      <Button type="submit">Generate Screenshot</Button>
      {screenshotUrl && (
        <div>
          <h3>Screenshot URL:</h3>
          <p>{screenshotUrl}</p>
        </div>
      )}
    </form>
  );
}