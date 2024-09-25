import Link from 'next/link';
import Image from 'next/image';

const CommonFooter = () => {
    return (
        <footer className="bg-gray-800 text-white py-2 flex flex-col sm:flex-row justify-center sm:justify-between gap-2 sm:gap-0 pr-2 pl-2">
            <div className="flex justify-center  items-center space-x-4">
                <p className="sm:mr-auto">&copy; {new Date().getFullYear()} CryptoVisions. All Rights Reserved.</p>
                
            </div>
            <div className="flex flex-col items-center justify-center space-x-4">
                <div>
                <p>CryptoVision@vitstudent.ac.in</p>
                </div>
               <div className='w-[20rem] p-2'>
               <h1 className='w-full bg-white h-[1px]'/>
               </div>

                <div className='flex justify-evenly w-full'>
                    <Link href="#">
                        <Image src="/static/img/Instagram_Glyph_Gradient.png" alt="Instagram" width={32} height={32} />
                </Link>
                <Link href="#">
                        <Image src="/static/img/LI-In-Bug.png" alt="LinkedIn" width={38} height={35} />
                </Link>
                <Link href="#">
                    
                        <Image src="/static/img/Facebook_Logo_Primary.png" alt="Facebook" width={32} height={32} />
                </Link>
                </div>
                
            </div>
        </footer>
    );
};

export default CommonFooter;
