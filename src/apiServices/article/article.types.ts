export interface NameUUID {
  name: string;
  uuid: string;
}

export interface CreatedBy extends NameUUID {
  roles: string[];
  profileImage: string;
  verified: boolean;
}

export interface GalleryImage {
  owner: string;
  source: string;
  uuid: string;
}

interface SimpleSocialItem {
  pkey: string;
  createdBy: CreatedBy;
  timestamp: number;
}

interface SimpleFeedItem extends SimpleSocialItem {
  isFollow: boolean;
  isMine: boolean;
  viewsCount: number;
}

export interface SimpleArticle {
  featuredImageUUID: string;
  title: string;
  slug: string;
  summary: string;
  viewsCount: number;
}

export interface ArticleFeed extends SimpleArticle, SimpleFeedItem {}

export interface Article extends ArticleFeed {
  gallery: GalleryImage[];
  body: string;
  travelCategories: NameUUID[];
}
