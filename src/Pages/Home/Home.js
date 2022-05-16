import React from "react";
import Banner from "./Banner";
import ContactUs from "./ContactUs";
import Info from "./Info";
import MakeAppointment from "./MakeAppointment";
import Services from "./Services";
import Tesrimonials from "./Tesrimonials";
import Footer from "../Shared/Footer";

const Home = () => {
  return (
    <div>
      <Banner />
      <Info></Info>
      <Services></Services>
      <MakeAppointment></MakeAppointment>
      <Tesrimonials></Tesrimonials>
      <ContactUs></ContactUs>
      <Footer></Footer>
    </div>
  );
};

export default Home;
