import { Article } from "./article.types";

import { articleAPI } from "~/api";
import { generalErrorHandler } from "~/utils/";

const getArticle: (slug: string) => Promise<Article> = async slug => {
  try {
    const data = await articleAPI.getArticleBySlug(slug);
    // TODO: article travel categories
    return {
      featuredImageUUID: data.featured_image?.image_uuid ?? "",
      gallery:
        data.gallery?.map((item: any) =>
          "image_uuid" in item
            ? {
                owner: item.owner ?? "",
                source: item.source ?? "",
                uuid: item.image_uuid
              }
            : undefined
        ) ?? [],
      summary: "",
      travelCategories: [],
      title: data.title.ar,
      slug: data.slug,
      pkey: data.pkey,
      body: data.body
        .replace(
          'Powered by [Froala Editor](https://www.froala.com/wysiwyg-editor?pb=1 "Froala Editor")',
          ""
        )
        .replace(new RegExp(" +\\n\\*\\*", "gm"), "**")
        .replace(new RegExp("[  ]*\\*\\*[  ]*", "gm"), "**"),
      timestamp: data.timestamp,
      isFollow: data.isFollow ?? false,
      isMine: false,
      viewsCount: data.views_count ?? 0,
      createdBy: {
        roles: data.created_by.roles ?? [],
        profileImage:
          data.created_by.profile
            ?.split("/")
            ?.pop()
            ?.replace(new RegExp("_.*jpg", "gm"), "") ?? "",
        name: data.created_by.name,
        uuid: data.created_by.id,
        verified: data.created_by.verified ?? false
      }
    };
  } catch (error) {
    generalErrorHandler(error);
  }
};

export default {
  getArticle
};
