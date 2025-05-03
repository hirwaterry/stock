'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Add01Icon, Cancel01Icon } from 'hugeicons-react';
import Modal from 'react-modal';
import StockInForm from '@/pages/StockInForm';
import { DataTable } from './Table';
import { ColumnDef } from '@tanstack/react-table';

// Define the StockInRecord type based on API response
interface StockInRecord {
  _id: string;
  product?: { name: string };
  quantity: number;
  date: string;
}

// Define columns for DataTable (with checkbox and sorting)
const columns: ColumnDef<StockInRecord>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
    ),
    enableSorting: true,
  },
  {
    accessorKey: 'product.name',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Item</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.original.product?.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Quantity</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => <div>{row.getValue('quantity')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <button
        className="flex items-center space-x-1 font-semibold"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        <span>Date</span>
        {column.getIsSorted() === 'asc' && <span>↑</span>}
        {column.getIsSorted() === 'desc' && <span>↓</span>}
      </button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue('date')).toLocaleString()}</div>
    ),
  },
];

function StockInTable() {
  const [stockInRecords, setStockInRecords] = useState<StockInRecord[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchStockIn = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:4000/stock/in', {
          withCredentials: true,
        });
        setStockInRecords(res.data);
      } catch (err) {
        setError('Failed to fetch stock-in history');
      } finally {
        setLoading(false);
      }
    };

    fetchStockIn();
  }, []);

  // Filter records based on search input
  const filteredRecords = stockInRecords.filter((record) =>
    record.product?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Stock In History</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by item name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-xl border border-gray-300 px-3 w-[40vh] py-5 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/80"
          />
          <button
            className="px-4 w-40 font-light flex gap-2 py-5 rounded-xl bg-gray-200 text-black hover:bg-gray-300"
            onClick={() => setIsModalOpen(true)}
          >
            <Add01Icon /> Stock In
          </button>
        </div>
      </div>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        </div>
      ) : (
        <div className="rounded-lg bg-white shadow-sm">
          <DataTable
            columns={columns}
            data={filteredRecords}
            onRowSelectionChange={setSelectedRows}
          />
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              {Object.keys(selectedRows).length} row(s) selected
            </p>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Stock In Modal"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-400/40 backdrop-blur-sm bg-opacity-50"
      >
        <div className="relative bg-white p-6 rounded-xl shadow-lg">
          <StockInForm />
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-0 right-2 px-4 py-2 text-black rounded"
          >
            <Cancel01Icon/>
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default StockInTable;