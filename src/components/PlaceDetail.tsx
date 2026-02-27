import { TouristPlace } from "@/data/tourismData";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Star, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import ImageGallery from "./ImageGallery";

interface PlaceDetailProps {
  place: TouristPlace;
  onBack: () => void;
}

const PlaceDetail = ({ place, onBack }: PlaceDetailProps) => {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 font-body text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to places
      </button>

      {/* Hero Image */}
      <div
        className="relative h-64 cursor-pointer overflow-hidden rounded-2xl md:h-96"
        onClick={() => openGallery(0)}
      >
        <img
          src={place.images[0]}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="mb-2 inline-block rounded-full bg-primary px-3 py-1 font-body text-xs font-medium text-primary-foreground">
            {place.category}
          </span>
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">
            {place.name}
          </h2>
        </div>
      </div>

      {/* Image thumbnails */}
      {place.images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {place.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${place.name} ${i + 1}`}
              onClick={() => openGallery(i)}
              className="h-20 w-28 shrink-0 cursor-pointer rounded-xl object-cover opacity-80 transition-all hover:opacity-100 hover:ring-2 hover:ring-primary"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">About</h3>
            <p className="mt-3 font-body leading-relaxed text-muted-foreground">
              {place.description}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">History</h3>
            <p className="mt-3 font-body leading-relaxed text-muted-foreground">
              {place.history}
            </p>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-display text-xl font-semibold text-foreground">Why Visit</h3>
            <p className="mt-3 font-body leading-relaxed text-muted-foreground">
              {place.importance}
            </p>
          </div>

          {/* Embedded Google Map */}
          <div className="glass overflow-hidden rounded-2xl">
            <iframe
              src={place.mapEmbed}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map of ${place.name}`}
              className="w-full"
            />
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-foreground">
              <Clock className="h-5 w-5 text-primary" />
              <h4 className="font-display text-base font-semibold">Best Time to Visit</h4>
            </div>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              {place.bestTimeToVisit}
            </p>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 text-foreground">
              <Star className="h-5 w-5 text-secondary" />
              <h4 className="font-display text-base font-semibold">Category</h4>
            </div>
            <p className="mt-2 font-body text-sm text-muted-foreground">{place.category}</p>
          </div>

          <a
            href={place.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-3 rounded-2xl p-5 transition-colors hover:bg-muted"
          >
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground">
                Google Maps
              </h4>
              <p className="font-body text-xs text-muted-foreground">Open in maps</p>
            </div>
            <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
          </a>

          {place.officialWebsite && (
            <a
              href={place.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-3 rounded-2xl p-5 transition-colors hover:bg-muted"
            >
              <ExternalLink className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-display text-sm font-semibold text-foreground">
                  Official Website
                </h4>
                <p className="font-body text-xs text-muted-foreground">Tourism portal</p>
              </div>
              <ExternalLink className="ml-auto h-4 w-4 text-muted-foreground" />
            </a>
          )}
        </div>
      </div>

      <ImageGallery
        images={place.images}
        isOpen={galleryOpen}
        onClose={() => setGalleryOpen(false)}
        initialIndex={galleryIndex}
        placeName={place.name}
      />
    </motion.div>
  );
};

export default PlaceDetail;
