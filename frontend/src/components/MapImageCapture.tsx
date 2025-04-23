"use client";

import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

interface MapImageCaptureProps {
  mapElementId: string;
  onCapture: (imageDataUrl: string) => void;
}

const MapImageCapture: React.FC<MapImageCaptureProps> = ({ mapElementId, onCapture }) => {
  const [isCaptured, setIsCaptured] = useState(false);
  
  useEffect(() => {
    const captureTimer = setTimeout(() => {
      const mapElement = document.getElementById(mapElementId);
      if (mapElement && !isCaptured) {
        html2canvas(mapElement, {
          useCORS: true,
          allowTaint: false,
          scrollX: 0,
          scrollY: 0,
        }).then(canvas => {
          const imageDataUrl = canvas.toDataURL('image/png');
          onCapture(imageDataUrl);
          setIsCaptured(true);
        }).catch(err => {
          console.error('Error capturing map image:', err);
        });
      }
    }, 2000);

    return () => clearTimeout(captureTimer);
  }, [mapElementId, onCapture, isCaptured]);

  return null;
};

export default MapImageCapture;
