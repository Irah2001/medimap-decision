import { Box, Container, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corriger les icônes Leaflet manquantes
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
});

function Dashboard() {
  const { user: currentUser } = useAuth();
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    fetch("/finistere_communes_data.json") // ← met le bon nom de ton fichier ici
      .then((res) => res.json())
      .then((data) => setCommunes(data));
  }, []);

  // Fonction pour déterminer la couleur du marqueur
  function getColor(nombreMedecin, placeCampingHotel, nombreHabitants) {
    const ratio = nombreMedecin / (placeCampingHotel + nombreHabitants);
    return ratio < (1 / 1200) ? 'red' : 'green';
  }

  return (
    <Container maxW="full">
      <Box pt={12} m={4}>
        <Text fontSize="2xl" truncate maxW="sm">
          Carte des communes du Finistère
        </Text>
      </Box>

      <Box m={4} h="600px" borderRadius="md" overflow="hidden">
        <MapContainer
          center={[48.0, -4.1]}
          zoom={9}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {communes.map((commune, index) => (
            <CircleMarker
              key={index}
              center={[commune.Latitude, commune.Longitude]}
              color={getColor(commune.Nombre_Medecin, commune.Place_Camping_Hotel, commune.Nombre_Habitants)}
              radius={10}
            >
              <Popup>
                <strong>{commune.Nom}</strong><br />
                Médecin/Lit+habitant : {commune.Nombre_Medecin} / {commune.Place_Camping_Hotel + commune.Nombre_Habitants}<br />
                Densité population : {commune.Densite_Pop} hab/km²<br />
                Interventions : {commune.Nombre_Intervention}<br />
                Habitants : {commune.Nombre_Habitants}<br />
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </Box>
    </Container>
  );
}



