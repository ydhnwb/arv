import React from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ProductEntity } from '../../domain/product/entity';
import { GlobalState } from '../common/state';
import { ProductItemCartComponent } from './component/product_item_cart.component';


export interface CartPageProps {}

export const CartPage : React.FC<CartPageProps> = (props) => {
    const carts = useSelector<GlobalState, ProductEntity[]>((state: any)=> state.globalStateReducer.carts)
    const dispatch = useDispatch()

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART"})
    }

    const ask = () =>
    Alert.alert(
      "Bayar",
      "Bayar semua item di keranjang belanja?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "BAYAR SEMUA", onPress: () => clearCart() }
      ]
    );

    return (
        <View style={styles.root}>
            <FlatList
                data={carts}
                keyExtractor={ (item, i) => i.toString()}
                renderItem={ ({item, index}) => (
                    <ProductItemCartComponent key={index} product={item}/>
                )}
            />
            <View style={styles.bottomButton}>
                <Button title="Bayar semua" onPress={() => ask()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    bottomButton: {
        bottom: 0
    }
})