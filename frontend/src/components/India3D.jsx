import { useEffect, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

/* =========================================================
   STATE COLORS
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
   CAPITALS
========================================================= */

const CAPITALS = {
  Rajasthan: ["Jaipur", 75.7873, 26.9124],
  Maharashtra: ["Mumbai", 72.8777, 19.076],
  Gujarat: ["Gandhinagar", 72.6369, 23.2156],
  "Madhya Pradesh": ["Bhopal", 77.4126, 23.2599],
  Telangana: ["Hyderabad", 78.4867, 17.385],
  "Andhra Pradesh": ["Amaravati", 80.518, 16.5131],
  Karnataka: ["Bengaluru", 77.5946, 12.9716],
  "Tamil Nadu": ["Chennai", 80.2707, 13.0827],
  Kerala: ["Thiruvananthapuram", 76.9366, 8.5241],
  "Uttar Pradesh": ["Lucknow", 80.9462, 26.8467],
  Bihar: ["Patna", 85.1376, 25.5941],
  "West Bengal": ["Kolkata", 88.3639, 22.5726],
  Odisha: ["Bhubaneswar", 85.8245, 20.2961],
  Chhattisgarh: ["Raipur", 81.6296, 21.2514],
  Punjab: ["Chandigarh", 76.7794, 30.7333],
  Haryana: ["Chandigarh", 76.7794, 30.7333],
  "Himachal Pradesh": ["Shimla", 77.1734, 31.1048],
  Uttarakhand: ["Dehradun", 78.0322, 30.3165],
  "Jammu & Kashmir": ["Srinagar", 74.7973, 34.0837],
  Ladakh: ["Leh", 77.577, 34.1526],
  Assam: ["Dispur", 91.7898, 26.1445],
  "Arunachal Pradesh": ["Itanagar", 93.6053, 27.0844],
  Meghalaya: ["Shillong", 91.8933, 25.5788],
  Nagaland: ["Kohima", 94.1086, 25.6751],
  Manipur: ["Imphal", 93.9368, 24.817],
  Mizoram: ["Aizawl", 92.7176, 23.7271],
  Tripura: ["Agartala", 91.2868, 23.8315],
  Sikkim: ["Gangtok", 88.6139, 27.3389],
};

/* =========================================================
   AP DESTINATIONS
========================================================= */

const DESTINATIONS = [
  {
    name: "Tirupati",
    district: "Tirupati",
    lat: 13.6288,
    lon: 79.4192,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Tirumala%20Venkateswara%20Temple%2C%20Tirupati%20%2824338261275%29.jpg?width=1200",
    budget: "₹2,500 – ₹5,000",
    food: "Andhra meals, Tirupati laddu",
    travel: "Bus / Train / Flight",
    stay: "₹800 – ₹2,000 per night",
    visit: "Sri Venkateswara Swamy Temple",
  },
  {
    name: "Amaravati",
    district: "Guntur",
    lat: 16.573,
    lon: 80.3575,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/AMARAVATHI%20STUPA%2002.jpg?width=1200",
    budget: "₹1,500 – ₹3,500",
    food: "Andhra cuisine",
    travel: "Bus / Car",
    stay: "₹700 – ₹1,800 per night",
    visit: "Amaravati Mahachaitya and Buddhist heritage",
  },
  {
    name: "Vijayawada",
    district: "NTR",
    lat: 16.5062,
    lon: 80.648,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Kanaka%20Durga%20Gopuram%2C%20Vijayawada.jpg?width=1200",
    budget: "₹1,500 – ₹3,500",
    food: "Andhra meals and sweets",
    travel: "Train / Bus / Flight",
    stay: "₹700 – ₹2,000 per night",
    visit: "Kanaka Durga Temple and Krishna River",
  },
  {
    name: "Visakhapatnam",
    district: "Visakhapatnam",
    lat: 17.6868,
    lon: 83.2185,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20View%20of%20Visakhapatnam.jpg?width=1200",
    budget: "₹3,000 – ₹6,000",
    food: "Seafood and Andhra cuisine",
    travel: "Train / Flight / Bus",
    stay: "₹1,000 – ₹3,000 per night",
    visit: "Coastal city and Bay of Bengal views",
  },
  {
    name: "Araku Valley",
    district: "Alluri Sitharama Raju",
    lat: 18.3273,
    lon: 82.877,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Araku%20valley.jpg?width=1200",
    budget: "₹3,000 – ₹7,000",
    food: "Tribal cuisine and Bamboo chicken",
    travel: "Train / Car",
    stay: "₹1,000 – ₹3,000 per night",
    visit: "Valleys, coffee plantations and viewpoints",
  },
  {
    name: "Borra Caves",
    district: "Alluri Sitharama Raju",
    lat: 18.28,
    lon: 83.041,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Borra%20Caves.jpg?width=1200",
    budget: "₹2,000 – ₹4,000",
    food: "Local Andhra food",
    travel: "Train / Car",
    stay: "₹800 – ₹2,000 per night",
    visit: "Natural limestone cave formations",
  },
  {
    name: "Konaseema",
    district: "Dr. B. R. Ambedkar Konaseema",
    lat: 16.65,
    lon: 81.95,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Konaseema%20.jpg?width=1200",
    budget: "₹2,500 – ₹5,000",
    food: "Traditional coastal Andhra food",
    travel: "Car / Bus",
    stay: "₹800 – ₹2,500 per night",
    visit: "Godavari delta, coconut groves and backwaters",
  },
  {
    name: "Gandikota",
    district: "YSR Kadapa",
    lat: 14.8147,
    lon: 78.285,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Gandhikota.jpg?width=1200",
    budget: "₹2,000 – ₹5,000",
    food: "Local Andhra food",
    travel: "Car / Bus",
    stay: "₹800 – ₹2,500 per night",
    visit: "Pennar gorge and Gandikota Fort",
  },
  {
    name: "Lepakshi",
    district: "Sri Sathya Sai",
    lat: 13.8022,
    lon: 77.603,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/LEPAKSHI%20TEMPLE.jpg?width=1200",
    budget: "₹1,500 – ₹3,000",
    food: "South Indian meals",
    travel: "Bus / Car",
    stay: "₹600 – ₹1,500 per night",
    visit: "Veerabhadra Temple and Nandi",
  },
  {
    name: "Srisailam",
    district: "Nandyal",
    lat: 16.072,
    lon: 78.868,
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/SriSailam%20Temple.jpg?width=1200",
    budget: "₹2,500 – ₹5,000",
    food: "Andhra and South Indian meals",
    travel: "Bus / Car",
    stay: "₹800 – ₹2,500 per night",
    visit: "Mallikarjuna Temple, hills and Krishna River",
  },
];

/* =========================================================
   MAP SETTINGS
========================================================= */

const INDIA_CENTER = {
  lon: 82.5,
  lat: 22.5,
};

const INDIA_SCALE = 0.22;

const AP_CENTER = {
  lon: 80.9,
  lat: 15.6,
};

const AP_SCALE = 0.48;

/* =========================================================
   GEOJSON HELPERS
========================================================= */

function getFeatureName(feature) {
  return (
    feature?.properties?.ST_NM ||
    feature?.properties?.NAME_1 ||
    feature?.properties?.name ||
    feature?.properties?.NAME ||
    "Unknown"
  );
}

function projectPoint(lon, lat, center, scale) {
  return [
    (lon - center.lon) * scale,
    (lat - center.lat) * scale,
  ];
}

function createShapeFromRing(
  ring,
  center,
  scale
) {
  const shape = new THREE.Shape();

  ring.forEach(([lon, lat], index) => {
    const [x, y] = projectPoint(
      lon,
      lat,
      center,
      scale
    );

    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  });

  return shape;
}

function createShapesFromGeometry(
  geometry,
  center,
  scale
) {
  if (!geometry) return [];

  const shapes = [];

  if (geometry.type === "Polygon") {
    const coordinates =
      geometry.coordinates;

    if (!coordinates?.length) {
      return [];
    }

    const shape =
      createShapeFromRing(
        coordinates[0],
        center,
        scale
      );

    for (
      let i = 1;
      i < coordinates.length;
      i++
    ) {
      const hole = new THREE.Path();

      coordinates[i].forEach(
        ([lon, lat], index) => {
          const [x, y] =
            projectPoint(
              lon,
              lat,
              center,
              scale
            );

          if (index === 0) {
            hole.moveTo(x, y);
          } else {
            hole.lineTo(x, y);
          }
        }
      );

      shape.holes.push(hole);
    }

    shapes.push(shape);
  }

  if (
    geometry.type ===
    "MultiPolygon"
  ) {
    geometry.coordinates.forEach(
      (polygon) => {
        if (!polygon?.length) {
          return;
        }

        const shape =
          createShapeFromRing(
            polygon[0],
            center,
            scale
          );

        for (
          let i = 1;
          i < polygon.length;
          i++
        ) {
          const hole =
            new THREE.Path();

          polygon[i].forEach(
            ([lon, lat], index) => {
              const [x, y] =
                projectPoint(
                  lon,
                  lat,
                  center,
                  scale
                );

              if (index === 0) {
                hole.moveTo(x, y);
              } else {
                hole.lineTo(x, y);
              }
            }
          );

          shape.holes.push(hole);
        }

        shapes.push(shape);
      }
    );
  }

  return shapes;
}

/* =========================================================
   STATE LABEL POSITIONS
========================================================= */

const STATE_LABEL_POSITIONS = {
  "Jammu & Kashmir": [76.2, 34.2],
  Ladakh: [77.5, 35.1],
  "Himachal Pradesh": [77.1, 31.7],
  Punjab: [75.8, 31.0],
  Haryana: [76.1, 29.2],
  Uttarakhand: [79.0, 30.2],
  "Uttar Pradesh": [80.8, 27.2],
  Rajasthan: [73.8, 27.0],
  Gujarat: [71.6, 22.5],
  "Madhya Pradesh": [78.5, 23.0],
  Maharashtra: [75.5, 19.3],
  Goa: [74.0, 15.3],
  Karnataka: [76.0, 14.3],
  Telangana: [79.2, 17.9],
  "Andhra Pradesh": [80.5, 15.6],
  Kerala: [76.1, 10.5],
  "Tamil Nadu": [78.7, 11.0],
  Bihar: [85.7, 25.6],
  Jharkhand: [85.6, 23.5],
  "West Bengal": [87.8, 23.8],
  Odisha: [84.4, 20.5],
  Chhattisgarh: [82.0, 21.5],
  Sikkim: [88.4, 27.7],
  Assam: [92.8, 26.0],
  Meghalaya: [91.3, 25.5],
  "Arunachal Pradesh": [94.0, 28.2],
  Nagaland: [94.4, 26.0],
  Manipur: [93.9, 24.8],
  Mizoram: [92.8, 23.5],
  Tripura: [91.5, 23.8],
  Delhi: [77.1, 28.7],
  "NCT of Delhi": [77.1, 28.7],
};

/* =========================================================
   AP LABEL OFFSETS
========================================================= */

const AP_LABEL_OFFSETS = {
  Tirupati: [0.30, -0.02],
  Srisailam: [-0.34, 0.22],
  Amaravati: [-0.42, 0.34],
  Vijayawada: [0.42, -0.30],
  Visakhapatnam: [0.46, 0.05],
  "Araku Valley": [0.34, 0.34],
  "Borra Caves": [-0.42, -0.24],
  Gandikota: [-0.48, -0.08],
  Lepakshi: [-0.44, 0.20],
  Konaseema: [0.38, 0.22],
};

/* =========================================================
   CAPITAL DOT
========================================================= */

function CapitalDot({
  lon,
  lat,
  center,
  scale,
}) {
  const [x, y] = projectPoint(
    lon,
    lat,
    center,
    scale
  );

  return (
    <group position={[x, y, 0.48]}>
      <mesh>
        <circleGeometry
          args={[0.095, 24]}
        />
        <meshBasicMaterial
          color="#FFFFFF"
        />
      </mesh>

      <mesh
        position={[0, 0, 0.012]}
      >
        <circleGeometry
          args={[0.062, 24]}
        />
        <meshBasicMaterial
          color="#D8232A"
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   STATE LABEL
========================================================= */

function StateLabel({
  stateName,
}) {
  const position =
    STATE_LABEL_POSITIONS[
      stateName
    ];

  if (!position) return null;

  const [x, y] = projectPoint(
    position[0],
    position[1],
    INDIA_CENTER,
    INDIA_SCALE
  );

  return (
    <Html
      position={[x, y, 0.52]}
      center
      distanceFactor={10}
      style={{
        pointerEvents: "none",
      }}
    >
      <div className="state-label">
        {stateName}
      </div>
    </Html>
  );
}

/* =========================================================
   INDIA STATE MESH
========================================================= */

function StateMesh({
  feature,
  index,
  onClick,
}) {
  const stateName =
    getFeatureName(feature);

  const shapes = useMemo(
    () =>
      createShapesFromGeometry(
        feature.geometry,
        INDIA_CENTER,
        INDIA_SCALE
      ),
    [feature]
  );

  const geometry = useMemo(() => {
    if (!shapes.length) {
      return null;
    }

    return new THREE.ExtrudeGeometry(
      shapes,
      {
        depth: 0.34,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.035,
        bevelThickness: 0.04,
        curveSegments: 2,
      }
    );
  }, [shapes]);

  if (!geometry) {
    return null;
  }

  const color =
    STATE_COLORS[stateName] ||
    "#B8BABD";

  return (
    <mesh
      key={`${stateName}-${index}`}
      geometry={geometry}
      castShadow
      receiveShadow
      onClick={(event) => {
        event.stopPropagation();

        if (
          stateName
            .toLowerCase()
            .includes("andhra")
        ) {
          onClick?.(
            "Andhra Pradesh"
          );
        }
      }}
    >
      <meshStandardMaterial
        color={color}
        roughness={0.55}
        metalness={0.08}
      />
    </mesh>
  );
}

/* =========================================================
   INDIA MAP
========================================================= */

function IndiaMap({
  geojson,
  onStateClick,
}) {
  const features =
    geojson?.features || [];

  const uniqueStateNames =
    Array.from(
      new Set(
        features
          .map(getFeatureName)
          .filter(
            (name) =>
              name &&
              name !== "Unknown"
          )
      )
    );

  return (
    <group
      position={[1.0, -0.65, 0]}
      scale={[1.1, 1.1, 1.1]}
    >
      {features.map(
        (feature, index) => (
          <StateMesh
            key={`${getFeatureName(
              feature
            )}-${index}`}
            feature={feature}
            index={index}
            onClick={onStateClick}
          />
        )
      )}

      {uniqueStateNames.map(
        (stateName) => (
          <StateLabel
            key={`state-label-${stateName}`}
            stateName={stateName}
          />
        )
      )}

      {Object.entries(
        CAPITALS
      ).map(
        ([
          stateName,
          [, lon, lat],
        ]) => {
          if (
            !STATE_COLORS[
              stateName
            ]
          ) {
            return null;
          }

          return (
            <CapitalDot
              key={`capital-${stateName}`}
              lon={lon}
              lat={lat}
              center={
                INDIA_CENTER
              }
              scale={
                INDIA_SCALE
              }
            />
          );
        }
      )}
    </group>
  );
}

/* =========================================================
   DESTINATION PIN
========================================================= */

function DestinationPin({
  destination,
  onClick,
  showLabel = true,
}) {
  const [x, y] = projectPoint(
    destination.lon,
    destination.lat,
    AP_CENTER,
    AP_SCALE
  );

  const offset =
    AP_LABEL_OFFSETS[
      destination.name
    ] || [0.25, 0.15];

  return (
    <group
      position={[x, y, 0.58]}
      onClick={(event) => {
        event.stopPropagation();
        onClick(destination);
      }}
    >
      <mesh>
        <sphereGeometry
          args={[0.09, 20, 20]}
        />

        <meshStandardMaterial
          color="#D8232A"
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      <mesh
        position={[0, 0, -0.06]}
      >
        <coneGeometry
          args={[0.055, 0.17, 16]}
        />

        <meshStandardMaterial
          color="#D8232A"
        />
      </mesh>

      {showLabel && (
        <Html
          position={[
            offset[0],
            offset[1],
            0,
          ]}
          center
          distanceFactor={9}
          style={{
            pointerEvents: "none",
          }}
        >
          <div className="destination-label">
            {destination.name}
          </div>
        </Html>
      )}
    </group>
  );
}

/* =========================================================
   ANDHRA PRADESH MAP
========================================================= */

function AndhraMap({
  geojson,
  onDestinationClick,
  selectedDestination,
}) {
  const features =
    geojson?.features || [];

  return (
    <group
      position={[0.7, -0.35, 0]}
      scale={[1.12, 1.12, 1.12]}
    >
      {features.map(
        (feature, index) => {
          const shapes =
            createShapesFromGeometry(
              feature.geometry,
              AP_CENTER,
              AP_SCALE
            );

          if (!shapes.length) {
            return null;
          }

          const geometry =
            new THREE.ExtrudeGeometry(
              shapes,
              {
                depth: 0.36,
                bevelEnabled: true,
                bevelSegments: 2,
                bevelSize: 0.035,
                bevelThickness: 0.04,
                curveSegments: 2,
              }
            );

          return (
            <mesh
              key={index}
              geometry={geometry}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color="#F47395"
                roughness={0.5}
                metalness={0.08}
              />
            </mesh>
          );
        }
      )}

      {DESTINATIONS.map(
        (destination) => (
          <DestinationPin
            key={destination.name}
            destination={destination}
            onClick={
              onDestinationClick
            }
            showLabel={
              !selectedDestination
            }
          />
        )
      )}
    </group>
  );
}

/* =========================================================
   DESTINATION DETAILS
========================================================= */

function DestinationDetails({
  destination,
  onClose,
}) {
  if (!destination) {
    return null;
  }

  return (
    <div className="destination-overlay">
      <div className="destination-card">

        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <img
          src={destination.image}
          alt={destination.name}
          className="destination-image"
        />

        <div className="destination-content">

          <span className="destination-eyebrow">
            ANDHRA PRADESH • TRAVEL GUIDE
          </span>

          <h2>
            {destination.name}
          </h2>

          <p className="destination-district">
            {destination.district}
          </p>

          <div className="destination-info-grid">

            <div>
              <span>
                💰 BUDGET
              </span>

              <strong>
                {destination.budget}
              </strong>
            </div>

            <div>
              <span>
                🍛 FOOD
              </span>

              <strong>
                {destination.food}
              </strong>
            </div>

            <div>
              <span>
                🚗 TRAVEL
              </span>

              <strong>
                {destination.travel}
              </strong>
            </div>

            <div>
              <span>
                🏨 STAY
              </span>

              <strong>
                {destination.stay}
              </strong>
            </div>

          </div>

          <div className="visit-box">

            <span>
              📍 WHY VISIT
            </span>

            <p>
              {destination.visit}
            </p>

          </div>

          <div className="total-expense">

            <span>
              ESTIMATED TRIP EXPENSE
            </span>

            <strong>
              {destination.budget}
            </strong>

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
  const [indiaData, setIndiaData] =
    useState(null);

  const [apData, setApData] =
    useState(null);

  const [view, setView] =
    useState("india");

  const [
    selectedDestination,
    setSelectedDestination,
  ] = useState(null);

  /* =================================================
     LOAD INDIA
  ================================================= */

  useEffect(() => {
    fetch("/india.geojson")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Could not load India GeoJSON"
          );
        }

        return response.json();
      })
      .then(setIndiaData)
      .catch(console.error);
  }, []);

  /* =================================================
     LOAD AP
  ================================================= */

  useEffect(() => {
    if (view !== "andhra") {
      return;
    }

    fetch(
      "/andhra-pradesh.geojson"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Could not load Andhra Pradesh GeoJSON"
          );
        }

        return response.json();
      })
      .then(setApData)
      .catch(console.error);
  }, [view]);

  /* =================================================
     INDIA → AP
  ================================================= */

  const goToAndhra = () => {
    setSelectedDestination(null);
    setView("andhra");
  };

  /* =================================================
     AP → INDIA
  ================================================= */

  const goBackToIndia = () => {
    setSelectedDestination(null);
    setView("india");
  };

  return (
    <div className="yatra-root">

      {/* =================================================
          BRAND
      ================================================= */}

      <header className="yatra-heading">

        <div className="eyebrow">
          EXPLORE • DISCOVER • EXPERIENCE
        </div>

        <h1>
          𝓨𝓪𝓽𝓻𝓪 360
        </h1>

        <p>
          Discover India.
          <br />
          One journey at a time.
        </p>

      </header>

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      {view === "andhra" && (
        <button
          className="back-button"
          onClick={
            goBackToIndia
          }
        >
          ← BACK TO INDIA
        </button>
      )}

      {/* =================================================
          3D CANVAS
      ================================================= */}

      <Canvas
        shadows
        camera={{
          position: [
            0,
            -1.1,
            18,
          ],
          fov: 42,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
      >

        <fog
          attach="fog"
          args={[
            "#DFF5F9",
            24,
            50,
          ]}
        />

        {/* LIGHTING */}

        <ambientLight
          intensity={1.35}
        />

        <directionalLight
          position={[
            8,
            12,
            16,
          ]}
          intensity={2.5}
          castShadow
        />

        <directionalLight
          position={[
            -10,
            4,
            10,
          ]}
          intensity={1.2}
        />

        <pointLight
          position={[
            0,
            0,
            12,
          ]}
          intensity={0.8}
        />

        {/* INDIA */}

        {view === "india" &&
          indiaData && (
            <IndiaMap
              geojson={indiaData}
              onStateClick={
                goToAndhra
              }
            />
          )}

        {/* ANDHRA PRADESH */}

        {view === "andhra" &&
          apData && (
            <AndhraMap
              geojson={apData}
              onDestinationClick={
                setSelectedDestination
              }
              selectedDestination={
                selectedDestination
              }
            />
          )}

        {/* =================================================
            ROTATE + ZOOM
        ================================================= */}

        <OrbitControls
          makeDefault
          enableRotate={true}
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.08}
          rotateSpeed={1.15}
          zoomSpeed={0.85}
          minDistance={
            view === "india"
              ? 8
              : 7
          }
          maxDistance={
            view === "india"
              ? 32
              : 28
          }
          minPolarAngle={0.35}
          maxPolarAngle={2.75}
          target={[0, 0, 0]}
        />

      </Canvas>

      {/* =================================================
          OCEAN
      ================================================= */}

      <div className="ocean-layer">

        <div className="ocean-name ocean-indian">
          INDIAN OCEAN
        </div>

        <div className="ocean-name ocean-bay">
          BAY OF BENGAL
        </div>

        <div className="ocean-wave wave-one" />
        <div className="ocean-wave wave-two" />
        <div className="ocean-wave wave-three" />

      </div>

      {/* =================================================
          MAP HINT
      ================================================= */}

      {view === "india" && (
        <div className="map-hint">

          <span>
            3D INDIA
          </span>

          <p>
            Drag to rotate • Scroll
            to zoom • Click Andhra
            Pradesh
          </p>

        </div>
      )}

      {view === "andhra" && (
        <div className="map-hint">

          <span>
            ANDHRA PRADESH
          </span>

          <p>
            Drag to rotate • Scroll
            to zoom • Select a
            destination
          </p>

        </div>
      )}

      {/* =================================================
          DESTINATION DETAILS
      ================================================= */}

      <DestinationDetails
        destination={
          selectedDestination
        }
        onClose={() =>
          setSelectedDestination(
            null
          )
        }
      />

    </div>
  );
}