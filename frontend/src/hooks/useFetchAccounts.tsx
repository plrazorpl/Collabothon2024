import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface IPersonalInfo {
    id: number;
    firstName: string;
    lastname: string;
    companyName: string;
    salutation: string;
    age: string;
    type: string;
}

export interface IAccount {
    id: number;
    client: IPersonalInfo;
    balanceAmount: number;
    bban: string;
}

interface IFetchAccounts {
    isLoading: boolean;
    isFetched: boolean;
    isError: boolean;
    data: IAccount[] | undefined;
}

const fetchAccounts = async (): Promise<IAccount[]> => {
    const response = await axios.get(`http://localhost:8080/api/v1/accounts`);
    return response.data;
};

export const useFetchAccounts = (shouldFetch = true): IFetchAccounts => {
    const { data, isLoading, isError, isFetched } = useQuery({
        queryKey: ['accounts'],
        enabled: shouldFetch,
        queryFn: fetchAccounts,
    });

    return {
        data,
        isLoading,
        isFetched,
        isError,
    };
};
