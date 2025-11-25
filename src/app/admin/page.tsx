"use client";

import { useState, useRef } from "react";
import {
  Home,
  Film,
  Users,
  Mail,
  Menu,
  Image as ImageIcon,
  Link as LinkIcon,
  Settings,
  Save,
  Plus,
  Trash2,
  Edit3,
  Eye,
  ChevronRight,
  Upload,
  X
} from "lucide-react";
import { uploadImage } from "@/lib/supabase";

type Section = "home" | "media" | "shows" | "join" | "contact" | "navigation" | "footer" | "settings";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: "home" as Section, label: "Home Page", icon: Home },
    { id: "media" as Section, label: "Media Library", icon: ImageIcon },
    { id: "shows" as Section, label: "Shows", icon: Film },
    { id: "join" as Section, label: "Join Page", icon: Users },
    { id: "contact" as Section, label: "Contact Page", icon: Mail },
    { id: "navigation" as Section, label: "Navigation", icon: Menu },
    { id: "footer" as Section, label: "Footer & Socials", icon: LinkIcon },
    { id: "settings" as Section, label: "Settings", icon: Settings },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to Supabase
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleSectionChange = (section: Section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      {/* Admin Header */}
      <header className="bg-white border-b-2 border-[var(--ink)]/10 px-3 md:px-6 py-3 md:py-4 flex justify-between items-center shadow-sm sticky top-0 z-40">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-[var(--ink)]/5 rounded transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="font-display text-lg md:text-3xl uppercase">Admin</h1>
          <span className="hidden sm:inline bg-[var(--tv-red)] text-white px-2 md:px-3 py-1 text-xs md:text-sm font-display uppercase">
            SON Networks
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-xs md:text-sm rounded"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">View Site</span>
          </a>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1 md:gap-2 bg-[var(--tv-red)] text-white px-3 md:px-6 py-2 font-display uppercase text-xs md:text-sm hover:bg-red-600 transition-colors disabled:opacity-50 rounded"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">{isSaving ? "Saving..." : "Save All"}</span>
          </button>
        </div>
      </header>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-white border-r-2 border-[var(--ink)]/10 shadow-sm
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:min-h-[calc(100vh-73px)] pt-16 lg:pt-0
        `}>
          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-[var(--ink)]/5 rounded"
          >
            <X className="w-5 h-5" />
          </button>

          <nav className="py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 font-display uppercase text-xs md:text-sm transition-colors ${
                    isActive
                      ? "bg-[var(--tv-red)] text-white"
                      : "hover:bg-[var(--ink)]/5"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-x-hidden">
          {activeSection === "home" && <HomeEditor />}
          {activeSection === "media" && <MediaLibrary />}
          {activeSection === "shows" && <ShowsEditor />}
          {activeSection === "join" && <JoinEditor />}
          {activeSection === "contact" && <ContactEditor />}
          {activeSection === "navigation" && <NavigationEditor />}
          {activeSection === "footer" && <FooterEditor />}
          {activeSection === "settings" && <SettingsEditor />}
        </main>
      </div>
    </div>
  );
}

// Image Preview Component
function ImagePreview({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  if (!src) return (
    <div className={`bg-[var(--ink)]/5 flex items-center justify-center ${className}`}>
      <ImageIcon className="w-8 h-8 text-[var(--ink)]/20" />
    </div>
  );
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={`object-cover ${className}`} />
  );
}

// Video Preview Component
function VideoPreview({ videoId }: { videoId: string }) {
  if (!videoId) return (
    <div className="aspect-video bg-[var(--ink)]/5 flex items-center justify-center">
      <Film className="w-8 h-8 text-[var(--ink)]/20" />
    </div>
  );
  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

// Image Upload Component with URL or File upload option
function ImageUploader({
  currentUrl,
  onImageChange,
  label,
  className = ""
}: {
  currentUrl: string;
  onImageChange: (url: string) => void;
  label: string;
  className?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      onImageChange(url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Make sure Supabase is configured correctly.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    onImageChange(urlInput);
    setShowUrlInput(false);
  };

  return (
    <div className={className}>
      <label className="block font-display uppercase text-sm mb-2">{label}</label>

      {/* Preview */}
      <div className="relative group mb-3">
        <ImagePreview src={currentUrl} alt={label} className="w-full h-32 border border-[var(--ink)]/20 rounded" />

        {/* Overlay with actions - always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-3 py-2 bg-[var(--tv-red)] text-white text-xs font-display uppercase hover:bg-red-600 transition-colors flex items-center gap-1 rounded"
          >
            <Upload className="w-3 h-3" />
            {isUploading ? "..." : "Upload"}
          </button>
          <button
            onClick={() => {
              setUrlInput(currentUrl);
              setShowUrlInput(true);
            }}
            className="px-3 py-2 bg-white/20 text-white text-xs font-display uppercase hover:bg-white/30 transition-colors flex items-center gap-1 rounded"
          >
            <LinkIcon className="w-3 h-3" />
            URL
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* URL Input Modal */}
      {showUrlInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-[var(--ink)]/10 p-6 max-w-lg w-full mx-4 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display uppercase text-lg">Enter Image URL</h4>
              <button onClick={() => setShowUrlInput(false)} className="text-[var(--ink)]/50 hover:text-[var(--ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://..."
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] mb-4 rounded"
            />
            {urlInput && (
              <div className="mb-4">
                <ImagePreview src={urlInput} alt="Preview" className="w-full h-32 border border-[var(--ink)]/20 rounded" />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleUrlSubmit}
                className="flex-1 px-4 py-2 bg-[var(--tv-red)] text-white font-display uppercase text-sm hover:bg-red-600 transition-colors rounded"
              >
                Apply
              </button>
              <button
                onClick={() => setShowUrlInput(false)}
                className="px-4 py-2 border border-[var(--ink)]/20 font-display uppercase text-sm hover:bg-[var(--ink)]/5 transition-colors rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Video Input Component - accepts YouTube link or video upload
function VideoInput({
  currentVideoId,
  onVideoChange,
  label,
  className = ""
}: {
  currentVideoId: string;
  onVideoChange: (videoId: string) => void;
  label: string;
  className?: string;
}) {
  const [showModal, setShowModal] = useState(false);
  const [inputMode, setInputMode] = useState<"link" | "upload">("link");
  const [linkInput, setLinkInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (input: string): string => {
    // If it's already just an ID (11 characters, alphanumeric with - and _)
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    // Try to extract from URL
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = input.match(pattern);
      if (match) return match[1];
    }

    return input; // Return as-is if no pattern matches
  };

  const handleLinkSubmit = () => {
    const videoId = extractVideoId(linkInput);
    onVideoChange(videoId);
    setShowModal(false);
    setLinkInput("");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload video to Supabase storage
      const url = await uploadImage(file, "videos");
      // For uploaded videos, we'll store the full URL with a prefix to identify it
      onVideoChange(`uploaded:${url}`);
      setShowModal(false);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Make sure Supabase is configured correctly.");
    } finally {
      setIsUploading(false);
    }
  };

  const isUploadedVideo = currentVideoId.startsWith("uploaded:");
  const displayVideoId = isUploadedVideo ? currentVideoId.replace("uploaded:", "") : currentVideoId;

  return (
    <div className={className}>
      <label className="block font-display uppercase text-sm mb-2">{label}</label>

      {/* Preview */}
      <div className="relative group mb-3">
        {isUploadedVideo ? (
          <video src={displayVideoId} className="w-full h-32 object-cover border border-[var(--ink)]/20 rounded" />
        ) : (
          <div className="h-32 border border-[var(--ink)]/20 rounded overflow-hidden">
            <VideoPreview videoId={currentVideoId} />
          </div>
        )}

        {/* Overlay with action - always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center rounded">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-[var(--tv-red)] text-white text-xs font-display uppercase hover:bg-red-600 transition-colors flex items-center gap-2 rounded"
          >
            <Film className="w-4 h-4" />
            Change Video
          </button>
        </div>
      </div>

      {/* Current value display */}
      {currentVideoId && (
        <p className="text-xs text-[var(--ink)]/50 truncate">
          {isUploadedVideo ? "Uploaded video" : `YouTube ID: ${currentVideoId}`}
        </p>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white border border-[var(--ink)]/10 p-6 max-w-lg w-full mx-4 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display uppercase text-lg">Add Video</h4>
              <button onClick={() => setShowModal(false)} className="text-[var(--ink)]/50 hover:text-[var(--ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setInputMode("link")}
                className={`flex-1 py-2 font-display uppercase text-sm flex items-center justify-center gap-2 rounded ${
                  inputMode === "link"
                    ? "bg-[var(--tv-red)] text-white"
                    : "border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5"
                } transition-colors`}
              >
                <LinkIcon className="w-4 h-4" />
                YouTube Link
              </button>
              <button
                onClick={() => setInputMode("upload")}
                className={`flex-1 py-2 font-display uppercase text-sm flex items-center justify-center gap-2 rounded ${
                  inputMode === "upload"
                    ? "bg-[var(--tv-red)] text-white"
                    : "border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5"
                } transition-colors`}
              >
                <Upload className="w-4 h-4" />
                Upload Video
              </button>
            </div>

            {inputMode === "link" ? (
              <>
                <p className="text-xs text-[var(--ink)]/70 mb-3">
                  Paste a YouTube link or video ID
                </p>
                <input
                  type="text"
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or video ID"
                  className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] mb-4 rounded"
                />
                {linkInput && (
                  <div className="mb-4">
                    <VideoPreview videoId={extractVideoId(linkInput)} />
                  </div>
                )}
                <button
                  onClick={handleLinkSubmit}
                  disabled={!linkInput}
                  className="w-full px-4 py-2 bg-[var(--tv-red)] text-white font-display uppercase text-sm hover:bg-red-600 transition-colors disabled:opacity-50 rounded"
                >
                  Apply
                </button>
              </>
            ) : (
              <>
                <p className="text-xs text-[var(--ink)]/70 mb-3">
                  Upload a video file (requires Supabase storage)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full py-8 border-2 border-dashed border-[var(--ink)]/20 hover:border-[var(--tv-red)] transition-colors flex flex-col items-center justify-center gap-2 rounded"
                >
                  <Upload className="w-8 h-8 text-[var(--ink)]/30" />
                  <span className="text-sm text-[var(--ink)]/50">
                    {isUploading ? "Uploading..." : "Click to select video file"}
                  </span>
                </button>
              </>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 px-4 py-2 border border-[var(--ink)]/20 font-display uppercase text-sm hover:bg-[var(--ink)]/5 transition-colors rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Home Page Editor
function HomeEditor() {
  const [heroData, setHeroData] = useState({
    title: "Ready",
    titleAccent: "To Roll.",
    subtitle: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
    ctaText: "Watch Shows",
    ctaLink: "/shows",
    backgroundImage: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg",
    featuredVideoId: "hSiSKAgO3mM",
    featuredVideoThumbnail: "https://images.pexels.com/photos/8360007/pexels-photo-8360007.jpeg",
  });

  const [marqueeItems, setMarqueeItems] = useState([
    "Digital Production House",
    "Original Series",
    "Brand Stories",
    "Viral Content",
  ]);

  const [capabilities, setCapabilities] = useState([
    { title: "Create", description: "Bring your wildest ideas to life with us" },
    { title: "Collaborate", description: "Join forces with our creative network" },
    { title: "Innovate", description: "Push boundaries and break the internet" },
    { title: "Launch", description: "Go viral and reach millions together" },
  ]);

  const [studioSection, setStudioSection] = useState({
    title: "We Don't",
    titleAccent: "Play Safe.",
    subtitle: "SON Networks is a new breed of production house. We combine cinematic quality with the pacing of internet culture.",
  });

  const [studioImages, setStudioImages] = useState([
    "https://images.pexels.com/photos/8374522/pexels-photo-8374522.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/7676502/pexels-photo-7676502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    "https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  ]);

  const [featuredSection, setFeaturedSection] = useState({
    image: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    videoId: "hSiSKAgO3mM",
    label: "Trending",
    title: "Behind The Scenes",
  });

  const [quoteSection, setQuoteSection] = useState({
    quote: "We don't chase trends.",
    quoteAccent: "We set them.",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Home Page Editor</h2>

      {/* Hero Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Home className="w-5 h-5 text-[var(--tv-red)]" />
          Hero Section
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Left column - text fields */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-display uppercase text-sm mb-2">Title</label>
                <input
                  type="text"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
              <div>
                <label className="block font-display uppercase text-sm mb-2">Title Accent (Red)</label>
                <input
                  type="text"
                  value={heroData.titleAccent}
                  onChange={(e) => setHeroData({ ...heroData, titleAccent: e.target.value })}
                  className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
            </div>
            <div>
              <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
              <textarea
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                rows={3}
                className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-display uppercase text-sm mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={heroData.ctaText}
                  onChange={(e) => setHeroData({ ...heroData, ctaText: e.target.value })}
                  className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
              <div>
                <label className="block font-display uppercase text-sm mb-2">CTA Link</label>
                <input
                  type="text"
                  value={heroData.ctaLink}
                  onChange={(e) => setHeroData({ ...heroData, ctaLink: e.target.value })}
                  className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
            </div>
          </div>
          {/* Right column - image upload */}
          <div>
            <ImageUploader
              currentUrl={heroData.backgroundImage}
              onImageChange={(url) => setHeroData({ ...heroData, backgroundImage: url })}
              label="Background Image"
            />
          </div>
        </div>

        {/* Featured Video Section */}
        <div className="mt-6 pt-6 border-t border-[var(--ink)]/10">
          <h4 className="font-display text-lg uppercase mb-4">Featured Video (Right Side)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <VideoInput
              currentVideoId={heroData.featuredVideoId}
              onVideoChange={(videoId) => setHeroData({ ...heroData, featuredVideoId: videoId })}
              label="Featured Video"
            />
            <ImageUploader
              currentUrl={heroData.featuredVideoThumbnail}
              onImageChange={(url) => setHeroData({ ...heroData, featuredVideoThumbnail: url })}
              label="Video Thumbnail"
            />
          </div>
        </div>
      </section>

      {/* Studio Images */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[var(--tv-red)]" />
          Studio Scrolling Images
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {studioImages.map((src, index) => (
            <div key={index} className="space-y-2">
              <ImageUploader
                currentUrl={src}
                onImageChange={(url) => {
                  const newImages = [...studioImages];
                  newImages[index] = url;
                  setStudioImages(newImages);
                }}
                label={`Image ${index + 1}`}
              />
              <button
                onClick={() => setStudioImages(studioImages.filter((_, i) => i !== index))}
                className="w-full px-2 py-1 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors text-xs flex items-center justify-center gap-1"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => setStudioImages([...studioImages, ""])}
          className="flex items-center gap-2 px-4 py-2 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Image
        </button>
      </section>

      {/* Featured Grid Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Featured Grid Section
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Label Badge</label>
            <input
              type="text"
              value={featuredSection.label}
              onChange={(e) => setFeaturedSection({ ...featuredSection, label: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={featuredSection.title}
              onChange={(e) => setFeaturedSection({ ...featuredSection, title: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <VideoInput
            currentVideoId={featuredSection.videoId}
            onVideoChange={(videoId) => setFeaturedSection({ ...featuredSection, videoId: videoId })}
            label="Video (plays on click)"
          />
          <ImageUploader
            currentUrl={featuredSection.image}
            onImageChange={(url) => setFeaturedSection({ ...featuredSection, image: url })}
            label="Background Image"
          />
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Marquee Text
        </h3>

        <div className="space-y-4">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const newItems = [...marqueeItems];
                  newItems[index] = e.target.value;
                  setMarqueeItems(newItems);
                }}
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
              <button
                onClick={() => setMarqueeItems(marqueeItems.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setMarqueeItems([...marqueeItems, "New Item"])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[var(--tv-red)]" />
          Capabilities
        </h3>

        <div className="space-y-4">
          {capabilities.map((cap, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={cap.title}
                  onChange={(e) => {
                    const newCaps = [...capabilities];
                    newCaps[index] = { ...newCaps[index], title: e.target.value };
                    setCapabilities(newCaps);
                  }}
                  placeholder="Title"
                  className="bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
                <input
                  type="text"
                  value={cap.description}
                  onChange={(e) => {
                    const newCaps = [...capabilities];
                    newCaps[index] = { ...newCaps[index], description: e.target.value };
                    setCapabilities(newCaps);
                  }}
                  placeholder="Description"
                  className="bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
              <button
                onClick={() => setCapabilities(capabilities.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            onClick={() => setCapabilities([...capabilities, { title: "", description: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Capability
          </button>
        </div>
      </section>

      {/* Studio Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Studio Section
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={studioSection.title}
              onChange={(e) => setStudioSection({ ...studioSection, title: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title Accent (Stroke)</label>
            <input
              type="text"
              value={studioSection.titleAccent}
              onChange={(e) => setStudioSection({ ...studioSection, titleAccent: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <textarea
              value={studioSection.subtitle}
              onChange={(e) => setStudioSection({ ...studioSection, subtitle: e.target.value })}
              rows={3}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Quote Section
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Quote</label>
            <input
              type="text"
              value={quoteSection.quote}
              onChange={(e) => setQuoteSection({ ...quoteSection, quote: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Quote Accent (Red)</label>
            <input
              type="text"
              value={quoteSection.quoteAccent}
              onChange={(e) => setQuoteSection({ ...quoteSection, quoteAccent: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Media Library
function MediaLibrary() {
  const [images, setImages] = useState([
    { url: "https://images.pexels.com/photos/3929480/pexels-photo-3929480.jpeg", name: "Hero Background", category: "Hero" },
    { url: "https://images.pexels.com/photos/8360007/pexels-photo-8360007.jpeg", name: "Featured Video Thumbnail", category: "Hero" },
    { url: "https://images.pexels.com/photos/8374522/pexels-photo-8374522.jpeg", name: "Studio Image 1", category: "Studio" },
    { url: "https://images.pexels.com/photos/257904/pexels-photo-257904.jpeg", name: "Studio Image 2", category: "Studio" },
    { url: "https://images.pexels.com/photos/7676502/pexels-photo-7676502.jpeg", name: "Studio Image 3", category: "Studio" },
    { url: "https://images.pexels.com/photos/320617/pexels-photo-320617.jpeg", name: "Studio Image 4", category: "Studio" },
    { url: "https://images.pexels.com/photos/2510428/pexels-photo-2510428.jpeg", name: "Featured Grid", category: "Featured" },
    { url: "https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg", name: "Show Thumbnail 1", category: "Shows" },
    { url: "https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg", name: "Show Thumbnail 2", category: "Shows" },
    { url: "https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg", name: "Show Thumbnail 3", category: "Shows" },
  ]);

  const [videos, setVideos] = useState([
    { videoId: "hSiSKAgO3mM", title: "Main Featured Video", category: "Featured" },
  ]);

  const [newImage, setNewImage] = useState({ url: "", name: "", category: "General" });
  const [newVideo, setNewVideo] = useState({ videoId: "", title: "", category: "General" });
  const [filter, setFilter] = useState("all");

  const categories = ["all", "Hero", "Studio", "Featured", "Shows", "General"];
  const filteredImages = filter === "all" ? images : images.filter(img => img.category === filter);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Media Library</h2>

      {/* Add New Image */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[var(--tv-red)]" />
          Add New Image
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="col-span-1 md:col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Image URL</label>
            <input
              type="text"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Name</label>
            <input
              type="text"
              value={newImage.name}
              onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
              placeholder="Image name"
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Category</label>
            <select
              value={newImage.category}
              onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            >
              <option value="General">General</option>
              <option value="Hero">Hero</option>
              <option value="Studio">Studio</option>
              <option value="Featured">Featured</option>
              <option value="Shows">Shows</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-center">
          {newImage.url && (
            <ImagePreview src={newImage.url} alt="Preview" className="w-24 h-24 border border-[var(--ink)]/20" />
          )}
          <button
            onClick={() => {
              if (newImage.url && newImage.name) {
                setImages([...images, newImage]);
                setNewImage({ url: "", name: "", category: "General" });
              }
            }}
            className="px-6 py-3 bg-[var(--tv-red)] font-display uppercase text-sm hover:bg-red-600 transition-colors"
          >
            Add Image
          </button>
        </div>
      </section>

      {/* Add New Video */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Add New Video
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-display uppercase text-sm mb-2">YouTube Video ID</label>
            <input
              type="text"
              value={newVideo.videoId}
              onChange={(e) => setNewVideo({ ...newVideo, videoId: e.target.value })}
              placeholder="e.g. dQw4w9WgXcQ"
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              placeholder="Video title"
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Category</label>
            <select
              value={newVideo.category}
              onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            >
              <option value="General">General</option>
              <option value="Featured">Featured</option>
              <option value="Shows">Shows</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-end">
          {newVideo.videoId && (
            <div className="w-64">
              <VideoPreview videoId={newVideo.videoId} />
            </div>
          )}
          <button
            onClick={() => {
              if (newVideo.videoId && newVideo.title) {
                setVideos([...videos, newVideo]);
                setNewVideo({ videoId: "", title: "", category: "General" });
              }
            }}
            className="px-6 py-3 bg-[var(--tv-red)] font-display uppercase text-sm hover:bg-red-600 transition-colors"
          >
            Add Video
          </button>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-2xl uppercase flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[var(--tv-red)]" />
            Images ({filteredImages.length})
          </h3>
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 font-display uppercase text-xs border ${
                  filter === cat
                    ? "bg-[var(--tv-red)] border-[var(--tv-red)]"
                    : "border-[var(--cream)]/30 hover:bg-[var(--cream)]/10"
                } transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.map((img, index) => (
            <div key={index} className="group relative">
              <ImagePreview src={img.url} alt={img.name} className="w-full h-32 border border-[var(--ink)]/20 rounded" />
              <div className="absolute inset-0 bg-black/70 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 rounded text-white">
                <div>
                  <p className="text-xs font-bold truncate">{img.name}</p>
                  <p className="text-xs text-[var(--tv-red)]">{img.category}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => navigator.clipboard.writeText(img.url)}
                    className="flex-1 px-2 py-1 bg-white/20 text-xs hover:bg-white/30 transition-colors rounded"
                  >
                    Copy URL
                  </button>
                  <button
                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                    className="px-2 py-1 bg-red-500/50 text-xs hover:bg-red-500 transition-colors rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Gallery */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Videos ({videos.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {videos.map((video, index) => (
            <div key={index} className="border border-[var(--ink)]/10 p-4 rounded-lg">
              <VideoPreview videoId={video.videoId} />
              <div className="mt-3 flex justify-between items-center">
                <div>
                  <p className="font-display uppercase text-sm">{video.title}</p>
                  <p className="text-xs text-[var(--tv-red)]">{video.category}</p>
                  <p className="text-xs text-[var(--cream)]/50">ID: {video.videoId}</p>
                </div>
                <button
                  onClick={() => setVideos(videos.filter((_, i) => i !== index))}
                  className="px-3 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Shows Editor
function ShowsEditor() {
  const [shows, setShows] = useState([
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/8981855/pexels-photo-8981855.jpeg", title: "Studio Session", category: "Behind The Scenes" },
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/4911179/pexels-photo-4911179.jpeg", title: "Content Creation", category: "Viral Short" },
    { videoId: "hSiSKAgO3mM", thumbnail: "https://images.pexels.com/photos/7676469/pexels-photo-7676469.jpeg", title: "Creative Process", category: "Documentary" },
  ]);

  const [pageContent, setPageContent] = useState({
    title: "Our Shows",
    subtitle: "Streaming now on YouTube. Click to watch.",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Shows Editor</h2>

      {/* Page Header */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Page Header
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={pageContent.title}
              onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={pageContent.subtitle}
              onChange={(e) => setPageContent({ ...pageContent, subtitle: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>

      {/* Shows List */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Film className="w-5 h-5 text-[var(--tv-red)]" />
          Videos ({shows.length})
        </h3>

        <div className="space-y-6">
          {shows.map((show, index) => (
            <div key={index} className="border border-[var(--ink)]/10 p-4 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-display uppercase text-xs mb-1">Title</label>
                  <input
                    type="text"
                    value={show.title}
                    onChange={(e) => {
                      const newShows = [...shows];
                      newShows[index] = { ...newShows[index], title: e.target.value };
                      setShows(newShows);
                    }}
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                  />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs mb-1">Category</label>
                  <input
                    type="text"
                    value={show.category}
                    onChange={(e) => {
                      const newShows = [...shows];
                      newShows[index] = { ...newShows[index], category: e.target.value };
                      setShows(newShows);
                    }}
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <VideoInput
                  currentVideoId={show.videoId}
                  onVideoChange={(videoId) => {
                    const newShows = [...shows];
                    newShows[index] = { ...newShows[index], videoId };
                    setShows(newShows);
                  }}
                  label="Video"
                />
                <ImageUploader
                  currentUrl={show.thumbnail}
                  onImageChange={(url) => {
                    const newShows = [...shows];
                    newShows[index] = { ...newShows[index], thumbnail: url };
                    setShows(newShows);
                  }}
                  label="Thumbnail"
                />
              </div>
              <button
                onClick={() => setShows(shows.filter((_, i) => i !== index))}
                className="mt-4 px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors text-sm rounded"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Remove Video
              </button>
            </div>
          ))}
          <button
            onClick={() => setShows([...shows, { videoId: "", thumbnail: "", title: "", category: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        </div>
      </section>
    </div>
  );
}

// Join Page Editor
function JoinEditor() {
  const [pageContent, setPageContent] = useState({
    title: "Join The",
    titleAccent: "Team.",
    subtitle: "We are always looking for editors, writers, and talent. If you have the sauce, we have the platform.",
    pitchTitle: "Got An",
    pitchTitleAccent: "Idea?",
    pitchSubtitle: "We want to hear your craziest concepts. Pitch us your show, series, or one-off video idea.",
  });

  const [roles, setRoles] = useState([
    { title: "Content Creator", type: "Remote", description: "Bring your unique voice and ideas to our network." },
    { title: "Script Writer", type: "LA / Hybrid", description: "Comedy focused. Must be chronically online." },
    { title: "On-Screen Talent", type: "Flexible", description: "Camera-ready personalities who can captivate audiences." },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Join Page Editor</h2>

      {/* Page Content */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Page Content
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title</label>
            <input
              type="text"
              value={pageContent.title}
              onChange={(e) => setPageContent({ ...pageContent, title: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Title Accent</label>
            <input
              type="text"
              value={pageContent.titleAccent}
              onChange={(e) => setPageContent({ ...pageContent, titleAccent: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Subtitle</label>
            <textarea
              value={pageContent.subtitle}
              onChange={(e) => setPageContent({ ...pageContent, subtitle: e.target.value })}
              rows={2}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-[var(--tv-red)]" />
          Open Roles
        </h3>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <div key={index} className="border border-[var(--ink)]/10 p-4 rounded-lg">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Role Title</label>
                  <input
                    type="text"
                    value={role.title}
                    onChange={(e) => {
                      const newRoles = [...roles];
                      newRoles[index] = { ...newRoles[index], title: e.target.value };
                      setRoles(newRoles);
                    }}
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                  />
                </div>
                <div>
                  <label className="block font-display uppercase text-xs mb-2">Type</label>
                  <input
                    type="text"
                    value={role.type}
                    onChange={(e) => {
                      const newRoles = [...roles];
                      newRoles[index] = { ...newRoles[index], type: e.target.value };
                      setRoles(newRoles);
                    }}
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setRoles(roles.filter((_, i) => i !== index))}
                    className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-display uppercase text-xs mb-2">Description</label>
                <input
                  type="text"
                  value={role.description}
                  onChange={(e) => {
                    const newRoles = [...roles];
                    newRoles[index] = { ...newRoles[index], description: e.target.value };
                    setRoles(newRoles);
                  }}
                  className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
                />
              </div>
            </div>
          ))}
          <button
            onClick={() => setRoles([...roles, { title: "", type: "", description: "" }])}
            className="flex items-center gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>
      </section>
    </div>
  );
}

// Contact Page Editor
function ContactEditor() {
  const [pageContent, setPageContent] = useState({
    formTitle: "Hit Us Up",
    infoTitle: "Let's",
    infoTitleAccent: "Talk.",
    infoSubtitle: "Whether you're a brand looking to collaborate, a creator wanting to join, or just want to say hi.",
    email: "hello@sonnetworks.com",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Contact Page Editor</h2>

      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[var(--tv-red)]" />
          Page Content
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Form Title</label>
            <input
              type="text"
              value={pageContent.formTitle}
              onChange={(e) => setPageContent({ ...pageContent, formTitle: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Contact Email</label>
            <input
              type="email"
              value={pageContent.email}
              onChange={(e) => setPageContent({ ...pageContent, email: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Info Title</label>
            <input
              type="text"
              value={pageContent.infoTitle}
              onChange={(e) => setPageContent({ ...pageContent, infoTitle: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Info Title Accent</label>
            <input
              type="text"
              value={pageContent.infoTitleAccent}
              onChange={(e) => setPageContent({ ...pageContent, infoTitleAccent: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Info Subtitle</label>
            <textarea
              value={pageContent.infoSubtitle}
              onChange={(e) => setPageContent({ ...pageContent, infoSubtitle: e.target.value })}
              rows={2}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// Navigation Editor
function NavigationEditor() {
  const [navItems, setNavItems] = useState([
    { label: "Home", href: "/" },
    { label: "Shows", href: "/shows" },
    { label: "Join Us", href: "/join" },
    { label: "Contact Us", href: "/contact" },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Navigation Editor</h2>

      <section className="bg-white border border-[var(--ink)]/10 p-4 md:p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Menu className="w-5 h-5 text-[var(--tv-red)]" />
          Menu Items
        </h3>

        {/* Mobile: Card-based layout */}
        <div className="space-y-3 md:hidden">
          {navItems.map((item, index) => (
            <div key={index} className="bg-[var(--cream)]/50 border border-[var(--ink)]/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <span className="font-display uppercase text-xs text-[var(--ink)]/50">Menu Item {index + 1}</span>
                <button
                  onClick={() => setNavItems(navItems.filter((_, i) => i !== index))}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-display uppercase text-[var(--ink)]/70 mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newItems = [...navItems];
                      newItems[index] = { ...newItems[index], label: e.target.value };
                      setNavItems(newItems);
                    }}
                    placeholder="e.g. Home"
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2.5 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display uppercase text-[var(--ink)]/70 mb-1">Link Path</label>
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => {
                      const newItems = [...navItems];
                      newItems[index] = { ...newItems[index], href: e.target.value };
                      setNavItems(newItems);
                    }}
                    placeholder="e.g. /about"
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2.5 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table-like layout */}
        <div className="hidden md:block space-y-4">
          {navItems.map((item, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={item.label}
                onChange={(e) => {
                  const newItems = [...navItems];
                  newItems[index] = { ...newItems[index], label: e.target.value };
                  setNavItems(newItems);
                }}
                placeholder="Label"
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
              <input
                type="text"
                value={item.href}
                onChange={(e) => {
                  const newItems = [...navItems];
                  newItems[index] = { ...newItems[index], href: e.target.value };
                  setNavItems(newItems);
                }}
                placeholder="/path"
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
              <button
                onClick={() => setNavItems(navItems.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setNavItems([...navItems, { label: "", href: "/" }])}
          className="w-full md:w-auto mt-4 flex items-center justify-center md:justify-start gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm rounded"
        >
          <Plus className="w-4 h-4" />
          Add Menu Item
        </button>
      </section>
    </div>
  );
}

// Footer Editor
function FooterEditor() {
  const [footerContent, setFooterContent] = useState({
    companyName: "SON NETWORKS",
  });

  const [socialLinks, setSocialLinks] = useState([
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "YouTube", href: "https://www.youtube.com/sonnetworks" },
  ]);

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Footer & Socials Editor</h2>

      <section className="bg-white border border-[var(--ink)]/10 p-4 md:p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-[var(--tv-red)]" />
          Footer Content
        </h3>

        <div>
          <label className="block font-display uppercase text-sm mb-2">Company Name</label>
          <input
            type="text"
            value={footerContent.companyName}
            onChange={(e) => setFooterContent({ ...footerContent, companyName: e.target.value })}
            className="w-full md:max-w-md bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
          />
        </div>
      </section>

      <section className="bg-white border border-[var(--ink)]/10 p-4 md:p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <LinkIcon className="w-5 h-5 text-[var(--tv-red)]" />
          Social Links
        </h3>

        {/* Mobile: Card-based layout */}
        <div className="space-y-3 md:hidden">
          {socialLinks.map((link, index) => (
            <div key={index} className="bg-[var(--cream)]/50 border border-[var(--ink)]/10 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <span className="font-display uppercase text-xs text-[var(--ink)]/50">Social Link {index + 1}</span>
                <button
                  onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                  className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-display uppercase text-[var(--ink)]/70 mb-1">Platform Name</label>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index] = { ...newLinks[index], label: e.target.value };
                      setSocialLinks(newLinks);
                    }}
                    placeholder="e.g. Instagram"
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2.5 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-display uppercase text-[var(--ink)]/70 mb-1">Profile URL</label>
                  <input
                    type="text"
                    value={link.href}
                    onChange={(e) => {
                      const newLinks = [...socialLinks];
                      newLinks[index] = { ...newLinks[index], href: e.target.value };
                      setSocialLinks(newLinks);
                    }}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-white border border-[var(--ink)]/20 px-3 py-2.5 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table-like layout */}
        <div className="hidden md:block space-y-4">
          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={link.label}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index] = { ...newLinks[index], label: e.target.value };
                  setSocialLinks(newLinks);
                }}
                placeholder="Label (e.g. Instagram)"
                className="w-48 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
              <input
                type="text"
                value={link.href}
                onChange={(e) => {
                  const newLinks = [...socialLinks];
                  newLinks[index] = { ...newLinks[index], href: e.target.value };
                  setSocialLinks(newLinks);
                }}
                placeholder="https://..."
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
              <button
                onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                className="px-4 py-3 border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors rounded"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSocialLinks([...socialLinks, { label: "", href: "" }])}
          className="w-full md:w-auto mt-4 flex items-center justify-center md:justify-start gap-2 px-4 py-3 border border-[var(--ink)]/20 hover:bg-[var(--ink)]/5 transition-colors font-display uppercase text-sm rounded"
        >
          <Plus className="w-4 h-4" />
          Add Social Link
        </button>
      </section>
    </div>
  );
}

// Settings Editor
function SettingsEditor() {
  const [siteSettings, setSiteSettings] = useState({
    siteName: "SON Networks",
    siteDescription: "SON Networks creates binge-worthy internet culture. We turn chaotic ideas into polished, high-octane entertainment.",
    logoUrl: "https://yt3.googleusercontent.com/Jlx-jh1nmdOXcZF_kGW8nF7kCwJ7uDL8zhDkw9h37l___lcfXE2DMR2Gb9GcAfnzvpBv3JmbpQ=s160-c-k-c0x00ffffff-no-rj",
  });

  const [colors, setColors] = useState({
    ink: "#111111",
    cream: "#F3F0E6",
    tvRed: "#FF3333",
  });

  return (
    <div className="space-y-8">
      <h2 className="font-display text-2xl md:text-4xl uppercase mb-4 md:mb-8">Site Settings</h2>

      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <Settings className="w-5 h-5 text-[var(--tv-red)]" />
          General Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Site Name</label>
            <input
              type="text"
              value={siteSettings.siteName}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Logo URL</label>
            <input
              type="text"
              value={siteSettings.logoUrl}
              onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block font-display uppercase text-sm mb-2">Site Description (SEO)</label>
            <textarea
              value={siteSettings.siteDescription}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
              rows={3}
              className="w-full bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
            />
          </div>
        </div>
      </section>

      <section className="bg-white border border-[var(--ink)]/10 p-6 rounded-lg shadow-sm">
        <h3 className="font-display text-lg md:text-2xl uppercase mb-4 md:mb-6 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-[var(--tv-red)]" />
          Brand Colors
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Ink (Dark)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.ink}
                onChange={(e) => setColors({ ...colors, ink: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.ink}
                onChange={(e) => setColors({ ...colors, ink: e.target.value })}
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
            </div>
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Cream (Light)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.cream}
                onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.cream}
                onChange={(e) => setColors({ ...colors, cream: e.target.value })}
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
            </div>
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">TV Red (Accent)</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={colors.tvRed}
                onChange={(e) => setColors({ ...colors, tvRed: e.target.value })}
                className="w-12 h-12 border-0 cursor-pointer"
              />
              <input
                type="text"
                value={colors.tvRed}
                onChange={(e) => setColors({ ...colors, tvRed: e.target.value })}
                className="flex-1 bg-white border border-[var(--ink)]/20 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-[var(--tv-red)] rounded"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
        <h3 className="font-display text-xl uppercase mb-4 text-amber-700">Supabase Connection</h3>
        <p className="text-[var(--ink)]/70 mb-4">
          To enable data persistence, connect your Supabase project. You&apos;ll need to add your Supabase URL and anon key to your environment variables.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block font-display uppercase text-sm mb-2">Supabase URL</label>
            <input
              type="text"
              placeholder="https://your-project.supabase.co"
              className="w-full bg-white border border-amber-300 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-amber-500 rounded"
            />
          </div>
          <div>
            <label className="block font-display uppercase text-sm mb-2">Anon Key</label>
            <input
              type="password"
              placeholder="your-anon-key"
              className="w-full bg-white border border-amber-300 px-4 py-3 text-[var(--ink)] focus:outline-none focus:border-amber-500 rounded"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
