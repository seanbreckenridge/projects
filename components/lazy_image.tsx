import React from "react";
import Image from "next/image";
import styles from "../styles/Card.module.css";

import { Dimensions } from "../lib/parseData";

interface ILazyImage {
  src?: string;
  name?: string;
  dimensions?: Dimensions;
}

const LazyImage = React.memo(({ src, name, dimensions }: ILazyImage) => {
  return (
    <>
      {src != null ? (
        <div className={styles.lazyImageContainer}>
          <Image
            src={src}
            alt={name}
            fill
            objectFit="cover"
            loader={({ src }) => src}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

LazyImage.displayName = "Lazy Image";

export default LazyImage;
