import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    barcode: {
        width: '34.5%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    name: {
        width: '12%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    nameBrand: {
        width: '16.5%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    presentation: {
        width: '16%',
        textAlign: 'right',
        paddingRight: 8,
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price_in: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.idproducto}>
            <Text style={styles.barcode}>{item.barcode}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.nameBrand}>{item.nameBrand}</Text>
            <Text style={styles.presentation}>{item.presentation}</Text>
            <Text style={styles.price_in}>{item.price_in}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow