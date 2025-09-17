import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface StoreProps {
  session: Session | null;
  profile: { username: string | null } | null;
}

const Store: React.FC<StoreProps> = ({ session, profile }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    34.0522, -118.2437,
  ]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data, error } = await supabase.from("locations").select("*");
        if (error) throw error;

        if (data && data.length > 0) {
          setLocations(data);
          // Calculate the average coordinates to center the map
          const avgLat =
            data.reduce((sum, loc) => sum + Number(loc.latitude), 0) /
            data.length;
          const avgLng =
            data.reduce((sum, loc) => sum + Number(loc.longitude), 0) /
            data.length;
          setMapCenter([avgLat, avgLng]);
        } else {
          setLocations([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={0} session={session} profile={profile} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-16 font-heading text-2xl">
            Loading Stores...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header cartItemCount={0} session={session} profile={profile} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center py-16 font-heading text-2xl text-red-500">
            Error: {error}
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <Header cartItemCount={0} session={session} profile={profile} />
      <main className="flex-grow">
        <div className="container mx-auto py-16">
          <h1 className="text-5xl font-heading text-center mb-12 text-foreground">
            Our Partner Stores
          </h1>

          <div className="h-[500px] w-full rounded-2xl border-4 border-foreground overflow-hidden shadow-lg mb-16">
            {locations.length > 0 ? (
              <MapContainer
                center={mapCenter}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map((location) => (
                  <Marker
                    key={location.id}
                    position={[location.latitude, location.longitude]}
                  >
                    <Popup>
                      <h3 className="font-bold">{location.name}</h3>
                      <p>{location.address}</p>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-2xl font-heading text-muted-foreground">
                  No store locations found.
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white p-6 rounded-xl shadow-md border-2 border-foreground"
              >
                <h2 className="text-2xl font-bold font-heading mb-2">
                  {location.name}
                </h2>
                <p className="text-muted-foreground">{location.address}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Store;
