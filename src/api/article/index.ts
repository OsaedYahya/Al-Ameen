import axiosInstance from "../../apiServices/axiosService";

import APIConstants from "./articleEndpoint";

const getArticleBySlug = async (slug: string) => {
  return axiosInstance.get(`${APIConstants.ARTICLE}?slug=${slug}&bodyType=MD`);
};

export default {
  getArticleBySlug
};
