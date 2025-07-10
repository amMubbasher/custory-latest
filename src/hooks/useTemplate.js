import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTemplateAPI, getTemplatesAPI } from "../api/template.api";


// Use templates are for the editor custom templates panel 
export default function useTemplate  (props={}) {
    const {createTemplateSuccessCallback, createTemplateErrorCallback} = props
    const queryClient = useQueryClient();

    const {data : templates, isLoading : isLoadingTemplateFetch, isError : isTemplateFetchError, error : templateFetchError} = useQuery(['templates'],getTemplatesAPI, {
        staleTime : 1000*60,
        cacheTime : 10*60*10000,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        select : (data)=>data.templates
    });

    const {data : updatedTemplate, mutate : createTemplate, isLoading : isLoadingCreateTemplate, isError : isErrorCreateTemplate, error : errorCreateTemplate} = useMutation(createTemplateAPI, {
        onSuccess : (data)=>{
            if (createTemplateSuccessCallback) createTemplateSuccessCallback(data);
            queryClient.invalidateQueries(['templates']);
        },
        onError : (error)=>{
            if (createTemplateErrorCallback) createTemplateErrorCallback(error);
        }
    });

    return {
        templates : templates || [],
        isLoadingTemplateFetch,
        isTemplateFetchError,
        templateFetchError,
        createTemplate,
        updatedTemplate,
        isLoadingCreateTemplate,
        isErrorCreateTemplate,
        errorCreateTemplate
    }
}