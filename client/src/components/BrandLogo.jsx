import React from 'react';

const Logo = ({ dark = false }) => {
    // Gold gradient classes
    const goldGradient = "bg-gradient-to-br from-[#b88746] to-[#fdf5a6]";
    const textGoldGradient = "bg-gradient-to-br from-[#b88746] to-[#fdf5a6] bg-clip-text text-transparent";

    return (
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-12 h-12">
                {/* Outer rotating gold accent */}
                <div className={`absolute inset-0 ${goldGradient} rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-[#b88746]/30`}></div>

                {/* Inner black box */}
                <div className={`absolute inset-0 bg-[#EDEADE] rounded-xl flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 border border-[#b88746]/30`}>
                    <span className={`text-3xl font-black ${textGoldGradient} italic`}>J</span>
                </div>
            </div>

            <div className="flex flex-col">
                {/* JEKA Text - Black in light mode, Gold in dark mode */}
                <span className={`text-2xl font-black tracking-tight leading-none ${textGoldGradient}`}>
                    JEKA
                </span>
                {/* Subtitle - Muted gold/grey */}
                <span className={`text-xs font-bold tracking-[0.2em] uppercase ${dark ? 'text-[#b88746]' : 'text-[#b88746]'}`}>
                    Mobile & Repair Shop
                </span>
            </div>
        </div>
    );
};

export default Logo;
