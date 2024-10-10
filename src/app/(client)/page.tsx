"use client"
import React from "react";
import Header from "./_component/header";
import Hero from "./_component/hero";
import SpecialProducts from "./_component/specialProducts";
import About from "./_component/about";
import NewsLetter from "./_component/newsletter";
import Footer from "./_component/footer";
import Products from "./_component/products";


const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <SpecialProducts />
            <About />
            <Products />
            <NewsLetter />
            <Footer/>
        </>
    );
};

export default HomePage;