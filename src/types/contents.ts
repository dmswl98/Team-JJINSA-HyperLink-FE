export type content = {
  contentId: number;
  creatorId: number;
} & contentData;

export type contentData = {
  contentImgUrl: string;
  createdAt: string;
  creatorName: string;
  isBookmarked: boolean;
  isLiked: boolean;
  likeCount: number;
  link: string;
  title: string;
  viewCount: number;
  recommendations?: banner[];
};

export type banner = {
  bannerLogoImgUrl: string;
  bannerName: string;
};

export type contents = {
  contents: content[];
  hasNext: boolean;
};

export type searchContents = {
  getContentsCommonResponse: contents;
  keyword: string;
  resultCount: number;
};

export type creator = {
  creatorId: 1;
  creatorName: string;
  subscriberAmount: number;
  creatorDescription: string;
  isSubscribed: boolean;
  profileImgUrl: string;
};

export type creators = {
  creators: creator[];
  hasNext: boolean;
};

export type histories = {
  contents: content[];
  hasNext: boolean;
};
