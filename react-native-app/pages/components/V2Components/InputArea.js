import React, {useState} from 'react';
import { TextInput, TouchableOpacity} from 'react-native';

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
        placeholder,
        onChangeText, 
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
                        borderRadius: 10,
                        borderColor: isFocused ? 'grey' : '#F3F3F3',
                        borderWidth: 2,
                        paddingHorizontal: 3,
                    }, 
                    style
                )
            }>
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
                multiline={true}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
                textAlignVertical={'top'}
            />
        </TouchableOpacity>
    );
};

export default InputArea;