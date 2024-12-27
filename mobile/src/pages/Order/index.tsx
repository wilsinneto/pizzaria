import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/listItem";

type RouteDetailsParams = {
  Order: {
    number: string | number;
    order_id: string;
  }
}

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
}

export type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailsParams, "Order">

export default function Order() {
  const route = useRoute<OrderRouteProps>()
  const navigation = useNavigation()

  const [category, setCategory] = useState<CategoryProps[]>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps>()
  const [products, setProducts] = useState<ProductProps[]>([])
  const [productSelected, setProductSelected] = useState<ProductProps>()
  const [items, setItems] = useState<ItemProps[]>([])
  const [amount, setAmount] = useState('1')
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)
  const [modalProductVisible, setModalProductVisible] = useState(false)

  useEffect(() => {
    async function loadInfo() {
      const { data } = await api.get("/category")

      setCategory(data)
      setCategorySelected(data[0])
    }

    loadInfo()
  }, [])

  useEffect(() => {
    async function loadProducts() {
      if (!categorySelected) return

      const { data } = await api.get("/category/product", {
        params: {
          category_id: categorySelected.id
        }
      })

      setProducts(data)
      setProductSelected(data[0])
    }

    loadProducts()
  }, [categorySelected])

  async function handleCloseOrder() {
    if (!route.params) return

    try {
      await api.delete("/order", {
        params: {
          order_id: route.params.order_id
        }
      })

      navigation.goBack()
    } catch (error) {
      console.log('error', error)
    }
  }

  async function handleAdd() {
    try {
      const { data } = await api.post("/item", {
        order_id: route.params.order_id,
        product_id: productSelected?.id,
        amount: Number(amount)
      })

      const payload = {
        id: data.id,
        product_id: productSelected?.id,
        name: productSelected?.name,
        amount
      } as ItemProps

      setItems(oldArray => [...oldArray, payload])  
    } catch (error) {
      console.log('error', error)
    }
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item)
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params && route.params.number}</Text>

        {!items.length && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={28} color="#FF3F4B" />
          </TouchableOpacity>
        )}
      </View>

      {categorySelected && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>
            { categorySelected.name }
          </Text>
        </TouchableOpacity>
      )}

      {productSelected && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalProductVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>
            { productSelected.name }
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor="#F0F0F0"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={handleAdd}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: !items.length ? 0.3 : 1 }]}
          disabled={!items.length}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ListItem data={item} />}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItems={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItems={handleChangeProduct}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#FFF",
    marginRight: 14
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: "auto",
    height: 40,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#FFF",
    fontSize: 20
  },
  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  qtdText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF"
  },
  actions: {
    flexDirection: "row",
    width: "auto",
    justifyContent: "space-between"
  },
  buttonAdd: {
    width: "20%",
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#3fffa3",
    borderRadius: 4,
    height: 40,
    width: "75%",
    alignItems: "center",
    justifyContent: "center"
  }
})