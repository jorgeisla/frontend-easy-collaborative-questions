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

export { createUploadLink, crudVideoApi, retrieveDownloadLink };
