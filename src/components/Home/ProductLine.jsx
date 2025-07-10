import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card';

const ProductLine = ({lineName = "FEATURED",products = [{name:"Rishwin", description:"This is a description",imageLink:"https://picsum.photos/200?random=1",urlLink:"/",price:9},{name:"Sam", description:"This is a description",imageLink:"https://picsum.photos/200?random=2",urlLink:"/",price:13},{name:"Daniel", description:"This is a description",imageLink:"https://picsum.photos/200?random=3",urlLink:"/",price:30}]}) => {
  const navigate = useNavigate();

  return (
    <div className='mx-5 sm:mx-10 lg:mx-20 h-fit'>
      <div className='w-full flex flex-col items-center'>

        <div className='flex flex-row justify-between w-full'>
          <h3 className='text-3xl max-sm:text-2xl'>
            {lineName}
          </h3>
          <button className='text-3xl max-sm:text-xl underline decoration' onClick={()=>{navigate("/products"); window.scrollTo(0, 0)}}>
            SEE ALL
          </button>
        </div>

        <div>

        </div>

        <div className='grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4 md:gap-2 w-full m-5 mt-12'>
          {
            products?.map((item, i)=>(
            <Card key={i} className="shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-500" onClick={()=>navigate(item.urlLink)}>
              <button className='relative rounded-lg transition-all transform hover:-translate-y-2 w-full'>
                <div style={{ backgroundImage: `url(${item.imageLink})`}} className='aspect-square bg-center flex flex-col items-center justify-evenly w-full rounded-lg bg-no-repeat bg-contain'>
                  
                </div>
                <div className='flex flex-col text-lg items-start w-11/12 m-5'>
                  <p className=' text-black'>
                    {item.name&&item.name}
                  </p>
                  <p className=' text-neutral-400 -mt-1 text-start'>
                    {item.description&&item.description}
                  </p>
                  <p className=' text-black mt-2'>
                    {item.price&& "From $" + item.price}
                  </p>
                </div>
              </button>
            </Card>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ProductLine