"use client";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInput = {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required("İsim gerekli"),
  email: yup.string().email("Geçerli bir email girin").required("Email gerekli"),
  password: yup.string().required("Şifre gerekli"),
});

export default function Register() {
  const {
    control,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema)
  });
  
  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
  
  return (
    <main className="h-screen relative">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="hidden md:block relative col-span-1 h-full">
          <Image
            src="/login-hero.png"
            fill
            style={{ objectFit: "cover" }}
            alt="Register Hero"
          />
        </div>
        <div className="absolute md:relative inset-0 flex flex-col items-center justify-center p-4 z-10">
          <div className="w-full max-w-sm bg-white bg-opacity-90 md:bg-opacity-0 p-6 md:p-0 rounded-lg shadow-lg md:shadow-none">
            <div className="flex items-center justify-center mb-6">
              <Image
                src="/Logo.png"
                width={120}
                height={78}
                alt=""
              />
            </div>
            <div className="w-full flex flex-col my-4">
              <p className="text-gray-400 text-md md:text-xl">Hello</p>
              <p className="text-xl md:text-3xl font-bold">
                Register
              </p>
            </div>
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <label
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className={`block w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-1`}
                placeholder="John Doe" 
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mb-4">{errors.name.message}</p>
              )}
              <label
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <Controller
                control={control}
                name="email"
                render={({ field:{onChange,value}}) => (
                  <input
                    onChange={onChange}
                    defaultValue={value}
                    id="email"
                    className={`block w-full p-3 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg mb-1`}
                    placeholder="john@gmail.com"
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.email.message}
                </p>
              )}
              
              <label
                className="block text-md font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`block w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg mb-1`}
                placeholder="*********"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {errors.password.message}
                </p>
              )}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="mr-2"
                />
                <label htmlFor="remember-me" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>
              <button
                type="submit"
                className="w-full  my-4 py-4 px-4 text-lg text-white  bg-orange rounded-lg hover:bg-orange-light"
              >
                Register
              </button>
              <Link href="/login">
                <p className="blue border-custom text-center text-lg bg-white border-2 border-collapse border-black py-3 md:py-3 rounded-lg">
                  Login
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
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