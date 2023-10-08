import React from "react";
import Image from "next/image";
import styles from "../styles/Card.module.css";

interface ILazyImage {
  src?: string;
  name?: string;
}

const LazyImage = React.memo(({ src, name }: ILazyImage) => {
  return (
    <>
      {src != null ? (
        <div className={styles.lazyImageContainer}>
          <Image
            style={{
              objectFit: "contain"
            }}
            src={src}
            alt={name}
            fill
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
