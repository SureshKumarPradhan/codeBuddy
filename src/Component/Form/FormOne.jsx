import { TextField } from "@mui/material"
import React from "react"


const FormOne = () => {
    return(
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
    )
}
export default FormOne