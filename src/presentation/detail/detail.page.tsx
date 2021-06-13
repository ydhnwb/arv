import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ProductEntity } from '../../domain/product/entity';
import {StackNavigationProp} from '@react-navigation/stack';
import { TopNavigatorParamsList } from '../../../App';
import { RouteProp } from "@react-navigation/native";
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';



type DetailPageProps = {
    // product: ProductEntity,
    navigation: StackNavigationProp<TopNavigatorParamsList, 'detail'>
    route: RouteProp<TopNavigatorParamsList, 'detail'>;
}


export const DetailPage : React.FC<DetailPageProps> = (props) => {
    const dispatch = useDispatch()

    const onBuyPressed = () => {
        dispatch({ type: "ADD_TO_CART", payload: { 
            product: props.route.params
        }})
    }

    const onSeeCartPressed = () => {
        props.navigation.push("cart")
    }
    return (
        <ScrollView>
            <Image style={styles.imageCover} resizeMode="cover" source={{uri: props.route.params.image as string}}/>
            <View style={styles.content}>
                <Text style={styles.productName}>{props.route.params.name}</Text>
                <Text style={styles.productPrice}>Rp.{props.route.params.price}</Text>
                <Text style={styles.productDesc}>{props.route.params.desc}</Text>
                <View style={styles.butButton}>
                    <Button  title="Tambah ke keranjang" onPress={onBuyPressed}/>
                </View>

                <View style={styles.butButton}>
                    <Button  title="Keranjang saya" onPress={onSeeCartPressed}/>
                </View>

            </View>
        </ScrollView>
    )
} 


const styles = StyleSheet.create({
    imageCover: {
        height: 200
    },
    content: {
        padding: 16
    },
    productName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    productPrice: {
        marginBottom: 8
    },
    productDesc: {
        textAlign: "justify",
        fontSize: 14.5
    },
    butButton: {
        marginVertical: 8,
    }
})