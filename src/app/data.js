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
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://147.93.106.161:1337";
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

export const contactPageData = {
    hero: {
        title: "Contact Us",
        description: "Let's connect and discuss how we can help you find your perfect property."
    },
    contactInfo: [
        {
            type: "email",
            value: "Info@Snappy.io",
            href: "mailto:Info@Snappy.io",
            icon: "Mail"
        },
        {
            type: "phone",
            value: "321-221-231",
            href: "tel:321-221-231",
            icon: "Phone"
        }
    ],
    infoCards: [
        {
            icon: "HeadphonesIcon",
            title: "Customer Support",
            description: "24/7 support team ready to assist with your queries"
        },
        {
            icon: "MessageSquare",
            title: "Feedback",
            description: "Your input shapes our continuous improvement"
        },
        {
            icon: "Newspaper",
            title: "Media Inquiries",
            description: "Press contact: Media@Snappyapp.com"
        }
    ]
};

export const aboutPageData = {
    hero: {
        title: ["Unlock Your", "Dream Home Today!"],
        callButton: {
            text: "Call Now",
            link: process.env.NEXT_PUBLIC_TELEPHONE_NO
        }
    },
    mainSection: {
        backgroundImage: "/images/about_us_img_1.png",
        title: "About Us",
        features: [
            {
                title: "Experienced Agents",
                description: "Our highly skilled agents bring years of expertise in real estate, ensuring successful transactions and satisfied clients.",
                icon: {
                    viewBox: "0 0 24 24",
                    path: "M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"
                }
            },
            {
                title: "Wide Range of Properties",
                description: "Discover an extensive collection of residential and commercial properties, from luxurious homes to affordable apartments for every budget.",
                icon: {
                    viewBox: "0 0 24 24",
                    path: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
                }
            },
            {
                title: "Customer Satisfaction",
                description: "We go above and beyond to ensure our clients receive exceptional service and find their perfect property match.",
                icon: {
                    viewBox: "0 0 24 24",
                    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                }
            },
            {
                title: "Affordable Prices",
                description: "Find your dream property within your budget through our competitive pricing and flexible payment options.",
                icon: {
                    viewBox: "0 0 24 24",
                    path: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                }
            }
        ],
        rightImage: {
            src: "/images/about_us_img_2.png",
            alt: "About Us"
        }
    }
};