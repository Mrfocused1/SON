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
  mobileImage?: string | null;
  desktopFocalX: number;
  desktopFocalY: number;
  mobileFocalX: number;
  mobileFocalY: number;
  onDesktopChange: (url: string) => void;
  onMobileChange: (url: string | null) => void;
  onDesktopFocalChange: (x: number, y: number) => void;
  onMobileFocalChange: (x: number, y: number) => void;
  recommendedDesktop?: { width: number; height: number };
  recommendedMobile?: { width: number; height: number };
  desktopAspect?: string;
  mobileAspect?: string;
}

export function ResponsiveImageUploader({
  label,
  desktopImage,
  mobileImage,
  desktopFocalX,
  desktopFocalY,
  mobileFocalX,
  mobileFocalY,
  onDesktopChange,
  onMobileChange,
  onDesktopFocalChange,
  onMobileFocalChange,
  recommendedDesktop = { width: 1920, height: 1080 },
  recommendedMobile = { width: 1080, height: 1920 },
  desktopAspect = "16/9",
  mobileAspect = "9/16",
}: ResponsiveImageUploaderProps) {
  const [isUploading, setIsUploading] = useState<"desktop" | "mobile" | null>(null);
  const [showUrlModal, setShowUrlModal] = useState<"desktop" | "mobile" | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState<"images" | "focal" | "preview">("images");

  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);

  // Ensure focal points have valid defaults
  const safeFocalX = (val: number | undefined | null) => (typeof val === 'number' && !isNaN(val) ? val : 0.5);
  const safeFocalY = (val: number | undefined | null) => (typeof val === 'number' && !isNaN(val) ? val : 0.5);

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
          <Monitor className="w-4 h-4 text-[var(--ink)]/60" />
        ) : (
          <Smartphone className="w-4 h-4 text-[var(--ink)]/60" />
        )}
        <span className="font-display text-sm uppercase text-[var(--ink)]">
          {type} {type === "mobile" && "(Optional)"}
        </span>
      </div>

      <div className="text-xs text-[var(--ink)]/50 mb-2">
        Recommended: {recommended.width}×{recommended.height}px
      </div>

      <div className="relative aspect-video bg-[var(--cream)] overflow-hidden border-2 border-dashed border-[var(--ink)]/20 hover:border-[var(--ink)]/40 transition-colors group">
        {image ? (
          <>
            <Image
              src={image}
              alt={`${type} image`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--ink)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => (type === "desktop" ? desktopInputRef : mobileInputRef).current?.click()}
                className="p-2 bg-[var(--cream)] text-[var(--ink)] hover:bg-white transition-colors"
                title="Upload new image"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setUrlInput(image);
                  setShowUrlModal(type);
                }}
                className="p-2 bg-[var(--cream)] text-[var(--ink)] hover:bg-white transition-colors"
                title="Set URL"
              >
                <Link className="w-4 h-4" />
              </button>
              {type === "mobile" && (
                <button
                  onClick={() => onMobileChange(null)}
                  className="p-2 bg-[var(--tv-red)] text-white hover:bg-red-600 transition-colors"
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
              <span className="text-sm text-[var(--ink)]/50">Uploading...</span>
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-[var(--ink)]/30 mb-2" />
                <span className="text-sm text-[var(--ink)]/50">Click to upload</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowUrlModal(type);
                  }}
                  className="mt-2 text-xs text-[var(--tv-red)] hover:underline"
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
    <div className="border-2 border-[var(--ink)]/10 p-4 space-y-4 bg-white">
      {/* Header - Stacked layout to prevent overlap */}
      <div className="space-y-1">
        <h3 className="font-display text-lg uppercase text-[var(--ink)]">{label}</h3>
        <div className="text-xs text-[var(--ink)]/50">
          Desktop: {recommendedDesktop.width}×{recommendedDesktop.height}px | Mobile: {recommendedMobile.width}×{recommendedMobile.height}px
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b-2 border-[var(--ink)]/10">
        {[
          { id: "images", label: "Images" },
          { id: "focal", label: "Focal Points" },
          { id: "preview", label: "Preview" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 font-display text-sm uppercase border-b-2 -mb-[2px] transition-colors ${
              activeTab === tab.id
                ? "border-[var(--tv-red)] text-[var(--tv-red)]"
                : "border-transparent text-[var(--ink)]/50 hover:text-[var(--ink)]"
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
            image={mobileImage || undefined}
            recommended={recommendedMobile}
          />
        </div>
      )}

      {activeTab === "focal" && (
        <FocalPointPicker
          desktopImageUrl={desktopImage}
          mobileImageUrl={mobileImage}
          desktopFocalX={safeFocalX(desktopFocalX)}
          desktopFocalY={safeFocalY(desktopFocalY)}
          mobileFocalX={safeFocalX(mobileFocalX)}
          mobileFocalY={safeFocalY(mobileFocalY)}
          onDesktopFocalChange={onDesktopFocalChange}
          onMobileFocalChange={onMobileFocalChange}
        />
      )}

      {activeTab === "preview" && (
        <ImagePreviewToggle
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          desktopFocalX={safeFocalX(desktopFocalX)}
          desktopFocalY={safeFocalY(desktopFocalY)}
          mobileFocalX={safeFocalX(mobileFocalX)}
          mobileFocalY={safeFocalY(mobileFocalY)}
          desktopAspect={desktopAspect}
          mobileAspect={mobileAspect}
        />
      )}

      {/* URL Modal */}
      {showUrlModal && (
        <div className="fixed inset-0 bg-[var(--ink)]/50 flex items-center justify-center z-50">
          <div className="bg-[var(--cream)] p-6 w-full max-w-md border-2 border-[var(--ink)]">
            <h3 className="font-display text-xl uppercase mb-4 text-[var(--ink)]">
              Enter {showUrlModal} image URL
            </h3>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="w-full border-2 border-[var(--ink)]/20 px-3 py-2 mb-4 bg-white focus:outline-none focus:border-[var(--tv-red)]"
              autoFocus
            />
            {urlInput && (
              <div className="relative aspect-video bg-[var(--ink)]/5 overflow-hidden mb-4 border-2 border-[var(--ink)]/10">
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
                className="px-4 py-2 text-[var(--ink)]/60 hover:text-[var(--ink)] font-display uppercase text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUrlSubmit}
                className="px-4 py-2 bg-[var(--tv-red)] text-white font-display uppercase text-sm hover:bg-red-600 transition-colors"
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
