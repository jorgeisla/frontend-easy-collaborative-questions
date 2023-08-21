import { api } from 'src/utils/env-var';

const createUploadLink = () => {
    return `${api}/video/create-upload-link`;
};

export { createUploadLink };
