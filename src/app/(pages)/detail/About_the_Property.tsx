




export default function About_the_Property({propertyDescription, propertyAddress}:{propertyDescription:string, propertyAddress:string}){
    return(
        <>
            <div className="About_the_Property_container w-full">
                <div className="about_the_property_inner_container w-[90%] mx-auto pb-16 flex flex-col gap-3">
                    <h3 className="font-[700] text-[36px] leading-[43.88px] tracking-[0.01em]">About the Property</h3>
                    <p className="font-[700] text-xl leading-[39.01px] tracking-[0.01em]"><span className="font-[400] leading-[39.01px] tracking-[0.005em]">Address: </span>{propertyAddress || ""}</p>
                    <p className="font-[400] text-2xl max-lg:text-xl text-black text-opacity-50 leading-[36.8px] tracking-[0.01em]">{propertyDescription || ""} <span className="text-bgRed">read more...</span></p>
                </div>
            </div>
        </>
    )
}