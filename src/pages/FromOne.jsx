import { TextField } from "@mui/material";
import React from "react";

const FormOne = () => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://codebuddy.review/submit", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           emailId: "john.doe@gmail.com",
  //           password: "QWerty##11",
  //           firstName: "John",
  //           lastName: "Doe",
  //           address: "22/B, Baker Street, London - 10089",
  //           countryCode: "+91",
  //           phoneNumber: "2225550909",
  //         }),
  //       });

  //       const jsonData = await response.json();
  //       setData(jsonData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // console.log(data);

  return (
    <React.Fragment>
      <form>
        <TextField
          label="Email"
          type="email"
          //   value={email}
          //   onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          size="small"
          variant="outlined"
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          size="small"
          variant="outlined"
          required
        />
      </form>
    </React.Fragment>
  );
};
export default FormOne;
