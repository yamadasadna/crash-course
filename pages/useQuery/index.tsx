// pages/docs.tsx
import axios from 'axios';
import { Button } from "@nextui-org/button";
import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Spinner } from "@nextui-org/spinner";
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { useQuery, useQueryClient } from 'react-query';
import ButtonInvalidateQuery from '../Button/ButtonIvaliddateQuery';

// Define the Post type

// Fetch function to get table data
const fetchTableData = () => {
  return axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => response.data);
};

export default function UseQueryExample() {
  const queryClient = useQueryClient();
  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error
  } = useQuery(['fetchTableData'], () => fetchTableData(), {
    enabled: true,
    refetchOnWindowFocus:false,
    // staleTime: 60000, //Optional 1 minute
    // refetchInterval: 10000, //Optional refetch every 10 seconds
  });

  if (isLoading || isFetching) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>UseQuery Example</h1>
            <div className='my-4'>
            <Spinner />
            </div>
          </div>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>UseQuery Example</h1>
          <div className='my-4'>
          <Button onClick={() => refetch()} color="primary">
            Refetch Data
          </Button>
          {/* <Button className='ml-4' onClick={() => queryClient.invalidateQueries(['fetchTableData'])} color="primary">
            Invalidate Queries
          </Button> */}
          <ButtonInvalidateQuery/>
          </div>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Nama</TableColumn>
              <TableColumn>Username</TableColumn>
            </TableHeader>
            <TableBody>
              {data && data.length > 0 ? (
                data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No data available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </DefaultLayout>
  );
}
