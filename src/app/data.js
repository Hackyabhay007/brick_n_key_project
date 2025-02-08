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


export const propertyType = [ { text: "Flat/Appartment", value: 'FlatApartment' }, { text: "Independent/Builder Floor", value: 'IndependentBuilderFloor' }, { text: "Independent House/Villa", value: 'IndependentHouseVilla' }, { text: "Residential Land", value: 'ResidentialLand' }, { text: "1 RK/ Studio Apartment", value: 'OneRKStudioApartment' }, { text: "Farm House", value: 'FarmHouse' }, { text: "Serviced Apartment", value: 'ServicedApartment' }, { text: "Other", value: 'Other' }];

export const bedrooms = [{ text: "1 RK/1 BHK", value: 'OneRK_OneBHK' }, { text: "2 BHK", value: 'TwoBHK' }, { text: "3 BHK", value: 'ThreeBHK' }, { text: "4 BHK", value: 'FourBHK' }, { text: "4+ BHK", value: 'FourPlusBHK' }];

export const constructionStatus = ['New Launch', 'Ready to move', 'Under Construction'];

export const brandData = ["Sobha", "Prestige", "Godrej", "Brigade", "Total Environmental"];


export const giveCorrectImage = (image) => {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    // console.log("This is the iamge value", image)
    const imagePath = image;

    // console.log("This is the Image Path", imagePath)

    // if (imagePath) {
    //     console.error(" Image path is missing:");
    // }

    // Ensure `imagePath` is a valid string before concatenating
    const imageUrl = imagePath ? `${baseUrl}${imagePath}` : "";

    return imageUrl
}

export const footerInfoArray = {
    description: "Welcome to Brick N Key, your trusted partner in real estate excellence. We specialize in luxury properties, new developments, and personalized property solutions. Our expert team combines local market knowledge with innovative technology to deliver exceptional real estate experiences across residential and commercial sectors.",
    socialLinks: [
        {
            id: 1,
            name: "Facebook",
            icon: "FaFacebook",
            link: "https://facebook.com"
        },
        {
            id: 2,
            name: "Twitter",
            icon: "FaTwitter",
            link: "https://twitter.com"
        },
        {
            id: 3,
            name: "Instagram",
            icon: "FaInstagram",
            link: "https://instagram.com"
        },
        {
            id: 4,
            name: "LinkedIn",
            icon: "FaLinkedin",
            link: "https://linkedin.com"
        }
    ],
    companyLinks: [
        {
            id: 1,
            title: "About Us",
            path: "/about"
        },
        {
            id: 2,
            title: "All Listing",
            path: "/listing?new=true"
        },
        {
            id: 3,
            title: "Master Map",
            path: "/map"
        },
        {
            id: 4,
            title: "Contact Us",
            path: "/contact"
        }
    ],
    subscribeText: "Subscribe to get latest property, blog news from us"
};