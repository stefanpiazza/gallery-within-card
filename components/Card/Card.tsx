import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useOnScreen from "../../hooks/useOnScreen";
import { Listing } from "../../types";

type CardProps = {
  listing: Listing;
};

export const Card = ({ listing }: CardProps) => {
  const { otherPropertyImages, title, price, address, publishedOn } = listing;

  const [, setActiveImageIndex] = useState(0);

  const imagesListRef = useRef<HTMLOListElement>(null);
  const imagesListItemRef = useRef<Array<HTMLLIElement>>([]);

  const imagesListItemEntry = useOnScreen(imagesListItemRef, {
    threshold: 0.6,
  });

  useEffect(() => {
    if (!imagesListItemEntry) {
      return;
    }

    if (imagesListItemEntry.isIntersecting) {
      setActiveImageIndex(
        parseInt(
          (imagesListItemEntry.target as HTMLElement).dataset
            .imageIndex as string,
          10
        )
      );
    }
  }, [imagesListItemEntry]);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__images">
          {otherPropertyImages && (
            <ol className="images__list" ref={imagesListRef}>
              {otherPropertyImages.map((otherPropertyImage, index) => {
                const { small } = otherPropertyImage;

                return (
                  <li
                    className="images__list-item"
                    key={`images__list-item-${index}`}
                    ref={(element) => {
                      if (element) {
                        imagesListItemRef.current[index] = element;
                      }
                    }}
                    data-image-index={index}
                  >
                    <Image
                      src={small}
                      layout="fill"
                      loading="lazy"
                      alt=""
                      objectFit="cover"
                    />
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
      <div className="card__main">
        <p>Guide Price</p>
        <p>{price}</p>
        <h2>{title}</h2>
        <p>{address}</p>
      </div>
      <div className="card__footer">
        <p>{publishedOn}</p>
      </div>
    </div>
  );
};
