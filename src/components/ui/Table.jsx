import React from 'react';

/**
 * Reusable Table Component
 * @param {Array} columns - Array of column definitions { key, label, render }
 * @param {Array} data - Array of data objects
 * @param {string} className - Additional CSS classes
 */
const Table = ({ columns = [], data = [], className = '' }) => {
  return (
    <div className={`overflow-x-auto rounded-lg ${className}`}>
      <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            {columns.map((column, index) => (
              <th
                key={column.key || index}
                className={`
                  px-4 py-3 text-left text-xs font-semibold 
                  text-gray-700 dark:text-gray-300 uppercase tracking-wider
                  ${column.className || ''}
                `}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key || colIndex}
                    className={`
                      px-4 py-3 text-sm text-gray-900 dark:text-gray-100
                      ${column.className || ''}
                    `}
                  >
                    {column.render
                      ? column.render(row[column.key], row, rowIndex)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

