import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import RotatingTagline from './RotatingTaglines'

const Header = () => {
  const { setInput, input } = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setInput(inputRef.current.value)
  }

  const onClear = () => {
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 -z-10"></div>

      <div className="text-center pt-24 pb-16 px-4">
        <div className="inline-flex items-center justify-center gap-3 px-4 py-1.5 mb-6 bg-white/60 backdrop-blur-sm border border-primary/20 rounded-full text-sm text-primary font-semibold">
          <img src={assets.star_icon} className="w-4 h-4" alt="" />
          <p>AI Features Now Integrated!</p>
        </div>

        <RotatingTagline />
        <p className="my-8 max-w-2xl mx-auto text-base text-text-secondary">
          Every story matters, and PixelPen is where yours begins. Simple,
          elegant, and powerful - A space designed for words that last.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg mx-auto bg-white rounded-full shadow-lg p-2 focus-within:ring-2 focus-within:ring-primary transition-all"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for articles, topics, or writers..."
            required
            className="w-full pl-4 bg-transparent outline-none text-text-primary"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2.5 rounded-full hover:bg-primary/90 transition-colors cursor-pointer font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center pb-12">
        {input && (
          <button
            onClick={onClear}
            className="bg-white border border-gray-300 text-xs py-1.5 px-4 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
          >
            Clear Search: "{input}"
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;