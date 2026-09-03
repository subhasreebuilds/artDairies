"use client";

import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, Trash2, Plus, Image as ImageIcon } from "lucide-react";

type CustomArtwork = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  publicId: string;
};

export default function AdminGalleryPage() {
  const [artworks, setArtworks] = useState<CustomArtwork[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.artworks) {
        setArtworks(data.artworks);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      try {
        setIsUploading(true);
        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newTitle || "Untitled Artwork",
            description: newDescription,
            imageUrl: result.info.secure_url,
            publicId: result.info.public_id,
          }),
        });
        
        if (res.ok) {
          setNewTitle("");
          setNewDescription("");
          setShowUploadForm(false);
          fetchArtworks();
        }
      } catch (error) {
        console.error("Error saving artwork to db:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this artwork?")) return;
    
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchArtworks();
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-serif font-semibold dark:text-white">Custom Gallery</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage artworks not on your Instagram feed.</p>
        </div>
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {showUploadForm ? "Cancel" : <><Plus size={18} /> Upload Artwork</>}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-2xl mb-8 shadow-sm">
          <h2 className="font-semibold mb-4 dark:text-white">Upload New Artwork</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Golden Sunrise" 
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-neutral-700 dark:text-neutral-300">Description (Optional)</label>
                <textarea 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Tell a story about this piece..." 
                  className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white min-h-[100px]"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 h-full min-h-[200px]">
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <button 
                    onClick={() => open()}
                    disabled={isUploading}
                    className="flex flex-col items-center gap-3 p-6 text-neutral-500 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50"
                  >
                    <Upload size={32} />
                    <span className="font-medium">{isUploading ? "Saving..." : "Click to select image"}</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>
      )}

      {/* Grid Display */}
      {artworks.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
          <ImageIcon size={48} className="mx-auto mb-4 text-neutral-300 dark:text-neutral-700" />
          <h3 className="text-lg font-medium dark:text-white mb-1">No custom artworks yet</h3>
          <p className="text-neutral-500">Upload your first piece to build your custom gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((art) => (
            <div key={art.id} className="group relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800">
              <div className="aspect-square relative overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                <img 
                  src={art.imageUrl} 
                  alt={art.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button 
                  onClick={() => handleDelete(art.id)}
                  className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-md transform translate-y-2 group-hover:translate-y-0"
                  title="Delete artwork"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate dark:text-white" title={art.title}>{art.title}</h3>
                {art.description && (
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{art.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
