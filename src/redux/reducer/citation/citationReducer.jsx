import { CITATION_ACTION_TYPES } from "../../actions/citation/citationActionTypes";
const initialState = {
    // Loading states
    isLoading: false,
    isGenerateLoading: false,
    isReGenerateLoading: false,
    isGetCitationStyleLoading: false,

    // Error states
    error: null,
    generateError: null,
    regenerateError: null,
    getCitationStyleError: null,

    // Success states
    generateSuccess: false,
    regenerateSuccess: false,
    getCitationStyleSuccess: false,    
};
const citationReducer = (state = initialState, action) => {
    switch (action.type) {
    case CITATION_ACTION_TYPES.GENERATE_REQUEST:
        return {
        ...state,
        isGenerateLoading: true,
        isLoading: true,
        generateError: null,
        generateSuccess: false,
        }
    case CITATION_ACTION_TYPES.GENERATE_SUCCESS:
        return {
        ...state,
        isGenerateLoading: false,
        isLoading: false,
        generateError: null,
        generateSuccess: true,
        error: null,
        }
    case CITATION_ACTION_TYPES.GENERATE_FAILURE:
          return {
            ...state,
            isGenerateLoading: false,
            isLoading: false,
            generateError: action.payload,
            generateSuccess: false,
            error: action.payload,
           };

    case CITATION_ACTION_TYPES.REGENERATE_REQUEST:
        return {
        ...state,
        isReGenerateLoading: true,
        isLoading: true,
        regenerateError: null,
        regenerateSuccess: false,
        }

    case CITATION_ACTION_TYPES.REGENERATE_SUCCESS:
        return {
        ...state,
        isReGenerateLoading: true,
        isLoading: true,
        regenerateError: null,
        regenerateSuccess: false,
        }
        
    case CITATION_ACTION_TYPES.REGENERATE_FAILURE:
        return {
        ...state,
        isReGenerateLoading: true,
        isLoading: true,
        regenerateError: null,
        regenerateSuccess: false,
        }
    case CITATION_ACTION_TYPES.GET_CITATION_STYLE_REQUEST:
        return {
        ...state,
        isGetCitationStyleLoading: true,
        isLoading: true,
        getCitationStyleError: null,
        getCitationStyleSuccess: false,
        }
    
    case CITATION_ACTION_TYPES.GET_CITATION_STYLE_SUCCESS:
        return {
        ...state,
        isGetCitationStyleLoading: true,
        isLoading: true,
        getCitationStyleError: null,
        getCitationStyleSuccess: false,
        }
    
    case CITATION_ACTION_TYPES.GET_CITATION_STYLE_FAILURE:
        return {
        ...state,
        isGetCitationStyleLoading: true,
        isLoading: true,
        getCitationStyleError: null,
        getCitationStyleSuccess: false,
        }
        
    default:
      return state;
}
}
export default citationReducer;