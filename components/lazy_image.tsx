import React from "react";
import Image from "next/image";
import styles from "../styles/Card.module.css";

import { Dimensions } from "../lib/parseData";

interface ILazyImage {
  src?: string;
  name?: string;
  dimensions?: Dimensions;
}

const maxWidth = 400;
const maxHeight = 400;

const LazyImage = React.memo(({ src, name, dimensions }: ILazyImage) => {
  const useWidth = dimensions?.width > maxWidth ? maxWidth : dimensions?.width
  const height = useWidth * (dimensions?.height / dimensions?.width)
  return (

    <>
      {src != null ? (
        <div
          className={styles.lazyImageContainer}
          style={{
            width: dimensions?.width > maxWidth ? maxWidth : dimensions?.width,
            height: height,
          }}
        >
          <Image src={src} alt={name} fill={true} loader={({ src }) => src} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

LazyImage.displayName = "Lazy Image";

export default LazyImage;
