import { View, StyleSheet, Text, Pressable, Image, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { styled } from 'nativewind'


import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm, Controller } from "react-hook-form"
import { validatePathConfig } from '@react-navigation/native'
import { auth } from '../Firebase/Firebase'
import { signInWithEmailAndPassword } from "firebase/auth";




const StyledPressable = styled(Pressable)
const StyledText = styled(Text)
const StyledImage = styled(Image)
const StyledInput = styled(TextInput, {
    props: {
        placeholderTextColor: "color",
    }
})



const LoginPage = ({ navigation }) => {




    const {
        control,
        handleSubmit,
        getValues, watch, reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            Email: "",
            Password: "",

        },
    })

    const onSubmit = (data) => {


        signInWithEmailAndPassword(auth, data.Email, data.Password)
            .then((userCredential) => {
                navigation.reset({
                    index: 0,
                    routes: [{
                        name: 'MainPage'
                    }]
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error is " + errorMessage);
            });


    }


    return (

        <View className='  bg-white h-full'>
            <SafeAreaView>
                <View className='flex-row justify-center '>
                    <StyledImage resizeMode='contain' source={require('../assets/img/Intersect.png')} />
                </View>


                <View className="flex flex-row justify-center  mt-8">
                    <StyledText style={{  }} className='text-5xl   mt-4'> Let's Party!!! </StyledText>
                    <View className=' w-9'>
                        <StyledImage style={{ width: 30 }} resizeMode='contain' source={require('../assets/img/Frame 38.png')} />
                    </View>
                </View>


                <View className=' m-3 mt-10 ' >

                    <Controller
                        control={control}
                        name="Email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: " /^[^\s@]+@[^\s@]+\.[^\s@]+$/",
                                message: "Email is not in correct format."
                            }

                        }}


                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledInput placeholder='Email' onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className='  border-2 rounded-3xl h-16  p-3 text-lg' />

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
                                message: "Password must be atleast 8"
                            }

                        }}


                        render={({ field: { onChange, onBlur, value } }) => (
                            <StyledInput onBlur={onBlur}
                                onChangeText={onChange}
                                value={value} placeholder='Password' style={{ backgroundColor: "rgba(245, 245, 245, 1)" }} className=' border-2 rounded-3xl h-5  h-16  p-3 text-lg mt-6' />
                        )}
                    />
                    {errors?.Password?.message ? <Text className='text-red-600 text-base'>{errors.Password.message}</Text> : ""}


                </View>


                <View className='flex flex-col items-end  mr-6 mt-4'>
                    <StyledPressable onPress={handleSubmit(onSubmit)} style={{ borderColor: "rgba(157, 217, 229, 1)" }} className=' border-4   p-3 rounded-2xl  px-6 active:bg-cyan-500'>
                        <StyledText className=' text-base'>Login</StyledText>
                    </StyledPressable>
                    <StyledPressable onPress={() => {
                        navigation.navigate('SignUp')
                    }} className=' mr-3 mt-3'>
                        <StyledText className=' text-lg text-blue-700'>SignUp</StyledText>
                    </StyledPressable>
                </View>

            </SafeAreaView>
        </View>

    )
}





export default LoginPage