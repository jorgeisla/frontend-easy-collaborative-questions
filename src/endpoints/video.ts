import { api } from 'src/utils/env-var';

const createUploadLink = () => {
    return `${api}/video/create-upload-link`;
};

const crudVideoApi = () => {
    return `${api}/video/`;
};

export { createUploadLink, crudVideoApi };
