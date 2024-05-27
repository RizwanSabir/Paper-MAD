import React from 'react';
import {
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView, ActivityIndicator,
    Platform, Pressable, Text, Button, Image, TextInput, View,
} from 'react-native';

import { useForm, Controller } from "react-hook-form"
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { styled } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { validate } from 'react-native-web/dist/cjs/exports/StyleSheet/validate';
import { auth, db } from '../Firebase/Firebase';
import { updateProfile } from "firebase/auth";

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledInput = styled(TextInput, {
    props: {
        placeholderTextColor: "color",
    }
})

export default function SignUp({ navigation }) {

    const {
        control,
        handleSubmit,
        getValues, watch, reset,
        formState: { errors, isValid, isLoading, isSubmitting },
    } = useForm({
        defaultValues: {
            Email: "",
            Password: "",
            ConfirmPassword: "",
            Name: ""

        },
    })

    const onSubmit = async (data) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.Email, data.Password);
            const user = userCredential.user;

            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                Name: data.Name,
                Email: data.Email,
                Password: data.Password
            });

            await updateProfile(auth.currentUser, {
                displayName: data.Name
            });
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainPage', params: { userData: { UserId: user.uid } } }]
            });


        } catch (error) {
            console.error("Error signing up or adding document: ", error);
        }
    }

    return (
        <SafeAreaView style={[styles.sav]}>
            <KeyboardAvoidingView keyboardVerticalOffset={50}
                style={[styles.keyboard]}
                behavior={Platform.select({ android: 'height', default: 'padding' })}>
                <ScrollView
                    style={[styles.scroll]}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled">

                    {isSubmitting ? (
                        <View className=' flex justify-center items-center h-full border-red-600' >
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.loadingText}>Signing Up...</Text>
                        </View>
                    ) :
                        <View className='  bg-white '>

                            <View className='flex flex-row justify-center'>
                                <StyledImage className='h-24 ' resizeMode='contain' source={require('../assets/img/Intersect.png')} />

                            </View>

                            <View className="flex flex-row justify-center  mt-8">
                                <StyledText style={{  }} className='text-5xl   mt-4 '> Let's Party!!! </StyledText>
                                <View className=' w-9'>
                                    <StyledImage style={{ width: 30 }} resizeMode='contain' source={require('../assets/img/Frame 38.png')} />
                                </View>
                            </View>

                            <View className=' m-3  mt-10 space-y-6 ' >

                                <Controller
                                    control={control}
                                    name="Name"
                                    rules={{
                                        required: "Name is required",


                                    }}

                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledInput onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} placeholder='Name' style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className='  border-2 rounded-3xl h-16  p-3 text-lg mt-6' />

                                    )}
                                />
                                {errors?.Name?.message ? <Text className='text-red-600 text-base'>{errors.Name.message}</Text> : ""}

                                <Controller
                                    control={control}
                                    name="Email"
                                    rules={{
                                        required: "Email is required",
                                        validate: validateEmailFormat
                                    }}

                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledInput onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} placeholder='Email' style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className=' border-2 rounded-3xl h-5  h-16  p-3 text-lg mt-6' />
                                    )}
                                />
                                {errors?.Email?.message ? <Text className='text-red-600 text-base'>{errors.Email.message}</Text> : ""}

                                <Controller
                                    control={control}
                                    name="Password"
                                    rules={{
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be atleast 8 characters"
                                        }
                                    }}

                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledInput onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} placeholder='Password' style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className=' border-2 rounded-3xl h-5  h-16  p-3 text-lg mt-6' />

                                    )}
                                />

                                {errors?.Password?.message ? <Text className='text-red-600 text-base'>{errors.Password.message}</Text> : ""}

                                <Controller
                                    control={control}
                                    name="ConfirmPassword"
                                    rules={{
                                        required: "Confirm Password is required !",
                                        validate: (value) => {
                                            if (value !== getValues().Password) return "Password doesn't match !"
                                        }
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <StyledInput onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value} placeholder='Confirm Password' style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className=' border-2 rounded-3xl h-5  h-16  p-3 text-lg mt-6' />

                                    )}
                                />
                                {errors?.ConfirmPassword?.message ? <Text className='text-red-600 text-base'>{errors.ConfirmPassword.message}</Text> : ""}

                            </View>

                            <View className='flex flex-col items-end  mr-6 mt-4'>
                                <StyledPressable onPress={handleSubmit(onSubmit)} style={{ borderColor: "rgba(157, 217, 229, 1)" }} className=' border-4   p-3 rounded-2xl  px-6 active:bg-cyan-500'>
                                    <StyledText className=' text-base'>Sign Up</StyledText>
                                </StyledPressable>
                                <StyledPressable onPress={() => {
                                    navigation.navigate('Login')
                                }} className=' mr-3 mt-3'>
                                    <StyledText className=' text-lg text-blue-700'>Already have an account? Login</StyledText>
                                </StyledPressable>
                            </View>

                        </View>
}

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const validateEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) || "Email is not in correct format.";
};


const styles = StyleSheet.create({
    sav: {
        flex: 1,
        backgroundColor: "white"
    },
    scroll: {
        overflow: 'visible',
    },
    keyboard: {
        flex: 1,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});