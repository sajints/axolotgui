// import { createBrowserHistory } from "history";
// export default createBrowserHistory();
// ----
import { useNavigate } from "react-router-dom";

const history = () => {
    const navigate = useNavigate(); // <-- use hook in component
  
    return (
      <div>
        Here
      </div>
    )
  }
  export default history;
