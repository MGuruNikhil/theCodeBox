import React from 'react'

const Logo = () => {
    return (
        <div className='logo flex gap-2.5 items-center justify-center flex-nowrap whitespace-nowrap cursor-pointer'>
            <img className='w-[40px] h-[40px]' src="/box.png" alt="codeBox" />
            <div className='logoText flex flex-col'>
                <span className='text-[large] font-black'>TheCodeBox</span>
                <span className='text-[x-small] font-light'>Bloging website for programmers</span>
            </div>
        </div>
    )
}

export default Logo;
