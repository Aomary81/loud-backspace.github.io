import React, {useState} from 'react';
import { TextInput, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme.style'

/**
The Input area is just a multi-line input area currently there are no buttons or anything but may be 
added as needed. Be aware on mobile there may be no way to edit the keyboard and you may need to either
provide a button or some other method to dismiss keyboard. placeholder is the placeholder text, 
onChangeText works the same as textInput. style is used for sizing and placement.
//*/

const InputArea = (
    { 
        style,
        value, 
        fontSize,
        onChangeText, 
        placeholder, 
        rounded,
        keyboardType,
        onFocus,
        borderColor,
        secureTextEntry

    }) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        onFocus ? onFocus() : null;
    }

    let height = style.height ? style.height : 50;

    return (
        <TouchableOpacity 
            activeOpacity={1}
            style={
                Object.assign
                (
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: theme.INPUT_COLOR,
                        borderRadius: !rounded ? 8 : 50,
                        borderColor: borderColor || (isFocused ? 'dodgerblue' : 'transparent'),
                        borderWidth: 2,
                        paddingHorizontal: 3,
                        color: theme.TEXT_COLOR,
                        padding: 5,
                        marginBottom: 10
                    }, 
                    style
                )
            }>
            <TextInput
                style={
                    {
                        width: '100%',
                        height: '100%',
                        outlineStyle: 'none',
                        fontSize: fontSize,
                        color: theme.TEXT_COLOR,
                        paddingHorizontal: 5,
                        paddingVertical: 0,
                        fontSize: style.fontSize || 20,
                        margin: 5,
                        color: style.color,
                    }
                }
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                onFocus={() => { setIsFocused(true), handleFocus()}}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                multiline={true}
            />
        </TouchableOpacity>
    );
};

export default InputArea;
