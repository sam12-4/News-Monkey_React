import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/components/Navbar'
import News from './assets/components/News'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
 } from 'react-router-dom'
 
 

function App({ category}) {
  const [pageSize, setPageSize] = useState(10)
  const [close, setClose] = useState(window.innerWidth<768 ? true : false)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <News category="" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/home",
      element: <News category="" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "business",
      element: <News category="business" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/entertainment",
      element: <News category="entertainment" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/general",
      element: <News category="general" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/health",
      element: <News category="health" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/science",
      element: <News category="science" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/sports",
      element: <News category="sports" pageSize={10} close={close} setClose={setClose}/>,
    },
    {
      path: "/technology",
      element: <News category="technology" pageSize={10} close={close} setClose={setClose}/>,
    },
  ]);
  return (
    <>
    <Navbar close={close} setClose={setClose} />
    <RouterProvider router={router} />
    </>
  )
}

export default App
