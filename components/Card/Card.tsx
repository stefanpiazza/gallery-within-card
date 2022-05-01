import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import useIsScrolling from '../../hooks/useIsScrolling'
import { Listing } from "../../types";

type CardProps = {
  listing: Listing;
};

export const Card = ({ listing }: CardProps) => {
  const { otherPropertyImages, title, price, address, publishedOn, listingId } =
    listing;

  const galleryRef = useRef();
  const galleryScrolling = useIsScrolling(galleryRef);
  const autoGalleryScrollRef = useRef<boolean>(false);
  const filmstripRef = useRef();
  const galleryEntry = useOnScreen({
    entrySelector: '.images__list-item',
    root: galleryRef,
    threshold: '1.0'
  });

  useEffect(() => {
    if(galleryEntry && !autoGalleryScrollRef.current){
      const galleryId = galleryEntry.target.dataset.imageId;

      if(galleryId && filmstripRef.current){
        const filmstripImage = filmstripRef.current.querySelector(`[data-image-id="${galleryId}"]`);
        if(filmstripImage){
          filmstripImage.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start',
          });
        }
      }
    }
  }, [galleryEntry]);

  useEffect(() => {
    if(!galleryScrolling.isScrollingX){
      autoGalleryScrollRef.current = false;
    }
  }, [galleryScrolling.isScrollingX]);

  const onClick = useCallback((event) => {
    const imageId = event.currentTarget.dataset.imageId;
    if(galleryRef.current){
      const galleryImage = galleryRef.current.querySelector(`[data-image-id="${imageId}"]`);
      if(galleryImage){
        autoGalleryScrollRef.current = true;
        galleryImage.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
      }
    }
  }, []);

  return (
    <div className="card">
      <div className="card__header">
        <div className="card__images">
          {otherPropertyImages && (
            <ol className="images__list" ref={galleryRef}>
              {otherPropertyImages.map((otherPropertyImage, index) => {
                const { small } = otherPropertyImage;
                const imageId = getImageId(small);
                return (
                  <li
                    className="images__list-item"
                    key={`images__list-item-${index}`}
                    data-listing-id={listingId}
                    data-image-id={imageId}
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
            <ol className="images__group-list" ref={filmstripRef}>
              {otherPropertyImages.map((otherPropertyImage, index) => {
                const { small } = otherPropertyImage;
                const imageId = getImageId(small);
                return (
                  <li
                    className="images__group-list-item"
                    key={`images__group-list-item-${index}`}
                    data-listing-id={listingId}
                    data-image-id={imageId}
                    onClick={onClick}
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

function getImageId(imageUrl: string): string {
  const url = new URL(imageUrl);
  const pathPieces = url.pathname.split('/');
  const filename = pathPieces[pathPieces.length - 1];
  const extensionIndex = filename.indexOf('.');
  return filename.substring(0, extensionIndex);
}

function useOnScreen(
  { entrySelector = null, threshold = 0, root = null, rootMargin = "0%" }
){

  const intersectionObserverRef = useRef();
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if(intersectionObserverRef.current){
      intersectionObserverRef.current.disconnect();
      intersectionObserverRef.current = null;
    }

    if(root === null || root.current){
      const observerParams = { threshold, root: root.current ?? null, rootMargin };
      intersectionObserverRef.current = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting) setEntry(entry);
      }, observerParams);

      const entries = root.current.querySelectorAll(entrySelector);
      for(let i = 0; i < entries.length; i++){
        if(!entries[i]) continue;
        intersectionObserverRef.current.observe(entries[i])
      }
    }

    return () => {
      if(intersectionObserverRef.current){
        intersectionObserverRef.current.disconnect();
        intersectionObserverRef.current = null;
      }
    };

  }, [root, rootMargin, threshold, entrySelector]);

  if(entrySelector === null){
    throw new Error(`entrySelector has not been set`);
  }

  return entry;
};