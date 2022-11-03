import Prismic from '@prismicio/client';

const apiEndpoint = 'https://renue.cdn.prismic.io/api/v2/documents/search';
const Client = Prismic.client(apiEndpoint);

export const { Predicates } = Prismic;
export default Client;
