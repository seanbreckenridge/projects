import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { Dimensions } from "../lib/parseData";

interface ILazyImage {
  src?: string;
  name?: string;
  dimensions?: Dimensions;
}

const maxWidth = 400;
const maxHeight = 400;

const LazyImage = React.memo(({ src, name, dimensions }: ILazyImage) => {
  const ratio = Math.min(
    maxWidth / dimensions.width,
    maxHeight / dimensions.height
  );

  const useWidth = dimensions.width * ratio;
  const useHeight = dimensions.height * ratio;

  return (
    <>
      {src != null ? (
        <div className={styles.lazyImageContainer}>
          <a href={src} target="_blank">
            <Image
              src={src}
              alt={`${name}`}
              width={useWidth}
              height={useHeight}
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

export default LazyImage;
