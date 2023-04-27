import React, {useState} from 'react';
import { TextInput, TouchableOpacity} from 'react-native';
import theme from '../../../styles/theme.style'

/**
This is the InputField component it comes in two main styles rounded and only slightly rounded.
To get the more rounded one pass true to rounded no need to pass false if not rounded. 
You can have a button at the start,the end, both or none. To get start button pass a valid 
component to startButton, to get the end button pass a valid component to endButton, to add on 
press pass the function to the onStartPress or onEndPress deppending on which one you have.
placeholder is placeholder text. value is only passed if you want a default or starter value.
onChangeText works how it normally does for textInput. style is used for sizing and placement.
//*/


const InputField = (
    { 
        style,
        value, 
        onChangeText, 
        placeholder, 
        startButton ,
        endButton, 
        onStartPress,
        onEndPress,
        startDisabled,
        endDisabled,
        rounded,
        keyboardType,
        onFocus,
        borderColor,
        secureTextEntry,
        onSubmitEditing,
        multiline=false

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
                        marginBottom: 10
                    }, 
                    style
                )
            }>
            {startButton && <TouchableOpacity
                activeOpacity={startDisabled ? 1 : 0.5}
                style={
                    { 
                        height: '80%', 
                        aspectRatio: 1,
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginLeft: height*0.4
                    }
                }
                onPress={onStartPress}
            >
                {startButton}
            </TouchableOpacity>}
            <TextInput
                style={
                    {
                        flexShrink: 1,
                        flexGrow: 1,
                        width: '80%',
                        marginLeft: '2%',
                        marginRight: '2%',
                        outlineStyle: 'none',
                        fontSize: style.fontSize || 20,
                        paddingHorizontal: height*0.25,
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
                onSubmitEditing={onSubmitEditing}
                multiline={multiline}
            />
            {endButton && <TouchableOpacity
                disabled={endDisabled ? 0.7 : 1}
                style={
                    { 
                        height: '80%', 
                        aspectRatio: 1,
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginRight: height*0.4
                    }
                }
                onPress={onEndPress}
            >
                {endButton}
            </TouchableOpacity>}
        </TouchableOpacity>
    );
};

export default InputField;
