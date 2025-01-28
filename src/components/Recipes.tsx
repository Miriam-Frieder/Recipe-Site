import { Provider } from "react-redux"
import store from "../store/store"
import RecipeList from "./RecipeList"


const Recipes = () => {
    return (
        <>
            <Provider store={store}>
                <RecipeList />
            </Provider>
        </>
    )
}
export default Recipes