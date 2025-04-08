// src/app/shared/styles/tailwind-classes.ts

// Input fields (text, password, email, etc.)
export const inputClass =
  'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ' +
  'focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' +
  'dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ' +
  'dark:focus:ring-blue-500 dark:focus:border-blue-500';

// Labels
export const labelClass =
  'block mb-2 text-sm font-medium text-gray-900 dark:text-white';

// Error message (below inputs)
export const errorTextClass =
  'mt-2 text-sm text-red-600 dark:text-red-500';

// Buttons (main)
export const primaryButtonClass =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none ' +
  'focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' +
  'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

// Buttons (full-width for modal)
export const fullWidthButtonClass =
  'w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none ' +
  'focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ' +
  'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800';

// Checkbox input
export const checkboxClass =
  'w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 ' +
  'dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800';

// Modal container (optional reuse)
export const modalContainerClass =
  'relative bg-white rounded-lg shadow-sm dark:bg-gray-700';

// Modal header
export const modalHeaderClass =
  'flex items-center justify-between p-4 md:p-5 border-b rounded-t ' +
  'dark:border-gray-600 border-gray-200';

// Modal close button
export const modalCloseBtnClass =
  'end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 ' +
  'rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center ' +
  'dark:hover:bg-gray-600 dark:hover:text-white';
