import React from 'react';
import { SectionList, StyleSheet, Text, View, Button } from 'react-native';
import TabBar from '../component/tabBar'

class HomeNavigator extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
      return (
        <View style={{ flex: 1, padding: 20}}>
            <View style={{ flex: 1}}>
                <SectionList
                    renderItem={({ item, index, section }) => <Text key={index} style={styles.item}>{item}</Text>}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    sections={[
                        { title: "Title1", data: ["item1", "item2"] },
                        { title: "Title2", data: ["item3", "item4"] },
                        { title: "Title3", data: ["item5", "item6"] },
                        { title: "Title3", data: ["item5", "item6"] },
                        { title: "Title3", data: ["item5", "item6"] },
                    ]}
                    keyExtractor={(item, index) => item + index}
                />
                <TabBar navigation={this.props.navigation} active='Home'/>
            </View>
        </View>
      );
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        color: 'red'
    },
})

export default HomeNavigator