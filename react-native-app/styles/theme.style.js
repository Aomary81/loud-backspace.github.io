import { Appearance } from "react-native";

export default {
    BACKGROUND_COLOR: Appearance.getColorScheme() === 'dark' ? '#333' : 'white',
    CONTAINER_COLOR: Appearance.getColorScheme() === 'dark' ? '#969696' : '#F3F3F3',
    CONTENT_MODULE_COLOR: Appearance.getColorScheme() === 'dark' ? '#787878' : '#E1E1E1',
    INPUT_COLOR: Appearance.getColorScheme() === 'dark' ? '#B4B4B4' : '#e9e9e9',
};