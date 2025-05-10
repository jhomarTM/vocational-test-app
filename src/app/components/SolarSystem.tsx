"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CardInfo from "./CardInfo";
import testData from "../data/test-questions.json";

interface Planet {
  name: string;
  progress: number;
  color: string;
  route: string;
}

const planets: Planet[] = testData.tests.map((test, index) => ({
  name: test.name,
  progress: 0,
  color: ["#7be495", "#4f8cff", "#ffb347", "#ff6f69"][index],
  route: test.route
}));

const SolarSystem: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [planetPositions, setPlanetPositions] = useState<{x: number, y: number}[]>([]);
  const [svgSize, setSvgSize] = useState({ width: 900, height: 900 });

  useEffect(() => {
    // Calcula el radio máximo de las órbitas
    const avatarSize = 360;
    const avatarRadius = avatarSize / 2;
    const orbitStart = avatarRadius + 50;
    const orbitGap = 100;
    const orbitCount = planets.length + 1;
    const maxRx = orbitStart + (orbitCount - 1) * orbitGap;
    const maxRy = maxRx * 0.35;
    // Deja margen extra para que no se corte
    const margin = 60;
    const width = maxRx * 2 + margin * 2;
    const height = maxRy * 2 + avatarSize + margin * 2;
    const center = { x: width / 2, y: avatarRadius + margin + maxRy };

    // Calcular posiciones de planetas para usarlas en React
    const rx = orbitStart + orbitGap;
    const ry = rx * 0.35;
    // Ángulos para planetas: aún más cerca entre sí
    const angles = [3 * Math.PI / 4, 5 * Math.PI / 4, Math.PI / 4, 7 * Math.PI / 4];
    const positions = planets.map((_, i) => {
      const angle = angles[i % angles.length];
      return {
        x: center.x + rx * Math.cos(angle),
        y: center.y + ry * Math.sin(angle),
      };
    });
    setPlanetPositions(positions);

    const svg = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    // Dibuja órbitas como elipses para efecto 3D
    for (let i = 0; i < orbitCount; i++) {
      svg.append("ellipse")
        .attr("cx", center.x)
        .attr("cy", center.y)
        .attr("rx", orbitStart + i * orbitGap)
        .attr("ry", (orbitStart + i * orbitGap) * 0.35)
        .attr("fill", "none")
        .attr("stroke", "#a3a3a3")
        .attr("stroke-width", "2");
    }

    // Suelo morado 3D debajo del avatar (dibujar primero)
    svg.append("ellipse")
      .attr("cx", center.x)
      .attr("cy", center.y + avatarRadius - 170)
      .attr("rx", orbitStart * 0.60)
      .attr("ry", orbitStart * 0.20)
      .attr("fill", "#7c3aed")
      .attr("opacity", 0.5)
      .attr("stroke", "#a259ff")
      .attr("stroke-width", 3)
      .attr("filter", "url(#shadow)");

    // Avatar central (dibujar después del suelo)
    svg.append("image")
      .attr("xlink:href", "/assets/img/tests/avatar.png")
      .attr("x", center.x - avatarRadius)
      .attr("y", center.y - (avatarRadius + 100))
      .attr("width", avatarSize)
      .attr("height", avatarSize)
      .attr("clip-path", `circle(${avatarRadius}px at ${avatarRadius}px ${avatarRadius}px)`);

    // Dibuja los planetas como imágenes
    planets.forEach((planet, i) => {
      const { x, y } = positions[i];
      const planetImgSize = 75;
      svg.append("image")
        .attr("xlink:href", `/assets/img/tests/planet${i + 1}.png`)
        .attr("x", x - planetImgSize / 2)
        .attr("y", y - planetImgSize / 2)
        .attr("width", planetImgSize)
        .attr("height", planetImgSize);
    });

    // Filtro de sombra
    svg.append("defs")
      .html(`
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="8" flood-color="#a259ff" flood-opacity="0.5" />
        </filter>
      `);

    setSvgSize({ width, height });
  }, []);

  // Renderizar las cards usando las posiciones calculadas
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div
        style={{ 
          width: svgSize.width,
          height: svgSize.height,
          position: "relative",
        }}
      >
        <svg
          ref={ref}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
          }}
        >
          {/* Suelo morado 3D debajo del avatar, dentro del SVG y centrado */}
          <ellipse
            cx={450}
            cy={450 + 120} // un poco debajo del centro
            rx={80}
            ry={22}
            fill="#7c3aed"
            opacity="0.25"
            stroke="#a259ff"
            strokeWidth="3"
            filter="url(#shadow)"
          />
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#a259ff" floodOpacity="0.5" />
            </filter>
          </defs>
        </svg>
        {/* Avatar y planetas siguen en el mismo centro */}
        <svg
          width={900}
          height={900}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 2, pointerEvents: "none" }}
        >
        </svg>
        {/* Cards */}
        {planetPositions.map((pos, i) => (
          <CardInfo
            key={i}
            name={planets[i].name}
            progress={planets[i].progress}
            route={planets[i].route}
            style={{
              left: i < 2 ? pos.x - 320 : pos.x + 60,
              top: pos.y - 30,
              zIndex: 3,
              position: 'absolute',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SolarSystem; 