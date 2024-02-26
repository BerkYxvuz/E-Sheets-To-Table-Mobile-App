import React, { useState } from 'react';
import { View, Text, TouchableOpacity,  ScrollView, Dimensions,} from 'react-native';
import axios from 'axios';
import { Table, Row, Rows } from 'react-native-table-component';

const Example: React.FC = () => {
    const [Sheet, SetSheet] = useState([[]]);

    return(
      <View style={{flex: 1}}>
        <View style={{width: 'auto', backgroundColor: '#212121', height: 50, elevation: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={ReadSheet} 
          style={{
          width: 45, 
          height: 45, 
          backgroundColor: 'black', 
          borderRadius: 100, 
          alignItems: 'center',
          justifyContent: 'center',}}><Text style={{color: 'white', fontWeight: 'bold'}}>Load</Text></TouchableOpacity>
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#171717', flex: 1}}>

          <ScrollView style={{ marginTop: 15}}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "gray"}}>
            <Row
               data={["Person","Age","Title"]}
               style={{ height: 30, backgroundColor: "#404258"}}
               textStyle={{ textAlign: "center", fontWeight: "bold" , color: 'white', fontSize: 11}}
            />
            <Rows data={Sheet} textStyle={{ textAlign: "center" , color: 'white', fontSize: 13}} style={{ minWidth: Dimensions.get('window').width - 50}} />
         </Table>

          </ScrollView>
        </View>
      </View>
    );

    async function ReadSheet(){
    
        const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvVtCr5coxNazufFNV1RXVqifOoOEwJsXFRwh9-q7R3ZxAugWIkdZtSlX5TmUffIE-id6a3MifRZB5/pub?gid=0&single=true&output=csv';
    
        axios.get(csvUrl)
          .then((response: any) => {
            var data = response.data.split("\n");
    
            const list = data.map((row: string) => {        
              // Veriyi virgüllerden ayırırken tırnak içindekileri dikkate almayacağız
              const splitRow = row.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
            
              // Her bir parçadaki baştaki ve sondaki tırnak işaretlerini kaldırıyoruz
              const trimmedRow = splitRow.map((item) => item.replace(/^"|"$/g, ''));
          
              // Son elemanın "\ işaretini kaldıralım
              if (trimmedRow.length > 0) {
                  const lastItem = trimmedRow[trimmedRow.length - 1];
                  // Eğer son elemanda "\ varsa, bu karakteri kaldıralım
                  trimmedRow[trimmedRow.length - 1] = lastItem.replace(/"/, '');
              }
            
              return trimmedRow;
          });        
          SetSheet(list);
          })
          .catch((error: any) => {
            console.log(error);
          });
      };
      
}
export default Example;
