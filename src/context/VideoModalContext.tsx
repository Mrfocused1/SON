"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface VideoModalContextType {
  isOpen: boolean;
  videoId: string | null;
  openVideo: (videoId: string) => void;
  closeVideo: () => void;
}

const VideoModalContext = createContext<VideoModalContextType | undefined>(undefined);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(null);

  const openVideo = (id: string) => {
    setVideoId(id);
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
    setVideoId(null);
  };

  return (
    <VideoModalContext.Provider value={{ isOpen, videoId, openVideo, closeVideo }}>
      {children}
    </VideoModalContext.Provider>
  );
}

export function useVideoModal() {
  const context = useContext(VideoModalContext);
  if (context === undefined) {
    throw new Error("useVideoModal must be used within a VideoModalProvider");
  }
  return context;
}
