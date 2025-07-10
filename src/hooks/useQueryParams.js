export const useQueryParams = ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Used by a few files to get the query param 
    const getParam = (key)=>{
        return urlParams.get(key);
    }

    return {
        getParam
    }
}