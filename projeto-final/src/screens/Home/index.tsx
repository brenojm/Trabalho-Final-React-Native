import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import Coca from "../../assets/images/coca.png";
import Vodka from "../../assets/images/vodka.png";
import Vodkalimao from "../../assets/images/vodka2.png";
import Coca2 from "../../assets/images/coca2.png";
import Bebida3 from "../../assets/images/desconhecido.jpeg";
import Cordeirinho from "../../assets/images/Cordeirinho.png";
import { buscaListaProdutos } from "../../services/api";
import { ContextoCarrinho } from "../../context/CarrinhoContext";
import { TokenContext } from "../../context/TokenContext";

interface ProdutosImagens {
  id: string;
  image: Document;
}
export interface Produtos {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  url: string;
  quantidade?: number;
}


export const Home = ({ navigation }) => {
  const [produtoImg, setProdutoImg] = useState<ProdutosImagens[]>([
    {
      id: "1",
      image: Coca2,
    },

    {
      id: "2",
      image: Vodkalimao,
    },
    {
      id:"3",
      image: Bebida3
    }
  ]);

  const [produtos, setProdutos] = useState([]);
  const [produtoSelect, setProdutoSelect] = useState<Produtos>({
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    url: "",
  });

  const setListaDeProdutos = useContext(ContextoCarrinho).adicionaItensCarrinho;
  const listaDeProdutosCarrinho = useContext(ContextoCarrinho).listaDeProdutos;
  const retiraItemCarrinho = useContext(ContextoCarrinho).retiraItemCarrinho;
  const [listaDeProdutosNova, setListaDeProdutosNova] = useState(
    listaDeProdutosCarrinho
  );

  const listaDeProdutos: Produtos = {
    id: 0,
    nome: "",
    descricao: "",
    preco: 0,
    url: "",
  };

  useEffect(() => {
    buscaListaProdutos()
      .then((res) => {
        setProdutos(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }, []);

  function lidaBotao(produto: Produtos) {
    setListaDeProdutos(produto);
  }

  return (
    <LinearGradient style={styles.gradient} colors={["#37A8D9", "#E1F0F6"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.textProduto}>Promoções:</Text>
          </View>
          <View>
            <Image source={Cordeirinho} style={styles.cordeirinho} />
          </View>
        </View>

        <View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={produtoImg}
            renderItem={({ item }) => (
              <View style={styles.viewImg}>
                <Image source={ item.image } style={styles.img} /> 
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.viewProdutos}>
          <FlatList
            numColumns={2}
            data={produtos}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.buttonProdutos}
                onPress={() =>
                  navigation.navigate("Produto", { produto: item })
                }
              >
                <ImageBackground
                  source={{ uri: item.url }}
                  style={styles.imgMenor}
                >
                  <TouchableOpacity onPress={() => lidaBotao(item)}>
                    <Image
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
                      }}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </ImageBackground>
                <View>
                  <Text style={[{ fontWeight: "bold" }]}>R$ {item.preco}</Text>
                  <Text>{item.nome}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </LinearGradient>
  );
};
