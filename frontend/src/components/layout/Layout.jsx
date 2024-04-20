import Navbar from "../navbar/Navbar"




function Layout({children}) {
  return (
    <>
       <Navbar/>
     
        {children}
    </>
  )
}

export default Layout