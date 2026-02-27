import { TouristPlace } from "@/data/tourismData";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Clock, Tag } from "lucide-react";

interface PlaceCardProps {
  place: TouristPlace;
  onClick: () => void;
  index: number;
}

const PlaceCard = ({ place, onClick, index }: PlaceCardProps) => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${index * 100}ms` }}
      className={`hover-lift cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-all ${
        isVisible ? "animate-fade-in-up" : "opacity-0"
      }`}
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={place.images[0]}
          alt={place.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-4">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2.5 py-0.5 font-body text-xs font-medium text-primary-foreground">
            <Tag className="h-3 w-3" />
            {place.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-display text-lg font-semibold text-card-foreground">
          {place.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 font-body text-sm text-muted-foreground">
          {place.description}
        </p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {place.bestTimeToVisit}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            View on map
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
