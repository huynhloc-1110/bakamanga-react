import { getManageAxios, baseAxios } from "./api.base";

// user/manga
export const getMangas = (filter) => {
  const search = filter?.search || "";
  const sortOption = filter?.sortOption || 0;
  const includedCategoryIds = filter?.includedCategoryIds || [];
  const excludedCategoryIds = filter?.excludedCategoryIds || [];
  const page = filter?.page || 1;

  return baseAxios.get("/mangas", {
    params: {
      search,
      sortOption,
      includedCategoryIds,
      excludedCategoryIds,
      page,
    },
  });
};

export const getTrendingMangas = () => {
  return baseAxios.get("/mangas/trending");
};

export const getNewToYouMangas = () => {
  return baseAxios.get(`/mangas/new-to-you`);
};

export const getMangaById = (id) => {
  return baseAxios.get(`/mangas/${id}`);
};

export const getChapterByMangaId = (id, filter) => {
  const page = filter?.page || 1;
  const pageSize = filter?.pageSize || 8;

  return baseAxios.get(`/mangas/${id}/chapters`, {
    params: { page, pageSize },
  });
};

// manage/manga
export const getMangaByIdForManage = (id) => {
  return getManageAxios().get(`/manga/${id}`);
};

export const createManga = (formData) => {
  return getManageAxios().post("/manga", formData);
};

export const editManga = (id, formData) => {
  return getManageAxios().put(`/manga/${id}`, formData);
};

export const deleteManga = (id, undelete = false) => {
  return getManageAxios().delete(`/manga/${id}`, {
    params: { undelete },
  });
};
