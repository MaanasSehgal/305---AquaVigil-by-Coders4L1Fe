import React from 'react'
import loader from '../../public/loader.gif'
import Image from "next/image";
const Loader = () => {
  return (
  <div className='text-center flex justify-center items-center'>
    <Image src={loader} alt="img"  width={70} height={16} priority/>
  </div>
  )
}

export default Loader