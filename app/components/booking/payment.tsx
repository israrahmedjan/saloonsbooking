import React from "react";
import Cart from "./Cart";
import CustomerForm from "./form";
import Cartform from "./cartForm";

function Payment() {
  
  return (
    <div className="">
      {/* <div className="grid grid-cols-1 gap-8 lg:grid-cols-[70%_30%]"> */}
        <div>
          <CustomerForm />
        </div>

        <div className="lg:sticky lg:top-6 h-fit">
          {/* <Cartform /> */}
        </div>
      </div>
    
  );
}

export default Payment;