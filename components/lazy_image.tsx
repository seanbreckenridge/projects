import React from "react";

import {Dimensions} from "../lib/parseData";

interface ILazyImage {
  src?: string;
  name?: string;
  dimensions?: Dimensions;
}

const LazyImage = React.memo(({src, name, dimensions}: ILazyImage) => {
  console.log(src)
  return (
    <>
      {src != null
        ? (
          <a href={src} target="_blank">
            <img src={src} alt={`${name}`} />
          </a>
        ) : (
          <></>
        )
      }
    </>
  )
})

export default LazyImage;
