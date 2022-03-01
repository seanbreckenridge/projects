import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Dimensions } from "../lib/parseData";

interface ILazyImage {
  src?: string;
  name?: string;
  dimensions?: Dimensions;
}

// const maxWidth = 400;
// const maxHeight = 400;

const LazyImage = React.memo(({ src, name, dimensions }: ILazyImage) => {
  // const ratio = Math.min(
  //   maxWidth / dimensions.width,
  //   maxHeight / dimensions.height
  // );

  // const useWidth = dimensions.width * ratio;
  // const useHeight = dimensions.height * ratio;

  return (
    <>
      {src != null ? (
        <div className={styles.lazyImageContainer}>
          <a href={src.endsWith("gif") ? null : src} target="_blank" rel="noreferrer">
            <Image
              src={src}
              alt={name}
              title="Open Image in New Tab"
              width={dimensions.width}
              height={dimensions.height}
              loading="lazy"
            />
          </a>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

LazyImage.displayName = "Lazy Image";

export default LazyImage;
