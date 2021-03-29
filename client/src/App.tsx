import React from 'react';
import './App.css';
import Table from './components/Table/Table';
import { AccountProps } from './types';
import SelectFilter from './components/Filters/SelectFilter';
interface ErrorObj {
  [key: string]: string
}

function App() {
  const [data, setData] = React.useState<Array<AccountProps>>([]);
  const [fullData, setFullData] = React.useState<Array<AccountProps>>([]);
  const [error, setError] = React.useState<ErrorObj>({});
  const [pageCount, setPageCount] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const downloadDataAsCSV = () => {
    const csvHead = Object.keys(fullData[0]);
    const replacement = (key: string, value: string | number) => value === null ? null : value;
    // @ts-ignore
    const csvData = [csvHead.join(','), ...fullData.map(row => csvHead.map(fieldName => JSON.stringify(row[fieldName], replacement)).join(','))].join('\r\n');
    const downloadData = new Blob([csvData], {type: 'text/csv'});
    const csvDownloadURL = window.URL.createObjectURL(downloadData);

    const temporaryDownloadLink = document.createElement('a');
    temporaryDownloadLink.href = csvDownloadURL;
    temporaryDownloadLink.setAttribute('download', 'account_data.csv');
    temporaryDownloadLink.click();
  }
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
        setFullData(accounts)

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
        Filter: false,
        disableSortBy: true
      },
      {
        Header: 'Last Name',
        accessor: 'Last Name',
        Filter: false,
        disableSortBy: true
      },
      {
        Header: 'Country',
        accessor: 'Country',
        Filter: SelectFilter,
        filter: 'includes',
        disableSortBy: true
      },
      {
        Header: 'Referred By',
        accessor: 'ReferredBy',
        Filter: false,
        disableSortBy: true
      },
      {
        Header: 'amt',
        accessor: 'amt',
        Filter: false
      },
      {
        Header: 'Created Date',
        accessor: 'createdDate',
        Filter: false
      },
      {
        Header: 'Date of Birth',
        accessor: 'dob',
        Filter: false,
        disableSortBy: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        Filter: false,
        disableSortBy: true
      },
      {
        Header: 'MFA',
        accessor: 'mfa',
        Filter: SelectFilter,
        filter: 'includes',
        disableSortBy: true
      }
  ], []);
  return (
    <div className="App">
      <Table columns={columns} data={data} fetchData={fetchData} pageCount={pageCount} loading={loading} /> 
      <button style={{ marginTop: '30px'}} onClick={downloadDataAsCSV}>Export as CSV</button>
    </div>
  );
}

export default App;
