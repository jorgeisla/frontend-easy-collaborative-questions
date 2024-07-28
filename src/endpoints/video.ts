import { api } from 'src/utils/env-var';

const createUploadLink = () => {
    return `${api}/video/create-upload-link`;
};

const retrieveDownloadLink = (id: string) => {
    return `${api}/video/${id}/retrieve-download-link`;
};

const crudVideoApi = () => {
    return `${api}/video/`;
};

const updateCreateVideoUser = (id: string) => {
    return `${api}/video/${id}/update-create-video-user`;
};

export {
    createUploadLink,
    crudVideoApi,
    retrieveDownloadLink,
    updateCreateVideoUser,
};
