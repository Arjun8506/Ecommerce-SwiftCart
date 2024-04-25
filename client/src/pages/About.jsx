import React from 'react'

const About = () => {

  const aboutPageData = [
    {
      h1: "About SwiftCart",
      p: "Welcome to SwiftCart, your destination for premium shopping experiences online. Founded with a passion for delivering convenience, quality, and style, SwiftCart has quickly become a trusted name in the world of ecommerce."
    },
    {
      h1: "Our Story",
      p: "At SwiftCart, we believe that shopping should be effortless and enjoyable. Our journey began with a simple idea: to create an online platform where customers can discover a curated selection of high-quality products from the comfort of their homes. What started as a vision has now evolved into a thriving ecommerce destination, serving customers across the globe."
    },
    {
      h1: "Our Mission",
      p: "Our mission at SwiftCart is to redefine the online shopping experience. We're committed to providing our customers with access to the finest products, exceptional customer service, and a seamless shopping journey from start to finish. Whether you're searching for the latest fashion trends, cutting-edge gadgets, or everyday essentials, we've got you covered."
    },
    {
      h1: "Quality and Ethos",
      p: "Quality is at the heart of everything we do. We meticulously handpick each product in our collection, partnering with trusted brands and suppliers to ensure excellence in craftsmanship and design. From sustainable materials to ethical production practices, we prioritize integrity and authenticity in every aspect of our business."
    },
    {
      h1: "Meet the Team",
      p: "Behind SwiftCart is a dedicated team of passionate individuals who share a common goal: to exceed customer expectations at every turn. From our product curators to our customer support specialists, each member of the SwiftCart team is committed to delivering exceptional service and creating memorable shopping experiences for our valued customers."
    },
    {
      h1: "Contact Us",
      p: "Have a question or feedback? We'd love to hear from you! Get in touch with the SwiftCart team via email, phone, or social media. Our dedicated support team is here to assist you with any inquiries and ensure that your SwiftCart experience is nothing short of exceptional."
    },
    {
      h1: "Thank You",
      p: "Thank you for choosing SwiftCart as your preferred online shopping destination. We're honored to be a part of your shopping journey and look forward to serving you for years to come."
    }
  ]

  return (
    <div className='pt-24 w-full min-h-screen px-2'>
      
      {aboutPageData.map((data, index) => (
        <div className= {`flex flex-col text-white pb-5 items-center ${index === 6 && ""}`} key={index}>
          <h1 className='mb-4 uppercase font-bold text-xl text-purple-500'>{data.h1}</h1>
          <p className='text-center'>{data.p}</p>
        </div>
      ))}

    </div>
  )
}

export default About