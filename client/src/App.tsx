import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import { AccountProps } from './types';
interface ErrorObj {
  [key: string]: string
}

function App() {
  const [data, setData] = React.useState<Array<AccountProps>>([]);
  const [error, setError] = React.useState<ErrorObj>({});
  const [pageCount, setPageCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    const fetchAccountsData = async () => {
      setLoading(true)
      try {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/data`);
        const accounts = await data.json();
        if (!!accounts) {
          
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize
        setData(accounts.slice(startRow, endRow))

        setPageCount(Math.ceil(accounts.length / pageSize))
        setLoading(false)
        }
      } catch (err) {
        setError(err.message);
      }
    }
    fetchAccountsData();

  }, [])
  const columns = React.useMemo(() => [
      {
        Header: 'First Name',
        accessor: 'First Name',
        filter: 'fuzzyNameSearch'
      },
      {
        Header: 'Last Name',
        accessor: 'Last Name',
        filter: 'fuzzyNameSearch'
      },
      {
        Header: 'Country',
        accessor: 'Country'
      },
      {
        Header: 'Referred By',
        accessor: 'ReferredBy'
      },
      {
        Header: 'amt',
        accessor: 'amt'
      },
      {
        Header: 'Created Date',
        accessor: 'createdDate'
      },
      {
        Header: 'Date of Birth',
        accessor: 'dob'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'MFA',
        accessor: 'mfa'
      }
  ], []);
  return (
    <div className="App">
      <Table columns={columns} data={data} fetchData={fetchData} pageCount={pageCount} loading={loading} /> 
    </div>
  );
}

export default App;
