import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ProductEntity } from '../../../domain/product/entity';


type ProductItemProps = {
    product: ProductEntity,
    onProductTap: Function
}

export function ProductItemComponent(props: ProductItemProps) {
    const { } = props;
    return (
        <TouchableOpacity onPress={() => props.onProductTap(props.product)}>
            <View style={styles.itemRoot}>
                <Image source={{uri: props.product.image as string}} style={styles.itemImage} resizeMode="cover"/>
                <View style={styles.itemTextContent}>
                    <Text style={styles.itemTitle}>{props.product.name}</Text>
                    <Text>Rp.{props.product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    itemRoot: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.1,
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginHorizontal: 8,
        marginVertical: 4,
        flex: 1,
        flexDirection: 'row'
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8
    },
    itemTextContent: {
        flex: 1,
        alignSelf: 'center',
        alignItems: 'stretch',
        flexDirection: "column",
        marginStart: 16,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    itemPrice: {

    }
})