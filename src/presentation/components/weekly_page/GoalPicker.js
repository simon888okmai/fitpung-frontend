import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const GoalPicker = ({ target, setTarget }) => {
    // Generate numbers for picker (e.g. 0 to 500, step 10)
    const pickerItems = Array.from({ length: 51 }, (_, i) => i * 10);

    return (
        <View style={{ height: 150, width: '100%', overflow: 'hidden' }}>
            <Picker
                selectedValue={target}
                onValueChange={(itemValue) => setTarget(itemValue)}
                itemStyle={{
                    color: 'white',
                    fontSize: 32,
                    fontFamily: 'LINESeedSans-Bold',
                    height: 150
                }}
                dropdownIconColor="white"
                style={{ color: 'white' }}
            >
                {pickerItems.map((val) => (
                    <Picker.Item key={val} label={`${val}`} value={val} />
                ))}
            </Picker>
        </View>
    );
};

export default GoalPicker;
