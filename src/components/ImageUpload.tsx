"use client";

import { CldUploadWidget } from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadWidget 
        onSuccess={(result: any) => onChange(result.info.secure_url)}
        uploadPreset="suwayq_preset"
        options={{ maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <div 
              onClick={() => open?.()}
              className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-12 border-gray-300 flex flex-col justify-center items-center gap-4 text-gray-600 rounded-3xl bg-gray-50 w-full"
            >
              <ImagePlus size={40} className="text-blue-500" />
              <div className="font-bold">اضغط هنا لرفع صورة الإعلان</div>
              
              {value && (
                <div className="absolute inset-0 w-full h-full p-2 bg-white rounded-3xl">
                  <Image fill style={{ objectFit: 'cover' }} src={value} alt="Upload" className="rounded-2xl" />
                </div>
              )}
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
