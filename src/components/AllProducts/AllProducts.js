import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const [products, setProducts]=useState([])
  const [limit,setLImit]=useState(5)
  const [pageNumber, setPageNumber]=useState(0);
  const [totalPage, setTotalPage]=useState(1);

  console.log(totalPage)

  useEffect(()=>{
   (async()=>{
    const {data}=await axios.get(`http://localhost:5000/products?limit=${limit}&pageNumber=${pageNumber}`);
    if(!data.success){
      return toast(data.error);
    }
    const totalPage=parseInt(data.count/limit);
    setTotalPage(totalPage);
    setProducts(data.data);
    })();
  },[limit,pageNumber])
  
  
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mx-12">
    <table class="w-screen  text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    price
                </th>
               
                <th scope="col" className="px-6 py-3">
                    image
                </th>
                <th scope="col" className="px-6 py-3">
                    edit
                </th>
                <th scope="col" className="px-6 py-3">
                    edit
                </th>
                
                
            </tr>
        </thead>
        <tbody>
        {
          products.map(product=>{
            return  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
               {product.name}
            </th>
            <td className="px-6 py-4">
              {product.price}
            </td>
            <td class="px-6 py-4">
              <img className='w-20' src={product.image} alt="" />
            </td>
            <td class="px-6 py-4">
             <p>eidit</p>
            </td>
           
            
        </tr>
          })
        }
        </tbody>
    </table>
    <div className='flex'>
      {
        [...Array(totalPage).keys()].map(page=><div onClick={()=>setPageNumber(page)} className='border border-black px-4 mx-2 my-5'>
          {page+1}
        </div>)
      }
      <select onChange={(e)=>setLImit(e.target.value)}>
        <option value="2">2</option>
        <option selected value="5">5</option>
        <option value="10">10</option>
      </select>
    </div>
</div>
  );
};

export default AllProducts;