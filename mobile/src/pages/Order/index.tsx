import { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { api } from "../../services/api";
import { ModalPicker } from "../../components/ModalPicker";

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

type OrderRouteProps = RouteProp<RouteDetailsParams, "Order">

export default function Order() {
  const route = useRoute<OrderRouteProps>()
  const navigation = useNavigation()

  const [category, setCategory] = useState<CategoryProps[]>([])
  const [categorySelected, setCategorySelected] = useState<CategoryProps>()
  const [amount, setAmount] = useState('1')
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  useEffect(() => {
    async function loadInfo() {
      const { data } = await api.get("/category")

      setCategory(data)
      setCategorySelected(data[0])
    }

    loadInfo()
  }, [])

  async function handleCloseOrder() {
    try {
      await api.delete("/order", {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack()
    } catch (error) {
      console.log('error', error)
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params && route.params.number}</Text>

        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash-2" size={28} color="#FF3F4B" />
        </TouchableOpacity>
      </View>

      {category.length && (
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalCategoryVisible(true)}
        >
          <Text style={{ color: "#FFF" }}>
            { categorySelected && categorySelected.name }
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: "#FFF" }}>Pizza de calabresa</Text>
      </TouchableOpacity>

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
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

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