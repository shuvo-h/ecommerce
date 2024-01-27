/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex } from 'antd';
import ElectroForm from '../components/form/ElectroForm';
import ElectroInput from '../components/form/ElectroInput';
import ElectroButton from '../components/form/ElectroButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { verifyToken } from '../utilies/verifyToken';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/storeHook';
import { authApi } from '../redux/features/auth/authApi';

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [registerMutation, {  isLoading,  }] =    authApi.useRegisterMutation();
  const onSubmit = async (data: FieldValues) => {
    
    const toastId = toast.loading("loading to signup");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const response = await registerMutation(userInfo).unwrap(); // unwrap means only return the response data, not all a=object
      
      const user = verifyToken(response.data.accessToken) as TUser;
      dispatch(setUser({ user, token: response.data.accessToken }));
      toast.success(response.message ||"Registration successfull", { id: toastId, duration: 2000 });
      navigate(`/dashboard/gadgets`)
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
      <ElectroForm className="border p-4 rounded-lg shadow-md" onSubmit={onSubmit}>
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
        <ElectroButton loading={isLoading} disabled={isLoading} type="submit">Signup</ElectroButton>
        <div className="mt-4">
            <p>Already have an account? Login <NavLink className={'text-blue-400 underline'} to={'/login'}>here</NavLink></p>
        </div>
      </ElectroForm>
    </Flex>
    );
};

export default Registration;