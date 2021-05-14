import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import WelcomeScreen from "../screens/WelcomeScreen";
import ChooseCategoryScreen from "../screens/ChooseCategoryScreen";
import ShowImagesFromApi from "../screens/ShowImagesFromAPI";
import ISSPositionScreen from "../screens/ISSPositionScreen";


const screens = {
    Home: {
        screen: WelcomeScreen
    },
    CategoriesList: {
        screen: ChooseCategoryScreen
    },
    ShowImages: {
        screen: ShowImagesFromApi
    },
    ISSPositionScreen: {
        screen: ISSPositionScreen
    }
};

const HomeStack = createStackNavigator(screens);
HomeStack.defaultProps = {
    headerMode: 'none',
};

export default createAppContainer(HomeStack);