// import useSWR, { Fetcher } from 'swr';

import { BE_URL } from '../constants/constants.ts'
import { useState } from 'react';


const useApiMint = () => {
    const writeData = async (url: string, body = null) => {
        const options = {
            method: 'post',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                //'Access-Control-Allow-Headers': '*',
                'Content-Type': 'application/json',
                //referrerPolicy: 'unsafe-url',
            },
            mode: 'cors',
        } as RequestInit;
        if (body) {
            options.body = JSON.stringify(body);
        }
        console.log('options', options);
        const response = await fetch(`${BE_URL}${url}`, options);
        console.log('response', response);
        return response;
    };
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchData = async (url, method = 'GET', body = null) => {
        setIsLoading(true);
        setError(null);
        try {
            const options = {
                method: method,
                headers: {
                    //'Access-Control-Allow-Origin': '*',
                    //'Access-Control-Allow-Headers': '*',
                    'Content-Type': 'application/json',
                    //referrerPolicy: 'unsafe-url',
                },
                mode: 'cors',
            } as RequestInit;
            if (body) {
                options.body = body;
            }
            //console.log(options);
            const response = await fetch(`${BE_URL}${url}`, options);
            if (!response.ok || response.status > 399) {
                console.log('fetchError', response.status);
                setError(response.status);
                throw new Error('Network response was not ok');
                setError(response.status);
            }
            const result = await response.json();
            setData(result);
            setIsLoading(false);
            return result;
        } catch (error) {
            console.log('error', error);
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };
    return { data, isLoading, error, fetchData, writeData, setIsLoading };
};
export default useApiMint;
