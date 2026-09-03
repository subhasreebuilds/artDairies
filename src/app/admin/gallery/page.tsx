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
    <div className="max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h1 className="text-3xl font-serif font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-yellow-200">Custom Gallery</h1>
          <p className="text-white/50 text-sm mt-1 font-light">Manage artworks not on your Instagram feed.</p>
        </div>
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-accent-gold to-yellow-600 text-black px-6 py-3 rounded-2xl text-sm font-medium hover:opacity-90 transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transform hover:-translate-y-0.5"
        >
          {showUploadForm ? "Cancel" : <><Plus size={18} /> Upload Artwork</>}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] mb-8 shadow-2xl relative z-10 overflow-hidden">
          {/* Subtle glow inside the form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-gold/10 rounded-full blur-[80px] pointer-events-none" />

          <h2 className="font-semibold mb-6 text-xl text-white/90">Upload New Artwork</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Title</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. The Golden Sunrise" 
                  className="w-full px-5 py-3 rounded-xl border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-white placeholder-white/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-white/70">Description (Optional)</label>
                <textarea 
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Tell a story about this piece..." 
                  className="w-full px-5 py-3 rounded-xl border border-white/10 bg-black/40 focus:outline-none focus:ring-2 focus:ring-accent-gold/50 text-white placeholder-white/30 min-h-[120px] transition-all resize-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-accent-gold/30 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors h-full min-h-[250px] relative group overflow-hidden">
              <CldUploadWidget 
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                onSuccess={handleUploadSuccess}
              >
                {({ open }) => (
                  <button 
                    onClick={() => open()}
                    disabled={isUploading}
                    className="flex flex-col items-center gap-4 p-8 w-full h-full justify-center text-white/50 hover:text-accent-gold transition-colors disabled:opacity-50"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-white/5">
                      <Upload size={32} />
                    </div>
                    <span className="font-medium tracking-wide">{isUploading ? "Saving..." : "Click to select image"}</span>
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>
      )}

      {/* Grid Display */}
      <div className="relative z-10">
        {artworks.length === 0 ? (
          <div className="text-center py-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem]">
            <div className="w-20 h-20 bg-black/40 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/5">
              <ImageIcon size={32} className="text-white/30" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No custom artworks yet</h3>
            <p className="text-white/50 font-light">Upload your first piece to build your custom gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artworks.map((art) => (
              <div key={art.id} className="group relative bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-accent-gold/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <div className="aspect-square relative overflow-hidden bg-black/50">
                  <img 
                    src={art.imageUrl} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <button 
                    onClick={() => handleDelete(art.id)}
                    className="absolute top-4 right-4 p-2.5 bg-red-500/90 text-white rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all shadow-lg transform translate-y-2 group-hover:translate-y-0 backdrop-blur-md"
                    title="Delete artwork"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="p-5 relative z-10 bg-black/20 backdrop-blur-md border-t border-white/5">
                  <h3 className="font-medium truncate text-white/90 font-serif text-lg tracking-wide" title={art.title}>{art.title}</h3>
                  {art.description && (
                    <p className="text-xs text-white/50 mt-1.5 line-clamp-2 font-light leading-relaxed">{art.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
