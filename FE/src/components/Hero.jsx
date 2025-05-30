import React from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative w-full flex justify-center">
      {/* Ảnh nền */}
      <img
        className="w-full max-w-[1200px] h-auto object-cover"
        src={assets.banerrealfinal}
        alt="bannerrealfinal"
      />

      {/* Nội dung nằm trên ảnh */}
      <div className="absolute top-0 right-0 flex flex-col items-end justify-center text-white bg-black bg-opacity-30 w-full max-w-[1200px] h-full pr-16">
        <div className="flex items-center justify-center gap-2 mb-2 mt-8">
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
          <p className="font-bold text-sm md:text-base">
            DISCOVER YOUR NEW ADDICTION
          </p>
          <p className="w-8 md:w-11 h-[2px] bg-white"></p>
        </div>

        <div className="text-right leading-snug">
          <h1 className="font-bold prata-regular text-4xl lg:text-6xl text-white">
            Mineral Based
          </h1>
          <h2 className="font-semibold prata-regular text-3xl lg:text-5xl text-white mt-2">
            Makeup Products
          </h2>
        </div>

        <NavLink
          to="/collection"
          className="inline-block mt-4 px-6 py-2 border border-white text-sm font-medium tracking-wide transition duration-300 text-white hover:bg-white hover:text-black"
        >
          SHOP NOW &gt;
        </NavLink>
      </div>
    </div>
  )
}

export default Hero
