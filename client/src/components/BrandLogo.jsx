import React from 'react';

const Logo = ({ dark = false }) => {
    return (
        <div className="flex items-center gap-4 group cursor-pointer">
            {/* Instafix Logo Image */}
            <img
                src="/instafix-logo.jpg"
                alt="Instafix Mobile Repairs Logo"
                className="w-16 h-16 rounded-full object-cover shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-[#b88746]/50"
            />

            <div className="flex flex-col gap-0.5">
                <span className="text-2xl font-black tracking-tight leading-none bg-gradient-to-br from-[#b88746] to-[#fdf5a6] bg-clip-text text-transparent">
                    Instafix
                </span>
                <span className={`text-[11px] font-extrabold tracking-[0.2em] uppercase ${dark ? 'text-[#b88746]' : 'text-[#b88746]'}`}>
                    Mobile Repairs
                </span>
            </div>
        </div>
    );
};

export default Logo;
