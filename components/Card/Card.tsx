import Image from "next/image";
import { Listing } from "../../types";

type CardProps = {
  listing: Listing;
};

export const Card = ({ listing }: CardProps) => {
  const { otherPropertyImages, title, price, address, publishedOn, listingId } =
    listing;

  return (
    <div className="card">
      <div className="header">
        <div className="images">
          {otherPropertyImages && (
            <ol className="images__list">
              {otherPropertyImages.map((otherPropertyImage, index) => {
                const { small } = otherPropertyImage;

                return (
                  <li
                    className="images__list-item"
                    key={`images__list-item-${index}`}
                    data-listing-id={listingId}
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

          {otherPropertyImages && (
            <ol className="images__group-list">
              {otherPropertyImages.map((otherPropertyImage, index) => {
                const { small } = otherPropertyImage;

                return (
                  <li
                    className="images__group-list-item"
                    key={`images__group-list-item-${index}`}
                    data-listing-id={listingId}
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
      <div className="main">
        <p>Guide Price</p>
        <p>{price}</p>
        <h2>{title}</h2>
        <p>{address}</p>
      </div>
      <div className="footer">
        <p>{publishedOn}</p>
      </div>
    </div>
  );
};
