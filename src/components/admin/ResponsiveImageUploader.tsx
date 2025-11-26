"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Link, X, ImageIcon, Monitor, Smartphone } from "lucide-react";
import { uploadImage } from "@/lib/supabase";
import { FocalPointPicker } from "./FocalPointPicker";
import { ImagePreviewToggle } from "./ImagePreviewToggle";

interface ResponsiveImageUploaderProps {
  label: string;
  desktopImage: string;
  mobileImage?: string;
  focalX: number;
  focalY: number;
  onDesktopChange: (url: string) => void;
  onMobileChange: (url: string | null) => void;
  onFocalChange: (x: number, y: number) => void;
  recommendedDesktop: { width: number; height: number };
  recommendedMobile: { width: number; height: number };
  desktopAspect?: string;
  mobileAspect?: string;
}

export function ResponsiveImageUploader({
  label,
  desktopImage,
  mobileImage,
  focalX,
  focalY,
  onDesktopChange,
  onMobileChange,
  onFocalChange,
  recommendedDesktop,
  recommendedMobile,
  desktopAspect = "16/9",
  mobileAspect = "9/16",
}: ResponsiveImageUploaderProps) {
  const [isUploading, setIsUploading] = useState<"desktop" | "mobile" | null>(null);
  const [showUrlModal, setShowUrlModal] = useState<"desktop" | "mobile" | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState<"images" | "focal" | "preview">("images");

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "desktop" | "mobile"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(type);
    try {
      const url = await uploadImage(file);
      if (type === "desktop") {
        onDesktopChange(url);
      } else {
        onMobileChange(url);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsUploading(null);
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim() || !showUrlModal) return;

    if (showUrlModal === "desktop") {
      onDesktopChange(urlInput.trim());
    } else {
      onMobileChange(urlInput.trim());
    }

    setUrlInput("");
    setShowUrlModal(null);
  };

  const ImageUploadBox = ({
    type,
    image,
    recommended,
  }: {
    type: "desktop" | "mobile";
    image: string | undefined;
    recommended: { width: number; height: number };
  }) => (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-2">
        {type === "desktop" ? (
          <Monitor className="w-4 h-4 text-gray-500" />
        ) : (
          <Smartphone className="w-4 h-4 text-gray-500" />
        )}
        <span className="text-sm font-medium text-gray-700 capitalize">
          {type} {type === "mobile" && "(Optional)"}
        </span>
      </div>

      <div className="text-xs text-gray-500 mb-2">
        Recommended: {recommended.width}×{recommended.height}px
      </div>

      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors group">
        {image ? (
          <>
            <Image
              src={image}
              alt={`${type} image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => (type === "desktop" ? desktopInputRef : mobileInputRef).current?.click()}
                className="p-2 bg-white rounded-lg hover:bg-gray-100"
                title="Upload new image"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setUrlInput(image);
                  setShowUrlModal(type);
                }}
                className="p-2 bg-white rounded-lg hover:bg-gray-100"
                title="Set URL"
              >
                <Link className="w-4 h-4" />
              </button>
              {type === "mobile" && (
                <button
                  onClick={() => onMobileChange(null)}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  title="Remove mobile image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => (type === "desktop" ? desktopInputRef : mobileInputRef).current?.click()}
          >
            {isUploading === type ? (
              <span className="text-sm text-gray-500">Uploading...</span>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">Click to upload</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUrlModal(type);
                  }}
                  className="mt-2 text-xs text-blue-500 hover:text-blue-600"
                >
                  or paste URL
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={type === "desktop" ? desktopInputRef : mobileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileUpload(e, type)}
      />
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-900">{label}</h3>
        <div className="text-xs text-gray-500">
          Desktop: {recommendedDesktop.width}×{recommendedDesktop.height} | Mobile:{" "}
          {recommendedMobile.width}×{recommendedMobile.height}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: "images", label: "Images" },
          { id: "focal", label: "Focal Point" },
          { id: "preview", label: "Preview" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[var(--tv-red)] text-[var(--tv-red)]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "images" && (
        <div className="flex gap-4">
          <ImageUploadBox
            type="desktop"
            image={desktopImage}
            recommended={recommendedDesktop}
          />
          <ImageUploadBox
            type="mobile"
            image={mobileImage}
            recommended={recommendedMobile}
          />
        </div>
      )}

      {activeTab === "focal" && (
        <FocalPointPicker
          imageUrl={desktopImage}
          focalX={focalX}
          focalY={focalY}
          onFocalChange={onFocalChange}
        />
      )}

      {activeTab === "preview" && (
        <ImagePreviewToggle
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          focalX={focalX}
          focalY={focalY}
          desktopAspect={desktopAspect}
          mobileAspect={mobileAspect}
        />
      )}

      {/* URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              Enter {showUrlModal} image URL
            </h3>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
              autoFocus
            />
            {urlInput && (
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={urlInput}
                  alt="Preview"
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowUrlModal(null);
                  setUrlInput("");
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-[var(--tv-red)] text-white rounded-lg hover:opacity-90"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
