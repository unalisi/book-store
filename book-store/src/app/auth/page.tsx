"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";

//Form giriş tiplerini tanımlarız.
type FormInput = {
  identifier: string;
  password: string;
  name?: string;
};

//Form Doğrulama şemasını tanımlarız.
const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .email("Geçerli bir email girin")
    .required("Email gerekli"),
  password: yup
    .string()
    .required("Şifre gerekli")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .matches(/[A-Z]/, "En az bir büyük harf içermelidir")
    .matches(/[a-z]/, "En az bir küçük harf içermelidir")
    .matches(/[0-9]/, "En az bir rakam içermelidir"),
});

//loginSchema’ya ek olarak isim alanının zorunlu olduğunu belirtiriz ve registerda kullanırız.
const registerSchema = loginSchema.shape({
  name: yup.string().required("İsim gerekli"),
});


export default function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const schema = isLoginMode ? loginSchema : registerSchema;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
        const response = await axios.post('http://localhost:1337/api/auth/local',data)
        if(response.status ===200){
          console.log(response.data)
          localStorage.setItem('token',response.data.jwt)
        }
    }catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    reset({
      identifier: "",
      password: "",
      name: "",
    });
  }, [reset, isLoginMode]); //Mod değişince formu sıfırlarız.

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode); //Login - Register değişikliği yaptığımız yer.
  };

  return (
    <main className="h-screen relative">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="hidden md:block relative col-span-1 h-full">
          <Image
            src="/login-hero.png"
            fill
            style={{ objectFit: "cover" }}
            alt="Auth Hero"
          />
        </div>
        <div className="absolute md:relative inset-0 flex flex-col items-center justify-center p-4 z-10">
          <div className="w-full max-w-sm bg-white bg-opacity-90 md:bg-opacity-0 p-6 md:p-0 rounded-lg shadow-lg md:shadow-none">
            <div className="flex items-center justify-center mb-6">
              <Image src="/Logo.png" width={120} height={78} alt="Logo" />
            </div>
            <div className="w-full flex flex-col my-4">
              <p className="text-gray-400 text-md md:text-xl">
                {isLoginMode ? "Welcome back!" : "Create an account"}
              </p>
              <p className="text-xl md:text-3xl font-bold">
                {isLoginMode ? "Login to your account" : "Register for an account"}
              </p>
            </div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              {!isLoginMode && (
                <>
                  <label className="block text-md font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  {/*Her Controller sahip oldugu inputun deger ve dogrulamasını yapar.*/}
                  <Controller
                    control={control}
                    name="name"
                    defaultValue=""
                    render={({ field }) => (
                      <input
                        {...field}
                        id="name"
                        className={`block w-full p-3 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg mb-1`}
                        placeholder="John Doe"
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mb-4">
                      {errors.name.message}
                    </p>
                  )}
                </>
              )}

              <label className="block text-md font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Controller
                control={control}
                name="identifier"
                defaultValue=""
                
                render={({ field }) => (
                  <input
                    {...field}
                    id="email"
                    className={`block w-full p-3 border ${
                      errors.identifier ? "border-red-500" : "border-gray-300"
                    } rounded-lg mb-1`}
                    placeholder="john@gmail.com"
                  />
                )}
              />
              {errors.identifier && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.identifier.message}
                </p>
              )}

              <label className="block text-md font-medium text-gray-700 mb-2">
                Password
              </label>
              <Controller
                control={control}
                name="password"
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="password" 
                    id="password"
                    className={`block w-full p-3 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg mb-1`}
                    placeholder="••••••••"
                  />
                )}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </p>
              )}

              {isLoginMode && (
                <div className="flex items-center mb-4">
                  <input type="checkbox" id="remember-me" className="mr-2" />
                  <label className="text-sm text-gray-700">Remember Me</label>
                </div>
              )}
              
              {/*İlk Butonum formun gönderilmesini sağlar ve formun moduna göre (login veya register) dinamik olarak değişir.*/}
              <button
                type="submit"
                className="w-full my-8 py-4 px-4 text-lg text-white bg-orange rounded-lg hover:bg-orange-light"
              >
                {isLoginMode ? "Login" : "Register"}
              </button>
              
              {/*İkinci butonum formlar arasında geçiş için kullanılır.*/}
              <button
                type="button"
                onClick={toggleMode}
                className="w-full blue border-custom text-center text-lg bg-white border-2 border-black py-3 md:py-3 rounded-lg"
              >
                {isLoginMode ? "Register" : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/*Mobile Background görselim. */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/login-hero.png"
          fill
          style={{ objectFit: "cover" }}
          alt="Background"
          className="blur-sm"
        />
      </div>
    </main>
  );
}