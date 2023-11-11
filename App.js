import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { PickerItem } from './src/Picker/index.';
import api from './src/services/api';

export default function App() {
  const [loading, setLoading] = useState(true)
  const [moedas, setMoedas] = useState([])
  const [moedaSelecionada, setMoedaSelecionada] = useState(null)
  const [moedaBValor, setMoedaBValor] = useState("")
  const [valorMoeda, setValorMoeda] = useState(null)
  const [valorConvertido, setValorConvertido] = useState(false)

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get("all")
      let arrayMoeda = []
      Object.keys(response.data).map((key) => {
        arrayMoeda.push({
          key: key,
          value: key,
          label: key
        })
      })

      setMoedas(arrayMoeda)
      setLoading(false)
      setMoedaSelecionada(arrayMoeda[0].key)

    }
    loadMoedas()
  }, [])

  async function converterMoeda() {

    if (moedaBValor === 0 || moedaBValor === "" || moedaSelecionada === null) {
      return
    }
    const resposta = await api.get(`/all/${moedaSelecionada}-BRL`)
    let resultado = (resposta.data[moedaSelecionada].ask * parseFloat(moedaBValor))
    setValorMoeda(resultado)
    setValorConvertido(true)
    Keyboard.dismiss()
  }

  if (loading) {
    return (
      <View style={styles.loading} >
        <ActivityIndicator
          color='#FFF'
          size="large"
        />
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.areaMoeda} >
          <Text style={styles.titulo} >Selecione sua moeda</Text>
          <PickerItem
            moedas={moedas}
            moedaSelecionada={moedaSelecionada}
            onChange={(moeda) => setMoedaSelecionada(moeda)}
          />
        </View>

        <View style={styles.areaValor} >
          <Text style={styles.titulo} >Digite um valor para converter em (R$) </Text>

          <TextInput
            placeholder=' Ex: 1.50'
            style={styles.input}
            keyboardType='numeric'
            value={moedaBValor}
            onChangeText={(valor) => setMoedaBValor(valor)}
          />
        </View>

        <TouchableOpacity style={styles.areaBotao} onPress={converterMoeda}>
          <Text style={styles.textoBotao} >Converter</Text>
        </TouchableOpacity>

        {valorConvertido !== false && (
          <View style={styles.resultado} >
            <Text style={styles.valorConvertido} >
              {moedaBValor + " " + moedaSelecionada}
            </Text>

            <Text style={{ fontSize: 18, margin: 8, fontWeight: '500', color: '#000' }} >
              Corresponde a
            </Text>

            <Text style={styles.valorConvertido} >
              {valorMoeda.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101215',
    paddingTop: 40,
    alignItems: 'center'
  },
  areaMoeda: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginBottom: 1
  },
  titulo: {
    fontSize: 16,
    color: "#000",
    fontWeight: '700',
    paddingLeft: 5,
    paddingTop: 5,
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#101215'
  },
  areaValor: {
    width: '90%',
    backgroundColor: "#f9f9f9",
    paddingTop: 8,
    paddingBottom: 8
  },
  input: {
    width: '100%',
    padding: 8,
    fontSize: 18,
    color: '#000'
  },
  areaBotao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FB4B50',
    width: '90%',
    height: 45,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  textoBotao: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  resultado: {
    width: '90%',
    backgroundColor: '#FFF',
    marginTop: 34,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  valorConvertido: {
    fontSize: 28,
    color: '#000',
    fontWeight: 'bold'
  }
});