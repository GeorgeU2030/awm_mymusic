import React from 'react'


const MainMenu = () => {
  return (
    <div className='flex flex-col md:flex-row'>
  <section className='bg-secondary h-[87vh] w-full md:w-1/2 flex justify-center'>
   <div style={{ marginTop: '3rem' }}>
   <img src="src/images/headphone.png" alt="Imagen de auriculares" className='rounded-md border w-60 h-60'/>
   <div className="bg-alternative p-4 rounded-md mt-4 flex flex-col">
  <div className="font-bold font-init bg-gray-50 text-yellow-600 mb-2 ml-1 text-xl rounded-md border">1. Músico </div>
  <div className="font-bold font-init bg-gray-50 text-gray-600 mb-2 ml-1 rounded-md border">2. Músico </div>
  <div className="font-bold font-init bg-gray-50 text-amber-900 mb-8 ml-1 rounded-md border">3. Músico </div>
  
  <button className='border-gray-100 text-white bg-red-500 ml-6 font-init rounded-md' style={{width:'10rem'}}>See Ranking</button>
    </div>
   </div>
  </section>
  <section className='bg-base3 h-[87vh] w-full md:w-1/2 flex justify-center'>
  <div style={{ marginTop: '2.5rem' }} >
    <div className="bg-alternative p-4 rounded-md mt-4 flex flex-col justify-center w-60 ml-12">
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Song</button>
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Musician</button>
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md' style={{width:'10rem'}}>Add Points</button>
  </div>

  <div className='bg-secondary flex flex-row mt-10 '>
  <img src="src/images/headphones.png" alt="Imagen de auriculares" className='rounded-md border w-28 h-28'/>
  <img src="src/images/headphones.png" alt="Imagen de auriculares" className='rounded-md border w-28 h-28 ml-1'/>
  <img src="src/images/headphones.png" alt="Imagen de auriculares" className='rounded-md border w-28 h-28 ml-1'/>
  </div>

  <div className='mt-5 ml-16'>
  <button className='border-gray-100 text-white bg-red-500 mt-5 ml-6 mb-4 font-init rounded-md py-2' style={{width:'10rem'}}>Awards</button>
  </div>
    </div>
  </section>
</div>
  )
}

export default MainMenu