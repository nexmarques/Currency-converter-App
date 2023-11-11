import React from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export function PickerItem(props){
    let moedasItem = props.moedas.map( (item, index) => {
        return <Picker.Item  key={index} value={item.key} label={item.key} />
    })

    return(
        <View>
            <Picker 
                selectedValue={props.moedaSelecionada}
                onValueChange={(valor) => props.onChange(valor)}
            >            
                {moedasItem}
                
            </Picker>

        </View>
    )
}