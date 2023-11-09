"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import signUpPicMobile from "../../public/assets/images/illustration-sign-up-mobile.svg";
import signUpPicDesktop from "../../public/assets/images/illustration-sign-up-desktop.svg";
import listPic from "../../public/assets/images/icon-list.svg";
import successPic from "../../public/assets/images/icon-success.svg";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

type Inputs = {
  email: string;
};

const defaultValues: Inputs = {
  email: "",
};

const userSchema = yup.object({
  email: yup.string().email("Valid email required").trim().required(),
});

export default function Home() {
  const [emailPassed, setEmailPassed] = useState<Inputs>(defaultValues);
  const {
    // register,
    control,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultValues,
    resolver: yupResolver(userSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // console.log(data);
    setEmailPassed(data);
  };

  const backToFirstPage = () => {
    setEmailPassed(defaultValues);
    reset(defaultValues);
  };

  return (
    <main
      className={`${roboto.className} w-full sm:bg-[var(--Charcoal-Grey)] text-[16px] sm:text-[14px]`}
    >
      {emailPassed.email === "" ? (
        <div className="h-screen flex justify-center sm:items-center sm:p-4">
          <div className="w-[375px] sm:w-fit sm:flex flex-row-reverse bg-white sm:rounded-[30px]">
            <div className="imageBlock sm:p-6">
              <Image
                className="sm:hidden"
                src={signUpPicMobile}
                alt="illustration-sign-up-mobile"
                priority
              />
              <Image
                className="hidden sm:block w-[400px] h-full object-cover object-right rounded-[15px]"
                src={signUpPicDesktop}
                alt="illustration-sign-up-desktop"
                priority
              />
            </div>
            <div className="contentBlock sm:w-[532px] sm:flex justify-center items-center p-6 md:pl-12">
              <div className="flex flex-col gap-6 sm:gap-4">
                <h1 className="text-[2.5em] sm:text-[3.1em] font-bold">
                  Stay updated!
                </h1>
                <p>
                  Join 60,000+ product managers receiving monthly updates on:
                </p>
                <div className="listBlock flex flex-col gap-4 sm:gap-2">
                  <div className="list flex items-start gap-4">
                    <Image src={listPic} alt="icon-list" />
                    <p>Product discovery and building what matters</p>
                  </div>
                  <div className="list flex items-start gap-4">
                    <Image src={listPic} alt="icon-list" />
                    <p>Measuring to ensure updates are a success</p>
                  </div>
                  <div className="list flex items-start gap-4">
                    <Image src={listPic} alt="icon-list" />
                    <p>And much more!</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="w-full flex justify-between text-sm font-bold my-2">
                    <label htmlFor="emailInput">Email address</label>
                    {errors.email && (
                      <p className="text-sm text-[var(--Tomato)]">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        placeholder="email@company.com"
                        className={`w-full text-sm rounded-lg p-6 py-4 mb-6 sm:mb-4 cursor-pointer ${
                          !errors.email
                            ? "border border-[var(--Grey)]"
                            : "border-2 border-[var(--Tomato)] bg-red-100 text-[var(--Tomato)] font-bold"
                        }`}
                        {...field}
                      />
                    )}
                  />

                  <input
                    type="submit"
                    className="w-full rounded-lg bg-[var(--Dark-Slate-Grey)] text-white p-6 py-4
                    hover:bg-gradient-to-r from-rose-500 to-[var(--Tomato)] hover:shadow-xl hover:shadow-rose-500/50
                    "
                    value={"Subscribe to monthly newsletter"}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center sm:items-center">
          <div className="w-[375px] sm:w-[400px] sm:h-fit bg-white sm:block flex flex-col justify-between p-6 sm:p-10 sm:bg-white sm:rounded-[30px]">
            <div className="py-24 sm:p-0 sm:pb-6">
              <Image src={successPic} alt="icon-list" width={65} />
              <h1 className="text-[2.5em] sm:text-[3.1em] font-bold leading-10 sm:leading-none my-10 sm:my-6">
                Thanks for subscribing!
              </h1>
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-bold">{emailPassed.email}</span>. Please
                open it and click the button inside to confirm your
                subscription.
              </p>
            </div>
            <div>
              <button
                onClick={() => backToFirstPage()}
                className="w-full rounded-lg bg-[var(--Dark-Slate-Grey)] text-white p-6 py-4
                hover:bg-gradient-to-r from-rose-500 to-[var(--Tomato)] hover:shadow-xl hover:shadow-rose-500/50
                "
              >
                Dismiss message
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
