import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteDetailParams = {
  FinishOrder: StackParamsList["FinishOrder"]
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, "FinishOrder">

export default function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  if (!route.params.number) return

  async function handleFinish() {
    if (!route.params.order_id) {
      return alert("Não possui o ID do pedido.")
    }

    try {
      await api.put("/order/send", null, {
        params: {
          order_id: route.params.order_id
        }
      })

      navigation.popToTop()
    } catch (error) {
      console.log("Erro ao finalizar, tente mais tarde: ", error)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.alert}>Você deseja finalizar esse pedido?</Text>
      <Text style={styles.title}>Mesa { route.params.number }</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={20} color={"#1d1d2e"} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center"
  },
  alert: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 12
  },
  button: {
    backgroundColor: "#3fffa3",
    flexDirection: "row",
    width: "65%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: "#1d1d2e"
  }
})