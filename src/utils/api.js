import qs from 'qs';

import { browserStorage } from '@/utils/browserStorage';

export function getStrapiURL(path) {
    if (global.window){
        return `${window.location.protocol}//${window.location.host}${ path }`;
    }

    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${ path }`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {RequestInit} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
    // Merge default and user options
    let mergedOptions = {
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${ getStrapiURL(
        `/api${ path }${ queryString ? `?${ queryString }` : '' }`
    ) }`;

    const jwt = browserStorage.get('jwt');

    if (jwt) {
        mergedOptions.headers.Authorization = `Bearer ${jwt}`;
    }

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);

    // Handle response
    if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error(response.statusText);
        const { error } = await response.json();
        throw new Error(error.message ?? 'An error occured please try again');
    }
    const data = await response.json();

    return data;
}
