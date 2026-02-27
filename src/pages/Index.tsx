import { useState, useEffect, useMemo } from "react";
import { states, Category, TouristPlace } from "@/data/tourismData";
import { useTheme } from "@/hooks/useTheme";
import HeroSection from "@/components/HeroSection";
import Header from "@/components/Header";
import StatesSidebar from "@/components/StatesSidebar";
import CategoryFilter from "@/components/CategoryFilter";
import PlaceCard from "@/components/PlaceCard";
import PlaceDetail from "@/components/PlaceDetail";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

const Index = () => {
  const { isDark, toggle } = useTheme();
  const [loading, setLoading] = useState(true);
  const [selectedStateId, setSelectedStateId] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const selectedState = useMemo(
    () => states.find((s) => s.id === selectedStateId) || null,
    [selectedStateId]
  );

  const filteredPlaces = useMemo(() => {
    let places: TouristPlace[] = [];

    if (selectedState) {
      places = selectedState.places;
    } else {
      places = states.flatMap((s) => s.places);
    }

    if (categoryFilter) {
      places = places.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      places = places.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return places;
  }, [selectedState, categoryFilter, searchQuery]);

  const handleSelectState = (id: string) => {
    setSelectedStateId((prev) => (prev === id ? null : id));
    setSelectedPlace(null);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <Header
        isDark={isDark}
        onToggleTheme={toggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main id="explore" className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <StatesSidebar
            states={states}
            selectedStateId={selectedStateId}
            onSelectState={handleSelectState}
          />

          <div className="min-w-0 flex-1">
            {selectedPlace ? (
              <PlaceDetail
                place={selectedPlace}
                onBack={() => setSelectedPlace(null)}
              />
            ) : (
              <>
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                      {selectedState
                        ? `Explore ${selectedState.name}`
                        : "All Destinations"}
                    </h2>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      {filteredPlaces.length} place{filteredPlaces.length !== 1 ? "s" : ""} to discover
                    </p>
                  </div>
                </div>

                <CategoryFilter selected={categoryFilter} onSelect={setCategoryFilter} />

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPlaces.map((place, i) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      index={i}
                      onClick={() => setSelectedPlace(place)}
                    />
                  ))}
                </div>

                {filteredPlaces.length === 0 && (
                  <div className="mt-12 text-center">
                    <p className="font-display text-xl text-muted-foreground">
                      No places found
                    </p>
                    <p className="mt-1 font-body text-sm text-muted-foreground">
                      Try a different filter or search term
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Google Translate Script */}
      <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
    </div>
  );
};

export default Index;
