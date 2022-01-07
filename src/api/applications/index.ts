import axiosInstance from "../../apiServices/axiosService";

import APIConstants from "./applicationsEndpoint";

const getApplications = async (userId: string) => {
  return axiosInstance.get(`${APIConstants.APPLICATIONS}?userId=${userId}`, {
    timeout: 1000
  });
};

const addAttachments = async (
  ApplicationId: string,
  userId: string,
  RoleID: string,
  attachments = []
) => {
  return axiosInstance.post(`${APIConstants.ADD_ATTACHMENTS}`, {
    ApplicationId,
    userId,
    attachments
  });
};
const AddApplicationForm = async (
  ApplicationId: string,
  userId: string,
  EvaluationForm: {},
  RoleId: number | string,
  Location: {},
  attachments = [],
) => {
  return axiosInstance.post(`${APIConstants.ADD_APPLICATION_FORM}`, {
    ApplicationId,
    userId,
    EvaluationForm,
    RoleId,
    Location,
    attachments
  });
};

const setLocation = async (
  ApplicationId: string,
  userId: string,
  Longitude: string,
  Latitude: string
) => {
  return axiosInstance.post(`${APIConstants.ADD_ATTACHMENTS}`, {
    ApplicationId,
    userId,
    Longitude,
    Latitude
  });
};

export default {
  getApplications,
  AddApplicationForm,
  setLocation,
  addAttachments
};
