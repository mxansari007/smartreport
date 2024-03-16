import React, { useState} from "react";
import LabTestCard from "../components/LabTestCard.jsx";
import { test } from "../testname.js";
function TestPage({handleCart}) {
 return (
  <>
      <div className="flex flex-wrap justify-center items-center gap-20 ">
               {test.map((tests) => (
          <LabTestCard
            key={tests.id}
            test={tests}
            handleCart={handleCart}
          />
        ))}
      </div>
    </>
  );
}

export default TestPage;
