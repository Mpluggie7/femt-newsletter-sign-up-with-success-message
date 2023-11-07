"use client";
import { Roboto } from "next/font/google";
import Image from "next/image";
import signUpPicMobile from "../../public/assets/images/illustration-sign-up-mobile.svg";
import signUpPicDesktop from "../../public/assets/images/illustration-sign-up-desktop.svg";
import listPic from "../../public/assets/images/icon-list.svg";
import successPic from "../../public/assets/images/icon-success.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  email: string;
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [emailPassed, setEmailPassed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setEmailPassed(true);
  };

  // console.log(watch("email"));

  const handleInput = (value: string) => {
    errors.email && reset();
    setEmailText(value);
  };

  const backToFirstPage = () => {
    setEmailPassed(false);
    setEmailText("");
    reset();
  };

  return (
    <main
      className={`${roboto.className} w-[375px] md:w-[1440px] md:bg-[var(--Charcoal-Grey)]`}
    >
      {!emailPassed && (
        <div className="h-[842px] md:h-[1080px] md:flex justify-center items-center">
          <div className="md:flex flex-row-reverse bg-white md:rounded-[30px]">
            <div className="imageBlock md:p-6">
              <Image
                className="md:hidden"
                src={signUpPicMobile}
                alt="illustration-sign-up-mobile"
                priority
              />
              <Image
                className="hidden md:block"
                src={signUpPicDesktop}
                alt="illustration-sign-up-mobile"
                priority
              />
            </div>
            <div className="contentBlock md:w-[480px] md:flex justify-center items-center p-6 md:p-10 md:pl-16">
              <div className="flex flex-col gap-6">
                <h1 className="text-[2.5em] md:text-[3.5em] font-bold">
                  Stay updated!
                </h1>
                <p>
                  Join 60,000+ product managers receiving monthly updates on:
                </p>
                <div className="listBlock flex flex-col gap-4">
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
                    <label htmlFor="emailInput" className="">
                      Email address
                    </label>
                    {errors.email && (
                      <p className="text-sm text-[var(--Tomato)]">
                        Valid email required
                      </p>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="email@company.com"
                    className={`w-full text-sm rounded-lg p-6 py-4 mb-4 cursor-pointer
                ${
                  !errors.email
                    ? "border border-[var(--Grey)]"
                    : "border-2 border-[var(--Tomato)] bg-red-100 text-[var(--Tomato)] font-bold"
                }
                `}
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                    onChange={(e) => handleInput(e.target.value)}
                    value={emailText}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-[var(--Dark-Slate-Grey)] text-white p-6 py-4
                    hover:bg-gradient-to-r from-rose-500 to-[var(--Tomato)] hover:shadow-xl hover:shadow-rose-500/50
                    "
                  >
                    Subscribe to monthly newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {emailPassed && (
        <div className="h-[812px] md:h-[1080px] md:flex justify-center items-center">
          <div className="md:w-[480px] h-full md:h-fit md:block flex flex-col justify-between p-6 py-10 md:p-14 md:bg-white md:rounded-[30px]">
            <div className="py-24 md:p-0 md:pb-10">
              <Image src={successPic} alt="icon-list" width={65} />
              <h1 className="text-[2.5em] md:text-[3.5em] font-bold leading-10 md:leading-none my-10 mb-6">
                Thanks for subscribing!
              </h1>
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-bold">{emailText}</span>. Please open it
                and click the button inside to confirm your subscription.
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
