export const data = {
    header:{
        logo: './logo.svg',
        menu: [
        { text: 'Home', href: '#' },
        { text: 'Product', href: '#' },
        { text: 'Pricing', href: '#' },
        { text: 'Contact', href: '#' },
        ],
    },

    products: {
        imgSrc: 'https://placehold.co/320x400',
        title: 'Graphic Design',
        subtitle: 'English Department',
        price: {
          original: '$16.48', 
          discount: '$6.48'
        },
        colors: ["bg-primary", "bg-secondary", "bg-tertiary", "bg-dark-text"]
    },

    slides: [
      {
        id: 1,
        image: 'https://placehold.co/400x600',
        subtitle: 'SUMMER 2020',
        title: 'NEW COLLECTION',
        paragraph: 'We know how large objects will act, but things on a small scale.',
        buttonText: 'SHOP NOW',
      },
      {
        id: 2,
        image: 'https://placehold.co/400x600',
        subtitle: 'Fall 2020',
        title: 'Latest Trends',
        paragraph: 'Discover the latest trends in fashion and style.',
        buttonText: 'Explore Now',
      },
      {
        id: 3,
        image: 'https://placehold.co/400x600',
        subtitle: 'Winter 2020',
        title: 'Winter Collection',
        paragraph: 'Stay warm and stylish with our winter collection.',
        buttonText: 'View Collection',
      },
    ],

    footer: {
        logo: './logo.svg',
        socialMedia: ['./facebook.svg','./instagram.svg','./twitter.svg'],
        columns: [
        {
            title: 'Company Info',
            links: [
            { text: 'About Us', href: '#' },
            { text: 'Carrier', href: '#' },
            { text: 'We are hiring', href: '#' },
            { text: 'Blog', href: '#' },
            ],
        },
        {
            title: 'Legal',
            links: [
            { text: 'About Us', href: '#' },
            { text: 'Carrier', href: '#' },
            { text: 'We are hiring', href: '#' },
            { text: 'Blog', href: '#' },
            ],
        },
        {
            title: 'Features',
            links: [
            { text: 'Business Marketing', href: '#' },
            { text: 'User Analytic', href: '#' },
            { text: 'Live Chat', href: '#' },
            { text: 'Unlimited Support', href: '#' },
            ],
        },
        {
            title: 'Resources',
            links: [
            { text: 'IOS & Android', href: '#' },
            { text: 'Watch a Demo', href: '#' },
            { text: 'Customers', href: '#' },
            { text: 'API', href: '#' },
            ],
        },
        ],
    },
}