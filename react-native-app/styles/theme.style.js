import { Appearance } from "react-native";

export default {
    BACKGROUND_COLOR: Appearance.getColorScheme() === 'dark' ? '#222222' : 'white',
    CONTAINER_COLOR: Appearance.getColorScheme() === 'dark' ? '#303030' : '#F3F3F3',
    CONTENT_MODULE_COLOR: Appearance.getColorScheme() === 'dark' ? '#444' : '#E1E1E1',
    INPUT_COLOR: Appearance.getColorScheme() === 'dark' ? '#454545' : '#e9e9e9',
    INPUT_TEXT_COLOR: Appearance.getColorScheme() === 'dark' ? '#eeeeee' : 'black',
    TEXT_COLOR: Appearance.getColorScheme() === 'dark' ? '#eeeeee' : 'black'
};