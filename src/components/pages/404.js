import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px'}}>This page does not exist</p>
            <Link 
                style={{'display': 'block','textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' ,'marginTop': '30px'}}
                to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;