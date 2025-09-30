import { CITATION_ACTION_TYPES } from "./citationActionTypes";

export const generateCitationRequest = () => ({
  type: CITATION_ACTION_TYPES.GENERATE_REQUEST,
});
export const generateCitationSuccess = (data) => ({
  type: CITATION_ACTION_TYPES.GENERATE_SUCCESS,
  payload: data,
});
export const generateCitationFailure = (error) => ({
  type: CITATION_ACTION_TYPES.GENERATE_FAILURE,
  payload: error,
});

export const regenerateCitationRequest = () => ({
  type: CITATION_ACTION_TYPES.REGENERATE_REQUEST,
});
export const regenerateCitationSuccess = (data) => ({
  type: CITATION_ACTION_TYPES.REGENERATE_SUCCESS,
  payload: data,
});
export const regenerateCitationFailure = (error) => ({
  type: CITATION_ACTION_TYPES.REGENERATE_FAILURE,
  payload: error,
});

export const getCitationStyleRequest = () => ({
  type: CITATION_ACTION_TYPES.GET_CITATION_STYLE_REQUEST,
});
export const getCitationStyleSuccess = (data) => ({
  type: CITATION_ACTION_TYPES.GET_CITATION_STYLE_SUCCESS,
  payload: data,
});
export const getCitationStyleFailure = (error) => ({
  type: CITATION_ACTION_TYPES.GET_CITATION_STYLE_FAILURE,
  payload: error,
});