import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-gray-900 text-gray-300">
      <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={assets.pp2}
                alt="logo"
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-4xl text-white font-black">PixelPen</h1>
            </div>
            <p className="max-w-md text-gray-400 text-sm leading-relaxed">
              PixelPen is a modern blogging platform designed to give writers a
              voice and readers a place to discover meaningful stories.
            </p>
          </div>

          {/* Footer Links */}
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-700">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 py-6 flex flex-col sm:flex-row justify-between items-center text-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            Copyright © {new Date().getFullYear()} PixelPen. All Rights Reserved.
          </p>
          <p className="text-sm text-gray-500">
            Created And Developed by <span className="font-semibold text-gray-400">Shivansh Joshi</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;