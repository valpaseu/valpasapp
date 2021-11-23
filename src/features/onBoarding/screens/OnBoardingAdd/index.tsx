import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, TextInput, Button, View } from "react-native"
import { DataStore } from '@aws-amplify/datastore';
import { Test } from 'models';

const OnBoardingAdd = () => {

    const [addTitle, setTitle] = React.useState("")
    const [addText, setText] = React.useState("")
    const [addTextTitle, setTextTitle] = React.useState("")

    const [addTitleCheck, setTitleCheck] = React.useState("")

    const [addTextCheck, setTextCheck] = React.useState("")
    const [addTextTitleCheck, setTextTitleCheck] = React.useState("")


    const addTitleFunc = async () => {

        if (addTitle !== "") {

            const fTitle = await DataStore.query(Test)

            if (!fTitle.map(q => q.title).includes(addTitle)) {

                await DataStore.save(
                    new Test({
                        "title": addTitle,
                        "data": []
                    })
                )

                setTitleCheck(`New item named "${addTitle}" added`)
            } else {

                setTitleCheck("Try another name")

            }

        } else { setTitleCheck("Empty") }

    }


    const addTextFunc = async () => {

        const onBoarding = await DataStore.query(Test)

        if (addText !== "" && addTextTitle !== "") {

            if (onBoarding.map(t => t.title).includes(addTextTitle)) {

                if (!onBoarding.find(ttt => ttt.title === addTextTitle).data.includes(addText)) {
                    
                    await DataStore.save(
                        Test.copyOf(onBoarding.find(tt => tt.title === addTextTitle), updated => {
                            updated.data.push(`${addText}`)
                        })
                    );

                    setTextCheck("Added"); setTextTitleCheck("")

                } else { setTextCheck("Text already in"); setTextTitleCheck("") }

            } else { setTextTitleCheck("Title not found"); setTextCheck("") }

        } else { setTextCheck("Fill text form"); setTextTitleCheck("Fill title form") }
    }


    const rmAllTitle = async () => {

        const modelToDelete = await DataStore.query(Test);

        if (modelToDelete.length !== 0) {

            for (let i = 0; i < modelToDelete.length; i++) {

                DataStore.delete(modelToDelete[i]);

                console.log(` Items in array ${modelToDelete.length}`)

            }

        } else console.log("Array empty")

    }


    const showTest = async () => {
        const models = await DataStore.query(Test);
        console.log(models);
    }


    return (
        <SafeAreaView style={{ margin: 10 }}>

            {/* 
            
            Add title form 
            
            */}

            <View style={{ borderWidth: 3, padding: 10, borderRadius: 10 }}>
                <Text style={{ fontSize: 28, textAlign: "center" }}>Add title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(t) => setTitle(t)}
                    value={addTitle}
                />
                <Text>{addTitleCheck}</Text>
                <SafeAreaView style={{ justifyContent: "flex-end", width: 100 }}>
                    <Button
                        color="#00adef"
                        title="Add"
                        onPress={() => addTitleFunc(addTitle)}
                    />
                </SafeAreaView>
            </View>


            {/* 
            
            Add text form 
            
            */}

            <View style={{ borderWidth: 3, padding: 10, borderRadius: 10, marginTop: 40 }}>
                <Text style={{ fontSize: 28, textAlign: "center" }}>Add text</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(t) => setTextTitle(t)}
                    value={addTextTitle}
                />
                <Text>{addTextTitleCheck}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(t) => setText(t)}
                    value={addText}
                />
                <Text>{addTextCheck}</Text>
                <SafeAreaView style={{ justifyContent: "flex-end", width: 100 }}>
                    <Button
                        color="#00adef"
                        title="Add"
                        onPress={() => addTextFunc()}
                    />
                </SafeAreaView>
            </View>


            {/*
            
            Delete all title 
            
            */}

            <View style={styles.button}>
                <Button
                    color="#Ffffff"
                    title="Delete Test"
                    onPress={rmAllTitle} />
            </View>


            {/* 
            
            Show title 
            
            */}

            <View style={styles.button}>
                <Button
                    color="#ffffff"
                    title="Show test"
                    onPress={showTest} />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 5,
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 2,
    },
    button: {
        marginTop: 5,
        marginRight: 40,
        marginLeft: 40,
        backgroundColor: "#00adef",
        borderRadius: 10
    }
});

export default OnBoardingAdd