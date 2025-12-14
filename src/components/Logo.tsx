"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Logo({
  className = "w-full h-auto",
  delay = 0,
  onIconClick,
  viewBox = "0 0 330 72",
  color = "currentColor",
  paths,
}: {
  className?: string;
  delay?: number;
  onIconClick?: (e: React.MouseEvent) => void;
  viewBox?: string;
  color?: string;
  paths?: string[];
}) {
  const [isPressed, setIsPressed] = useState(false);
  const [loadedPaths, setLoadedPaths] = useState<{ d: string; fill?: string }[] | null>(null);
  const [parsedViewBox, setParsedViewBox] = useState<string>(viewBox);
  const svgRef = useRef<SVGSVGElement>(null);
  const iconPath1Ref = useRef<SVGPathElement>(null);
  const iconPath2Ref = useRef<SVGPathElement>(null);
  const iconGroupRef = useRef<SVGGElement>(null);
  const textGroupRef = useRef<SVGGElement>(null);
  const letterPathsRef = useRef<(SVGPathElement | null)[]>([]);

  const handlePressStart = () => {
    setIsPressed(true);
  };

  const handlePressEnd = () => {
    setTimeout(() => {
      setIsPressed(false);
    }, 150);
  };

  useEffect(() => {
    if (paths && paths.length > 0) {
      setLoadedPaths(paths.map((d) => ({ d })));
      return;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("/logo.svg");
        const text = await res.text();
        const doc = new DOMParser().parseFromString(text, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        const vb = svgEl?.getAttribute("viewBox");
        if (vb && !cancelled) setParsedViewBox(vb);
        const pathEls = doc.querySelectorAll("path");
        const parsed: { d: string; fill?: string }[] = [];
        pathEls.forEach((p) => {
          const d = p.getAttribute("d");
          if (!d) return;
          const fillAttr = p.getAttribute("fill") || undefined;
          parsed.push({ d, fill: fillAttr });
        });
        if (!cancelled) setLoadedPaths(parsed);
      } catch {}
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [paths]);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      const getPathLength = (path: SVGPathElement | null): number => {
        if (!path) return 1000;
        try {
          return path.getTotalLength();
        } catch {
          return 1000;
        }
      };

      const animatePath = (
        path: SVGPathElement | null,
        pathDelay: number,
        pathDuration: number,
        fillDelay: number
      ) => {
        if (!path) return;

        const length = getPathLength(path);
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
          fillOpacity: 0,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: pathDuration,
          delay: pathDelay,
          ease: "power2.inOut",
        });

        gsap.to(path, {
          fillOpacity: 1,
          duration: 0.5,
          delay: fillDelay,
        });
      };

      if (iconPath1Ref.current) {
        animatePath(iconPath1Ref.current, delay, 1.5, 1 + delay);
      }

      if (iconPath2Ref.current) {
        animatePath(iconPath2Ref.current, delay, 1.5, 1 + delay);
      }

      letterPathsRef.current.forEach((path, i) => {
        if (!path) return;
        const letterDelay = 0.6 + delay + i * 0.1 + 0.2;
        const length = getPathLength(path);
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0,
          fillOpacity: 0,
          stroke: color,
          strokeOpacity: 1,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1,
          delay: letterDelay,
          ease: "power2.inOut",
        });

        gsap.to(path, {
          fillOpacity: 1,
          strokeOpacity: 0,
          duration: 0.4,
          delay: letterDelay + 0.8,
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, [delay, color, loadedPaths]);

  useEffect(() => {
    if (!iconGroupRef.current) return;

    if (isPressed) {
      gsap.to(iconGroupRef.current, {
        y: 30,
        duration: 0.2,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(iconGroupRef.current, {
        y: 0,
        duration: 0.2,
        ease: "power2.inOut",
      });
    }
  }, [isPressed]);

  return loadedPaths && loadedPaths.length > 0 ? (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={parsedViewBox}
      className={className}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={() => setIsPressed(false)}
      onClick={onIconClick}
      aria-label="Logo"
      role="img"
    >
      <g ref={iconGroupRef}>
        {loadedPaths.map((p, i) => (
          <path
            key={i}
            ref={(el) => {
              letterPathsRef.current[i] = el;
            }}
            d={p.d}
            fill={p.fill ?? color}
          />
        ))}
      </g>
    </svg>
  ) : (
    <img
      src="/logo.svg"
      alt="Avasarams Logo"
      className={className}
      onClick={onIconClick}
    />
  );
}
