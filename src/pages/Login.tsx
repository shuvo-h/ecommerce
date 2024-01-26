/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { authApi } from "../redux/features/auth/authApi";
import { TUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utilies/verifyToken";
import { useAppDispatch } from "../redux/storeHook";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import ElectroForm from "../components/form/ElectroForm";
import ElectroInput from "../components/form/ElectroInput";
import ElectroButton from "../components/form/ElectroButton";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginMutation, {  isLoading,  }] =    authApi.useLoginMutation();
//   console.log({ error, isLoading, data });
  // const {register,handleSubmit,} = useForm<TLoginInputs>()

  const defaultFormValue = {
    email: "user@example.com",
    password: "Aa@12",
  };

  const onSubmit = async (data: FieldValues) => {
    
    const toastId = toast.loading("loading to login");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const response = await loginMutation(userInfo).unwrap(); // unwrap means only return the response data, not all a=object
      
      const user = verifyToken(response.data.accessToken) as TUser;
      dispatch(setUser({ user, token: response.data.accessToken }));
      toast.success("Login successfull", { id: toastId, duration: 2000 });
      navigate(`/dashboard`)
    } catch (error: any) {
      console.log(error.data);
      const message = Array.isArray(error.data?.errorSources) ? error.data.errorSources[0].message : error.data.message || "something went wrong" ;
      toast.error(message, {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Flex
      className="h-screen"
      gap="middle"
      align="center"
      justify="center"
      vertical
    >
      {/* <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" defaultValue={'user@example.com'} {...register("email")} />
                <input type="password" defaultValue={'Aa@12'} {...register("password")} />
                <button type="submit">Login</button>
            </form> */}
      <ElectroForm className="border p-4 rounded-lg shadow-md" onSubmit={onSubmit} defaultValues={defaultFormValue}>
        <ElectroInput
          type="text"
          name="email"
          label="Email"
          // defaultValue='ab@mail.com'
          id="email"
        />

        <ElectroInput
          type="password"
          name="password"
          id="password"
          // defaultValue='admin123'
          label="Password"
        />

        {/* <Button htmlType="submit">Login</Button> */}
        <ElectroButton loading={isLoading} disabled={isLoading} type="submit">Login</ElectroButton>
      </ElectroForm>
    </Flex>
  );
};

export default Login;
