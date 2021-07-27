import React, {Component} from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';
import Faq from './Faq'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../components/Colors';

export default class Lists extends Component { 
    
  constructor(props) {
    super(props);
    this.state = {
      menu :[
        { 
          title: 'Kenapa Enak?', 
          data: 'Karena ............................................',
        },
        { 
          title: 'Kenapa Murah?',
          data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        { 
         title: 'Kenapa Gratis Ongkir?',
         data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
          title: 'Kenapa Lagi Sih?',
          data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
        },
        { 
          title: 'Kenapa Enak?', 
          data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        { 
          title: 'Kenapa Murah?',
          data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        { 
         title: 'Kenapa Gratis Ongkir?',
         data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
          title: 'Kenapa Lagi Sih?',
          data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
        },
        { 
          title: 'Kenapa Enak?', 
          data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
        },
        { 
          title: 'Kenapa Murah?',
          data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.'
        },
        { 
         title: 'Kenapa Gratis Ongkir?',
         data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.'
        },
        { 
          title: 'Kenapa Lagi Sih?',
          data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire'
        },
      ]
     }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.button}>
          <TouchableOpacity>
              <LinearGradient
                  colors={['#bd1c2c', '#bd1c2c']}
                  style={styles.signIn}
              >
                  <Text style={styles.textSign}>LIHAT TUTORIAL</Text>
              </LinearGradient>
          </TouchableOpacity>
        </View> 
        <Text style={styles.title}>
          Frequently Asked Question
        </Text>
        <View style={styles.list}>
          { this.renderAccordians() }
        </View>
      </ScrollView>
    );
  }

  renderAccordians=()=> {
      const items = [];
      for (var item of this.state.menu) {
          items.push(
              <Faq 
                  title = {item.title}
                  data = {item.data}
              />
          );
      }
      return items;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#d9d9d9',
    // paddingTop:10,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  button: {
      alignItems: 'center',
      marginTop: 30
  },
  signIn: {
      width: 375,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flexDirection: 'row'
  },
  textSign: {
      fontSize: 25,
      color: 'white',
      fontWeight: 'bold'
  },
});