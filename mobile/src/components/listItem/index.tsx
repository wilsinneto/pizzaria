import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { ItemProps } from "../../pages/Order";

interface DataItemProps {
  data: ItemProps;
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: DataItemProps) {
  function handleDeleteItem() {
    deleteItem(data.id)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.item}>{data.amount} - {data.name}</Text>

      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name="trash-2" color="#FF3F4b" size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101026",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: "#8a8a8a"
  },
  item: {
    color: "#FFF"
  }
})