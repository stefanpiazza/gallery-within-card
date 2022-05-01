export type Listing = {
  listingId: string;
  title: string;
  publishedOn: string;
  otherPropertyImages?: OtherPropertyImage[] | null;
  features?: Features[] | null;
  image: Image;
  flag: string;
  price: string;
  address: string;
};

export type OtherPropertyImage = {
  small: string;
  large: string;
  caption?: null;
};

export type Features = {
  content: number;
  iconId: string;
};

export type Image = {
  src: string;
  caption?: null;
  responsiveImgList?: ResponsiveImg[] | null;
};

export type ResponsiveImg = {
  width: number;
  src: string;
};

export type Listings = Listing[];
