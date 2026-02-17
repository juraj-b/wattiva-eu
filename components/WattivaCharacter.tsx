"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function WattivaCharacter({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [animationData, setAnimationData] = useState<unknown>(null);

  useEffect(() => {
    fetch("/wattiva_character.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  if (!animationData) return null;

  return (
    <div className={className} style={style}>
      <Lottie animationData={animationData} loop autoplay />
    </div>
  );
}
