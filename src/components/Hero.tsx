import React from 'react'

const Hero = () => {
  return (
    <div className='min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4'>
      <div className='flex flex-col flex-center gap-4'>

        <p>IT'S TIME TO GET</p>
        <h1 className='uppercase font-semibold text-4xl sm:text-5xl md-text-6xl lg:text-7xl'>SWOLE<span className='text-blue-400'>NORMOUS</span></h1>
        <p className='text-sm md:text-base font-light'>I hereby acknowledge that I may become <span className='text-blue-400 font-medium'>unbelievably swolenormous</span> and accept all risks of becoming the local <span className='text-blue-400 font-medium'>mass monstrosity</span>, afflicted with severe body dismorphia, unable to fit through doors.</p>

        <button className='px-8 py-4 rounded-md border-blue-400 border-[2px] bg-slate-950 border-solid blueShadow'>
          <p>Accept & Begin</p>
        </button>
      </div>
    </div>
  )
}

export default Hero
