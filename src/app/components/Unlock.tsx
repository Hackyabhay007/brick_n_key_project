export default function Unlock() {
    return (
        <>
            <div className="unlock_container bg-bgColor">
                <div className="unlock_inner_container relative w-[95%] h-[567px] rounded-[20px] mx-auto py-16 flex flex-col items-center gap-4" 
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url('/images/Unlock_img.png')`,
                        backdropFilter: 'blur(16px)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <h3 className="font-[600] text-[64px] leading-[78.02px] text-center">Unlock Your Dream Home Today!</h3>
                    <p className="font-[400] text-[36px] leading-[43.88px] w-[88%] mx-auto text-center">Join us on the journey to homeownership and discover the perfect place to call your own.</p>
                    <button className="w-[166px] h-[54px] flex justify-center items-center border-2 border-black rounded-[63px] text-[24px] leading-[29.26px] font-[500] mt-14">Call Now</button>

                    <h1 className="absolute -bottom-0 font-bold text-[150px] bg-opacity-90"
                        style={{
                                WebkitTextFillColor: 'transparent',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                backgroundImage: `url('/images/Unlock_img.png')`, // Same image as background
                                backgroundAttachment: 'fixed', // This ensures perfect alignment
                                backgroundSize: 'cover',
                                // backgroundPosition: 'end',
                        }}
                    >
                        BRICKLEY
                    </h1>
                </div>
            </div>
        </>
    )
}