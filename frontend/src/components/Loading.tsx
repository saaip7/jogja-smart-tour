import React from "react";
import Image from "next/image";

const LoadingComponent = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Image
        src="/loading.svg"
        alt="Loading"
        width={50}
        height={50}
        className="animate-spin w-10 h-10"
      />
    </div>
  );
};

export default LoadingComponent;
