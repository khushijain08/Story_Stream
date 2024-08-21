import Base from "../components/Base"
import userContext from "../context/userContext";
const Services=()=>
{
    return(
        <userContext.Consumer>
            {
                (user)=>(
                    <Base>
        <h1>This is services Page</h1>
        <h1>Welocme {user.user.login && user.user.data.name}</h1>
        </Base>
                )
            }
        </userContext.Consumer>
    )
}

export default Services;