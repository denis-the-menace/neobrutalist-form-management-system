import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Footer() {
  return (
    <footer className="z-50 absolute w-full bottom-0 text-secondary py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="flex justify-between items-center gap-4">
          <div className="text-sm pr-4">
            &copy; {new Date().getFullYear()} OBSS. All rights reserved.
          </div>
          <div className="space-x-4 text-sm flex">
            <a href="#" className="text-secondary hover:text-primary-dark">
              Privacy Policy
            </a>
            <a href="#" className="text-secondary hover:text-primary-dark">
              Terms and Conditions
            </a>
            <a href="#" className="text-secondary hover:text-primary-dark">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
