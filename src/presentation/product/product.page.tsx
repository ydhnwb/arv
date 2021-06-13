import { Either, isLeft } from 'fp-ts/lib/Either';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { map } from 'rxjs/operators';
import { container } from 'tsyringe';
import { Failure } from '../../domain/common/base';
import { ProductEntity } from '../../domain/product/entity';
import { GetAllProductUseCase } from '../../domain/product/usecase/get_all_product.usecase';
import { ProductItemComponent } from './component/product_item.component';
import {StackNavigationProp} from '@react-navigation/stack';
import { TopNavigatorParamsList } from '../../../App';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';



export interface ProductPageProps {
    navigation: StackNavigationProp<TopNavigatorParamsList, 'product'>
}

export const ProductPage : React.FC<ProductPageProps> = (props) => {
    const dispatch = useDispatch()
    const [products, setProducts] = React.useState<ProductEntity[]>([])
    const prodInstance = container.resolve(GetAllProductUseCase);

    const fetchProducts = () => {
        console.log(prodInstance instanceof GetAllProductUseCase);
        prodInstance.getAllProducts().subscribe((result: Either<Array<ProductEntity>, Failure>) => { 
            console.log(typeof result)  
            if(isLeft(result)){
                updateProducts(result.left)
            }else{
                console.log("An error occured")
            }
        })

    }


    const updateProducts = (products: Array<ProductEntity>) => {
        setProducts(products);
    }

    const onProductTap = (selectedProduct: ProductEntity) => {
        props.navigation.push("detail", selectedProduct)
    }

    const onCartPressed = () => {
        props.navigation.navigate("cart")
    }

    const onSignOutPressed = async () => {
        try{
            dispatch({ type: "CLEAR_AUTH" })
            await auth().signOut()
        }catch(e){
            console.log(`Cannot signout ${e}`)
        }

    }

    const productListHeader = () => {
        return <View style={styles.flatListHeader}>
            <View style={styles.headerTextContent}>
                <Text style={styles.headerTitle}>Belanja sepuasnya</Text>
                <Text>Nikmati pengalaman berbelanja yang mudah, cepat dan murah!</Text>
            </View>

            <View style={styles.cartContent}>
                <TouchableOpacity onPress={() =>onSignOutPressed()}>
                    <View style={styles.cart}>
                        <Image style={styles.cartImage} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLFM-VL6FAiL6cgX3H8DUB0cYBCJ4iLi0JFMzisivmtZbDEUxF4cQbfJq2PC0UBzvBTPE&usqp=CAU" }}/>                
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() =>onCartPressed()}>
                    <View style={styles.cart}>
                        <Image style={styles.cartImage} source={{ uri: "https://i.pinimg.com/originals/15/4f/df/154fdf2f2759676a96e9aed653082276.png" }}/>                
                    </View>
                </TouchableOpacity>

            </View>


        </View>
    }



    React.useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <View>
            <FlatList
                ListHeaderComponent={productListHeader}
                data={products}
                keyExtractor={ (item) => item.id.toString()}
                renderItem={ ({item}) => (
                    <ProductItemComponent key={item.id.toString()} product={item} onProductTap={onProductTap}/>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    flatListHeader : {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 8,
        paddingVertical: 16
    },
    headerTitle: {
        fontWeight: "700",
        fontSize: 24
    },
    headerTextContent: {
        flex: 1,
        flexDirection: "column"
    },
    cart :{
        marginStart: 8,
        width: 38,
        height: 38,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 40,
        padding: 8,
    },
    cartImage: {
        alignSelf: 'center',
        height: 24,
        width: 24
    },
    cartContent: {
        flexDirection: 'row'
    }
})


