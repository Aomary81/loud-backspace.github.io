import React, {useState} from 'react';
import { TextInput, TouchableOpacity} from 'react-native';

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
        rounded,
        keyboardType,
        fontSize

    }) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <TouchableOpacity 
            activeOpacity={1}
            style={
                Object.assign
                (
                    {
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#F3F3F3',
                        borderRadius: !rounded ? 10 : 50,
                        borderColor: isFocused ? 'grey' : '#F3F3F3',
                        borderWidth: 2,
                        paddingHorizontal: 1
                    }, 
                    style
                )
            }>
            {startButton && <TouchableOpacity
                style={
                    { 
                        height: '80%', 
                        width: undefined, 
                        aspectRatio: 1,
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginLeft: '2%',
                        backgroundColor: 'green'
                    }
                }
                onPress={onStartPress}
            >
                {startButton}
            </TouchableOpacity>}
            <TextInput
                style={
                    {
                        height: '90%', 
                        width: '100%',
                        flexGrow: 1,
                        flexShrink: 1,
                        marginLeft: '2%',
                        marginRight: '2%',
                        outlineStyle: 'none',
                        fontSize: fontSize
                    }
                }
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
            />
            {endButton && <TouchableOpacity
                style={
                    { 
                        height: '80%', 
                        width: undefined, 
                        aspectRatio: 1,
                        justifyContent: 'center', 
                        alignItems: 'center',
                        marginRight: '2%',
                        backgroundColor: 'green'
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
