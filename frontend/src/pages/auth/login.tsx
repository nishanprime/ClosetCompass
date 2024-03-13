import { Button, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import Field from "@/components/Forms/Field";
import { AuthService } from "@/services";
import { handleError, handleSuccess } from "@/utils";
import ErrorsMessage from "@/components/ErrorMessage";

const Login = () => {
  const { control, handleSubmit } = useForm();

  const { mutateAsync, isLoading } = useMutation(AuthService.login, {
    onSuccess: (data) => {
      handleSuccess(data);

      //reload page
      return window.location.reload();
    },
    onError: (error) => {
      handleError(error as AxiosError);
    },
  });

  const onSubmit = async (values: any) => {
    const { username, password } = values;

    await mutateAsync({
      username,
      password,
    });
  };

  return (
    <Flex
      w="full"
      h="full"
      bg="brand.primaryLightBackground"
      align="center"
      justify="center"
      px="4"
    >
      <Flex
        w="full"
        maxW="container.sm"
        bg="white"
        p={["5", "5", "7"]}
        borderRadius="xl"
        shadow="base"
        flexDirection="column"
        gap="3"
      >
        <Heading fontSize={["xl", "2xl"]}>Log in to your account</Heading>
        <Text color="brand.lightText" fontSize="sm">
          Have we met before? Enter your username and password to log in.
        </Text>

        <Divider />
        <ErrorsMessage />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex w="full" flexDirection="column" gap="3" pt="5">
            <Field
              control={control}
              name="username"
              label="Username"
              type="text"
              placeholder="e.g. johndoe"
              required
              showIcon
            />

            <Field
              control={control}
              name="password"
              label="Password"
              type="password"
              placeholder="Minimum 8 characters"
              required
              showIcon
            />
            <Flex w="full" flexDirection="column" gap="5">
              <Button
                w="full"
                colorScheme="brand.primaryScheme"
                isLoading={isLoading}
                type="submit"
              >
                Login
              </Button>

              <Divider pt="3" />
              <Flex
                w="full"
                fontWeight="medium"
                color="brand.lightText"
                fontSize={["xs", "xs", "sm"]}
              >
                <Text>Don't have an account?</Text>

                <Link color="brand.primary" href="/auth/register" ml="2">
                  Register
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Login;
