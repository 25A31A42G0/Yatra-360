import React, { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";

/* =========================================================
   EXACT COLOURS GIVEN BY YOU
   ========================================================= */

const STATE_COLORS = {
  Rajasthan: "#FDD01B",
  Maharashtra: "#F39233",
  Gujarat: "#C2A0CC",
  "Madhya Pradesh": "#BED24C",
  Telangana: "#FCD224",
  "Andhra Pradesh": "#F47395",
  Karnataka: "#AFD357",
  "Tamil Nadu": "#FDCD14",
  Kerala: "#F47995",
  "Uttar Pradesh": "#EB8431",
  Bihar: "#F67496",
  "West Bengal": "#F0CC21",
  Odisha: "#C59BCD",
  Chhattisgarh: "#39BDE3",
  Punjab: "#348D9B",
  Haryana: "#B68CC2",
  "Himachal Pradesh": "#F6BD26",
  Uttarakhand: "#A6C355",
  "Jammu & Kashmir": "#EF94AE",
  Ladakh: "#C9B7D5",
  Assam: "#A9CF4B",
  "Arunachal Pradesh": "#F4A73A",
  Meghalaya: "#ECD63B",
  Nagaland: "#F58DA3",
  Manipur: "#AA88AF",
  Mizoram: "#F69BAD",
  Tripura: "#F89FAE",
  Sikkim: "#72C9CC",
};

/* =========================================================
   CAPITAL DOTS
   ========================================================= */

const CAPITALS = [
  ["Jaipur", 26.9124, 75.7873, "Rajasthan"],
  ["Mumbai", 19.076, 72.8777, "Maharashtra"],
  ["Gandhinagar", 23.2156, 72.6369, "Gujarat"],
  ["Bhopal", 23.2599, 77.4126, "Madhya Pradesh"],
  ["Hyderabad", 17.385, 78.4867, "Telangana"],
  ["Amaravati", 16.5745, 80.358, "Andhra Pradesh"],
  ["Bengaluru", 12.9716, 77.5946, "Karnataka"],
  ["Chennai", 13.0827, 80.2707, "Tamil Nadu"],
  ["Thiruvananthapuram", 8.5241, 76.9366, "Kerala"],
  ["Lucknow", 26.8467, 80.9462, "Uttar Pradesh"],
  ["Patna", 25.5941, 85.1376, "Bihar"],
  ["Kolkata", 22.5726, 88.3639, "West Bengal"],
  ["Bhubaneswar", 20.2961, 85.8245, "Odisha"],
  ["Raipur", 21.2514, 81.6296, "Chhattisgarh"],
  ["Chandigarh", 30.7333, 76.7794, "Punjab"],
  ["Chandigarh", 30.7333, 76.7794, "Haryana"],
  ["Shimla", 31.1048, 77.1734, "Himachal Pradesh"],
  ["Dehradun", 30.3165, 78.0322, "Uttarakhand"],
  ["Srinagar", 34.0837, 74.7973, "Jammu & Kashmir"],
  ["Leh", 34.1526, 77.5771, "Ladakh"],
  ["Dispur", 26.1445, 91.7362, "Assam"],
  ["Itanagar", 27.0844, 93.6053, "Arunachal Pradesh"],
  ["Shillong", 25.5788, 91.8933, "Meghalaya"],
  ["Kohima", 25.6751, 94.1086, "Nagaland"],
  ["Imphal", 24.817, 93.9368, "Manipur"],
  ["Aizawl", 23.7271, 92.7176, "Mizoram"],
  ["Agartala", 23.8315, 91.2868, "Tripura"],
  ["Gangtok", 27.3389, 88.6065, "Sikkim"],
];

/* =========================================================
   ANDHRA PRADESH DESTINATIONS
   ========================================================= */

const DESTINATIONS = [
  {
    name: "Tirupati",
    lat: 13.6288,
    lon: 79.4192,
    budget: "₹2,500 – ₹5,000",
    food: "₹400 – ₹800",
    travel: "₹500 – ₹1,500",
    stay: "₹1,000 – ₹2,500",
    visit: "1–2 Days",
  },
  {
    name: "Srikalahasti",
    lat: 13.7499,
    lon: 79.6984,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹300 – ₹800",
    stay: "₹700 – ₹1,500",
    visit: "1 Day",
  },
  {
    name: "Kanipakam",
    lat: 13.2817,
    lon: 79.1017,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹300 – ₹800",
    stay: "₹700 – ₹1,500",
    visit: "1 Day",
  },
  {
    name: "Amaravati",
    lat: 16.572,
    lon: 80.3575,
    budget: "₹1,500 – ₹3,500",
    food: "₹300 – ₹700",
    travel: "₹300 – ₹900",
    stay: "₹700 – ₹1,500",
    visit: "1 Day",
  },
  {
    name: "Vijayawada",
    lat: 16.5062,
    lon: 80.648,
    budget: "₹2,000 – ₹4,000",
    food: "₹400 – ₹800",
    travel: "₹400 – ₹1,000",
    stay: "₹800 – ₹2,000",
    visit: "1–2 Days",
  },
  {
    name: "Undavalli Caves",
    lat: 16.4955,
    lon: 80.587,
    budget: "₹1,000 – ₹2,500",
    food: "₹250 – ₹500",
    travel: "₹250 – ₹600",
    stay: "₹500 – ₹1,200",
    visit: "Half Day",
  },
  {
    name: "Visakhapatnam",
    lat: 17.6868,
    lon: 83.2185,
    budget: "₹3,000 – ₹6,000",
    food: "₹500 – ₹1,000",
    travel: "₹700 – ₹1,500",
    stay: "₹1,200 – ₹3,000",
    visit: "2–3 Days",
  },
  {
    name: "Araku Valley",
    lat: 18.3273,
    lon: 82.8775,
    budget: "₹3,000 – ₹6,000",
    food: "₹500 – ₹1,000",
    travel: "₹800 – ₹1,500",
    stay: "₹1,000 – ₹2,500",
    visit: "2 Days",
  },
  {
    name: "Borra Caves",
    lat: 18.2808,
    lon: 83.046,
    budget: "₹2,500 – ₹5,000",
    food: "₹400 – ₹800",
    travel: "₹600 – ₹1,200",
    stay: "₹800 – ₹2,000",
    visit: "1 Day",
  },
  {
    name: "Lambasingi",
    lat: 17.9867,
    lon: 82.5327,
    budget: "₹2,500 – ₹5,000",
    food: "₹400 – ₹800",
    travel: "₹700 – ₹1,500",
    stay: "₹800 – ₹2,000",
    visit: "1–2 Days",
  },
  {
    name: "Kakinada",
    lat: 16.9891,
    lon: 82.2475,
    budget: "₹2,000 – ₹4,000",
    food: "₹400 – ₹800",
    travel: "₹400 – ₹900",
    stay: "₹800 – ₹1,800",
    visit: "1–2 Days",
  },
  {
    name: "Konaseema",
    lat: 16.7,
    lon: 81.95,
    budget: "₹2,500 – ₹5,000",
    food: "₹400 – ₹800",
    travel: "₹500 – ₹1,200",
    stay: "₹1,000 – ₹2,000",
    visit: "2 Days",
  },
  {
    name: "Lepakshi",
    lat: 14.1219,
    lon: 77.6075,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹400 – ₹900",
    stay: "₹500 – ₹1,200",
    visit: "1 Day",
  },
  {
    name: "Gandikota",
    lat: 14.8147,
    lon: 78.289,
    budget: "₹2,000 – ₹4,500",
    food: "₹400 – ₹800",
    travel: "₹500 – ₹1,200",
    stay: "₹800 – ₹1,800",
    visit: "1–2 Days",
  },
  {
    name: "Mahanandi",
    lat: 15.482,
    lon: 78.596,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹400 – ₹900",
    stay: "₹600 – ₹1,500",
    visit: "1 Day",
  },
  {
    name: "Ahobilam",
    lat: 15.135,
    lon: 78.716,
    budget: "₹2,000 – ₹4,000",
    food: "₹300 – ₹700",
    travel: "₹500 – ₹1,000",
    stay: "₹700 – ₹1,500",
    visit: "1–2 Days",
  },
  {
    name: "Yaganti",
    lat: 15.3765,
    lon: 78.145,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹400 – ₹900",
    stay: "₹600 – ₹1,500",
    visit: "1 Day",
  },
  {
    name: "Srisailam",
    lat: 16.072,
    lon: 78.868,
    budget: "₹2,000 – ₹4,500",
    food: "₹400 – ₹800",
    travel: "₹500 – ₹1,200",
    stay: "₹800 – ₹2,000",
    visit: "1–2 Days",
  },
  {
    name: "Simhachalam",
    lat: 17.765,
    lon: 83.251,
    budget: "₹1,500 – ₹3,000",
    food: "₹300 – ₹600",
    travel: "₹300 – ₹800",
    stay: "₹700 – ₹1,500",
    visit: "1 Day",
  },
];

/* =========================================================
   GEOJSON HELPERS
   ========================================================= */

function getStateName(feature) {
  return (
    feature?.properties?.ST_NM ||
    feature?.properties?.NAME_1 ||
    feature?.properties?.name ||
    feature?.properties?.NAME ||
    "Unknown"
  );
}

function getCoordinates(feature) {
  if (!feature?.geometry) return [];

  const { type, coordinates } = feature.geometry;

  if (type === "Polygon") {
    return coordinates;
  }

  if (type === "MultiPolygon") {
    return coordinates.flat(1);
  }

  return [];
}

/*
  IMPORTANT:
  These functions only PROJECT the existing GeoJSON.
  They DO NOT modify the actual India shape.
*/

function getBounds(features) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  features.forEach((feature) => {
    const polygons = getCoordinates(feature);

    polygons.forEach((polygon) => {
      polygon.forEach(([lon, lat]) => {
        minLon = Math.min(minLon, lon);
        maxLon = Math.max(maxLon, lon);
        minLat = Math.min(minLat, lat);
        maxLat = Math.max(maxLat, lat);
      });
    });
  });

  return {
    minLon,
    maxLon,
    minLat,
    maxLat,
    centerLon: (minLon + maxLon) / 2,
    centerLat: (minLat + maxLat) / 2,
  };
}

function projectPoint(lon, lat, bounds, width = 12) {
  const lonRange = bounds.maxLon - bounds.minLon || 1;
  const latRange = bounds.maxLat - bounds.minLat || 1;

  const x = ((lon - bounds.centerLon) / lonRange) * width;

  const height = width * (latRange / lonRange);

  const y =
    ((lat - bounds.centerLat) / latRange) *
    height;

  return [x, y];
}

function polygonToShape(polygon, bounds, width) {
  const shape = new THREE.Shape();

  polygon.forEach(([lon, lat], index) => {
    const [x, y] = projectPoint(lon, lat, bounds, width);

    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });

  shape.closePath();

  return shape;
}

/* =========================================================
   INDIA STATE MESH
   ========================================================= */

function StateMesh({
  feature,
  bounds,
  width,
  color,
  onClick,
}) {
  const shapes = useMemo(() => {
    const polygons = getCoordinates(feature);

    return polygons
      .filter((polygon) => polygon.length > 2)
      .map((polygon) =>
        polygonToShape(polygon, bounds, width)
      );
  }, [feature, bounds, width]);

  const stateName = getStateName(feature);

  return (
    <group>
      {shapes.map((shape, index) => (
        <mesh
          key={`${stateName}-${index}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.12, 0]}
          onClick={(event) => {
            event.stopPropagation();
            onClick?.(stateName);
          }}
        >
          <extrudeGeometry
            args={[
              shape,
              {
                depth: 0.28,
                bevelEnabled: true,
                bevelSegments: 2,
                bevelSize: 0.035,
                bevelThickness: 0.035,
                curveSegments: 2,
              },
            ]}
          />

          <meshStandardMaterial
            color={color}
            roughness={0.58}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
}

/* =========================================================
   STATE LABEL
   ========================================================= */

function StateLabel({
  name,
  lat,
  lon,
  bounds,
  width,
}) {
  const [x, y] = projectPoint(
    lon,
    lat,
    bounds,
    width
  );

  return (
    <Html
      position={[x, 0.5, y]}
      center
      distanceFactor={7}
      style={{
        pointerEvents: "none",
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      <div className="state-label">
        {name.toUpperCase()}
      </div>
    </Html>
  );
}

/* =========================================================
   CAPITAL DOT
   ========================================================= */

function CapitalDot({
  name,
  lat,
  lon,
  bounds,
  width,
}) {
  const [x, y] = projectPoint(
    lon,
    lat,
    bounds,
    width
  );

  return (
    <group position={[x, 0.48, y]}>
      <mesh>
        <circleGeometry args={[0.075, 20]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      <mesh position={[0, 0.01, 0]}>
        <circleGeometry args={[0.045, 20]} />
        <meshBasicMaterial color="#D8232A" />
      </mesh>
    </group>
  );
}

/* =========================================================
   INDIA MAP
   ========================================================= */

function IndiaMap({
  geojson,
  onStateClick,
}) {
  const features = geojson?.features || [];

  const bounds = useMemo(
    () => getBounds(features),
    [features]
  );

  /*
    IMPORTANT:
    width/height are ONLY projection values.
    The GeoJSON itself remains untouched.
  */
  const width = 12;

  return (
    <group>
      {features.map((feature, index) => {
        const name = getStateName(feature);

        const color =
          STATE_COLORS[name] || "#D8D8D8";

        return (
          <StateMesh
            key={`${name}-${index}`}
            feature={feature}
            bounds={bounds}
            width={width}
            color={color}
            onClick={onStateClick}
          />
        );
      })}

      {/* STATE LABELS */}
      {CAPITALS.map(
        ([capital, lat, lon, state]) => {
          const featureExists = features.some(
            (feature) =>
              getStateName(feature) === state
          );

          if (!featureExists) return null;

          return (
            <React.Fragment key={state}>
              <StateLabel
                name={state}
                lat={lat}
                lon={lon}
                bounds={bounds}
                width={width}
              />

              <CapitalDot
                name={capital}
                lat={lat}
                lon={lon}
                bounds={bounds}
                width={width}
              />
            </React.Fragment>
          );
        }
      )}
    </group>
  );
}

/* =========================================================
   AP DESTINATION PIN
   ========================================================= */

function DestinationPin({
  destination,
  bounds,
  width,
  onClick,
}) {
  const [x, y] = projectPoint(
    destination.lon,
    destination.lat,
    bounds,
    width
  );

  return (
    <group
      position={[x, 0.72, y]}
      onClick={(event) => {
        event.stopPropagation();
        onClick(destination);
      }}
    >
      {/* PIN STEM */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry
          args={[0.018, 0.018, 0.18, 8]}
        />
        <meshStandardMaterial
          color="#D8232A"
          roughness={0.4}
        />
      </mesh>

      {/* PIN HEAD */}
      <mesh>
        <sphereGeometry args={[0.075, 18, 18]} />
        <meshStandardMaterial
          color="#D8232A"
          emissive="#4A0000"
          emissiveIntensity={0.3}
        />
      </mesh>

      <Html
        position={[0.12, 0.02, 0]}
        style={{
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        <div className="destination-label">
          {destination.name}
        </div>
      </Html>
    </group>
  );
}

/* =========================================================
   AP MAP
   ========================================================= */

function AndhraPradeshMap({
  geojson,
  onDestinationClick,
}) {
  const features = geojson?.features || [];

  const bounds = useMemo(
    () => getBounds(features),
    [features]
  );

  const width = 10;

  return (
    <group>
      {features.map((feature, index) => (
        <StateMesh
          key={`ap-${index}`}
          feature={feature}
          bounds={bounds}
          width={width}
          color="#F47395"
        />
      ))}

      {DESTINATIONS.map((destination) => (
        <DestinationPin
          key={destination.name}
          destination={destination}
          bounds={bounds}
          width={width}
          onClick={onDestinationClick}
        />
      ))}
    </group>
  );
}

/* =========================================================
   DESTINATION MODAL
   ========================================================= */

function DestinationDetails({
  destination,
  onClose,
}) {
  if (!destination) return null;

  return (
    <div className="destination-overlay">
      <div className="destination-modal">
        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <div className="destination-image-area">
          <div className="destination-image-placeholder">
            <div className="destination-image-icon">
              📍
            </div>

            <div>
              <strong>{destination.name}</strong>
            </div>
          </div>
        </div>

        <div className="destination-info">
          <div className="destination-kicker">
            YATRA 360 • ANDHRA PRADESH
          </div>

          <h2>{destination.name}</h2>

          <div className="detail-list">
            <div className="detail-row">
              <span>💰 Budget</span>
              <strong>{destination.budget}</strong>
            </div>

            <div className="detail-row">
              <span>🍛 Food</span>
              <strong>{destination.food}</strong>
            </div>

            <div className="detail-row">
              <span>🚗 Travel</span>
              <strong>{destination.travel}</strong>
            </div>

            <div className="detail-row">
              <span>🏨 Stay</span>
              <strong>{destination.stay}</strong>
            </div>

            <div className="detail-row">
              <span>📅 Visit</span>
              <strong>{destination.visit}</strong>
            </div>
          </div>

          <div className="total-expense">
            <span>Estimated total</span>
            <strong>{destination.budget}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function India3D() {
  const [india, setIndia] = useState(null);
  const [andhraPradesh, setAndhraPradesh] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [view, setView] = useState("india");
  const [selectedDestination, setSelectedDestination] =
    useState(null);

  useEffect(() => {
    async function loadMaps() {
      try {
        setLoading(true);

        const [
          indiaResponse,
          apResponse,
        ] = await Promise.all([
          fetch("/india.geojson"),
          fetch("/andhra-pradesh.geojson"),
        ]);

        if (!indiaResponse.ok) {
          throw new Error(
            "india.geojson could not be loaded"
          );
        }

        if (!apResponse.ok) {
          throw new Error(
            "andhra-pradesh.geojson could not be loaded"
          );
        }

        const indiaData =
          await indiaResponse.json();

        const apData =
          await apResponse.json();

        setIndia(indiaData);
        setAndhraPradesh(apData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadMaps();
  }, []);

  function handleStateClick(stateName) {
    if (
      stateName === "Andhra Pradesh"
    ) {
      setView("ap");
    }
  }

  function goBackToIndia() {
    setSelectedDestination(null);
    setView("india");
  }

  return (
    <div className="yatra-root">
      {/* HEADER */}

      <div className="yatra-header">
        <div className="yatra-logo">
          YATRA <span>360°</span>
        </div>

        {view === "ap" && (
          <button
            className="back-button"
            onClick={goBackToIndia}
          >
            ← INDIA
          </button>
        )}
      </div>

      {/* HERO */}

      {view === "india" && (
        <div className="yatra-heading">
          <div className="eyebrow">
            EXPLORE INDIA
          </div>

          <h1>
            Discover India
            <br />
            <span>in 360°</span>
          </h1>

          <p>
            Drag to rotate • Scroll to zoom •
            Click a state
          </p>
        </div>
      )}

      {view === "ap" && (
        <div className="yatra-heading ap-heading">
          <div className="eyebrow">
            ANDHRA PRADESH
          </div>

          <h1>
            Explore Andhra
            <br />
            <span>in 360°</span>
          </h1>

          <p>
            Select a destination to discover
            more
          </p>
        </div>
      )}

      {/* MAP */}

      <div className="map-container">
        {loading && (
          <div className="map-status">
            Loading YATRA 360...
          </div>
        )}

        {error && (
          <div className="map-status error">
            {error}
          </div>
        )}

        {!loading && !error && (
          <Canvas
            camera={{
              position: [0, 7.8, 10.5],
              fov: 42,
              near: 0.1,
              far: 1000,
            }}
            dpr={[1, 2]}
          >
            {/* DEEP TRAVEL BACKGROUND */}

            <color
              attach="background"
              args={["#071522"]}
            />

            <fog
              attach="fog"
              args={["#071522", 18, 42]}
            />

            {/* LIGHTING */}

            <ambientLight intensity={2.2} />

            <directionalLight
              position={[5, 10, 6]}
              intensity={4}
            />

            <directionalLight
              position={[-6, 5, -4]}
              intensity={2}
            />

            <pointLight
              position={[0, 5, 0]}
              intensity={2}
            />

            {/* MAP */}

            <group
              rotation={[
                -0.16,
                0.18,
                0,
              ]}
            >
              {view === "india" ? (
                <IndiaMap
                  geojson={india}
                  onStateClick={
                    handleStateClick
                  }
                />
              ) : (
                <AndhraPradeshMap
                  geojson={andhraPradesh}
                  onDestinationClick={
                    setSelectedDestination
                  }
                />
              )}
            </group>

            {/* GROUND SHADOW */}

            <mesh
              rotation={[
                -Math.PI / 2,
                0,
                0,
              ]}
              position={[0, -0.18, 0]}
            >
              <planeGeometry
                args={[35, 35]}
              />

              <shadowMaterial
                opacity={0.18}
              />
            </mesh>

            {/* CONTROLS */}

            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={7}
              maxDistance={22}
              dampingFactor={0.08}
              enableDamping
            />
          </Canvas>
        )}
      </div>

      {/* DESTINATION DETAILS */}

      <DestinationDetails
        destination={selectedDestination}
        onClose={() =>
          setSelectedDestination(null)
        }
      />

      {/* BOTTOM HINT */}

      {!selectedDestination && (
        <div className="map-hint">
          {view === "india"
            ? "DRAG • ROTATE • ZOOM • SELECT A STATE"
            : "DRAG • ROTATE • ZOOM • SELECT A DESTINATION"}
        </div>
      )}
    </div>
  );
}