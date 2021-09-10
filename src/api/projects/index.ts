import axiosInstance from "../../apiServices/axiosService";
import APIConstants from "./projectsEndpoint";

const getProjects = async (userId: string) => {
  return axiosInstance.get(`${APIConstants.PROJECTS}?userId=${userId}`);
};
const addAttachments = async (projectId: string, userId: string, attachments = []) => {
  return axiosInstance.post(`${APIConstants.ADD_ATTACHMENTS}`, {
    projectId,
    userId,
    attachments
  });

}


export default {
  getProjects,
  addAttachments
};
