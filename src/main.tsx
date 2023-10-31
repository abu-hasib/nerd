import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Link, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import Details from './Details.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />
  },
  {
    path: ":id",
    element: <Details />,
    errorElement: <ErrorBoundary />
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return <div className='h-screen flex flex-col items-center justify-center'>
     <h1 className='text-[64px] font-black'>Please hold on, we are working on it</h1>
     <Link to="/" className='bg-blue-500 p-2 rounded-[4px]'>Go back</Link>
    </div>;
}