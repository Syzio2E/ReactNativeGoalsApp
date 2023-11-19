import { FlatList, StyleSheet, View,Button } from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [courseGoal, setCourseGoals] = useState([]);
  const [modalisVisible,setModalisVisible] = useState(false)

  function startAddGoalHandler(){
    setModalisVisible(true)
  }
   
  function endGoalHandler(){
    setModalisVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prev) => [
      ...prev,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
    endGoalHandler()
  }

  

  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals)=>{
      return currentCourseGoals.filter((goal)=>goal.id !==id)
    })
   
  }

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color='#5e0acc' onPress={startAddGoalHandler}/>
     <GoalInput onAddGoal={addGoalHandler} visible={modalisVisible} onCancel={endGoalHandler}/>
      <View style={styles.goalContainer}>
        <FlatList
          data={courseGoal}
          renderItem={(itemData) => {
            return <GoalItem text={itemData.item.text} onDeleteItem={deleteGoalHandler} id={itemData.item.id}/>;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor:'#1e085a'
  },
  
  goalContainer:{
    flex:5
  },
});
