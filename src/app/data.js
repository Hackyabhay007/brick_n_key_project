







export const navbarData = [
    {
        navLogo : "/images/Nav_logo.png",
        navLogo_link : "/",
        
        navLink_Data : [
            {
                title : "Home",
                link : "/"
            },
            {
                title : "Luxury",
                link : "/"
            },
            {
                title : "New",
                link : "/"
            },
            {
                title : "Master Map",
                link : "/map"
            },
        ]
    }
]


export const giveCorrectImage = (image) => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    const imagePath = image;

    // console.log("This is the Image Path", imagePath)

    // if (imagePath) {
    //     console.error(" Image path is missing:");
    // }

    // Ensure `imagePath` is a valid string before concatenating
    const imageUrl = imagePath ? `${baseUrl}${imagePath}` : "";

    return imageUrl
}