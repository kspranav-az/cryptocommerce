import React from "react";

import Link from "next/link";

export default function Landingpage() {
    return (
        <div>
        <section id="1" className='h-screen'>
            <div className="h-[90%] w-full ">
                <img className='w-full h-[90%] absolute -z-2 ' src="/trust.png" alt="background" />
                <div className='absolute z-10 h-[100%] w-full flex flex-col items-start  justify-center gap-5 pl-16 '>
                    <h1 className='text-[6rem]'>
                        Global Market, Local
                        <br />
                        Trust
                    </h1>
                    <h1 className='text-2xl'>
                        Revolutionizing the way you buy and sell.
                    </h1>
                    
                    <div className=' h-10 w-40 border-2 flex items-center justify-center text-2xl' 
                        style={{ 
                        borderImage: 'linear-gradient(to right, #775CF0, #42457B) 1', 
                        borderRadius:'2rem'
                        }}>
                    Join us
                    </div>

                    
                </div>            
            </div>
        </section>
        <section id='2' className='h-screen w-full '>
            <div className='h-[100%] w-full flex gap-20 items-center justify-center' >
                <div className='h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5'>
                    <div className='h-[25%] flex items-center justify-start '>
                        <h1 className='text-2xl font-semibold'>
                            Building the Future of
                            <br />
                            <span style={{ color: '#775CF0' }}>Decentralized</span> Marketplace
                        </h1>
                    </div>

                    <div className=''>
                        <h1 className='text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Recusandae quod in delenit
                        </h1>
                    </div>
                    <div className=' h-[40rem] w-[40rem]  overflow-y-hidden flex justify-end items-center ' style={{ marginLeft: '-16vh', marginRight: '-20vh' }}>
                        <img src="/etherium.png" alt="" className='h-[30rem] w-[40rem] '/>
                    </div>
                        
                </div>
                <div className='h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5'>
                    <div className='h-[25%] flex items-center justify-start '>
                    <h1 className='text-2xl font-semibold'>
                            Secured & Seamless
                            <br />
                            Transfer through <span style={{ color: '#775CF0' }}>RFID</span> 
                        </h1>
                        
                    </div>

                    <div className=''>
                        <h1 className='text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Recusandae quod in delenit
                        </h1>
                    </div>
                    <div className=' h-full flex justify-end items-center pr-5 ' >
                        <img src="/RPID.png" alt="" className='h-max w-max '/>
                    </div>
                </div>
                <div className='h-[60%] w-[20%]  border-2 border-[#42457B] rounded-3xl overflow-hidden flex flex-col pl-5'>
                    <div className='h-[25%] flex items-center justify-start '>
                    <h1 className='text-2xl font-semibold'>
                            Secured & Seamless
                            <br />
                            Transfer through <span style={{ color: '#775CF0' }}>RFID</span> 
                        </h1>
                        
                    </div>

                    <div className=''>
                        <h1 className='text-sm'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br/> Recusandae quod in delenit
                        </h1>
                    </div>
                    <div className=' h-full flex justify-end items-center pr-5 ' >
                        <img src="/RPID.png" alt="" className='h-max w-max '/>
                    </div>
                </div>
            </div>
        </section>
        </div>
        
        
    )
}
