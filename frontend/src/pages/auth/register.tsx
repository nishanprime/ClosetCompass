import { Button, Divider, Flex, Heading, Link, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosError } from "axios";

import Field from "@/components/Forms/Field";
import { AuthService } from "@/services";
import { handleError } from "@/utils";

const Register = () => {
  const {
    control,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation(AuthService.register, {
    onError: (error) => {
      handleError(error as AxiosError);
    },
  });

  const onSubmit = async (values: any) => {
    const { first_name, last_name, email, username, password } = values;

    const response = await mutateAsync({
      first_name,
      last_name,
      email: email.toLowerCase(),
      username,
      password,
    });

    if (response) {
      return navigate(`/`);
    }
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
        <Heading fontSize={["xl", "xl", "2xl"]}>
          Hi there! Let's create your account
        </Heading>
        <Text color="brand.lightText" fontSize="sm">
          Get started with ClosetCompass!
        </Text>

        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex w="full" flexDirection="column" gap="3">
            <Flex w="full" flexDirection={["column", "column", "row"]} gap="3">
              <Field
                control={control}
                name="first_name"
                label="First Name"
                type="text"
                placeholder="e.g. John"
                required
                showIcon
              />
              <Field
                control={control}
                name="last_name"
                label="Last Name"
                type="text"
                placeholder="e.g. Doe"
                required
                showIcon
              />
            </Flex>
            <Field
              control={control}
              name="email"
              label="Email"
              type="email"
              placeholder="e.g. example@site.com"
              required
              showIcon
            />
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
              passwordStrength
            />

            <Flex
              w="full"
              flexDirection="column"
              gap="5"
              fontSize={["sm", "sm", "md"]}
            >
              <Button
                w="full"
                colorScheme="brand.primaryScheme"
                isLoading={isLoading}
                type="submit"
              >
                Create Account
              </Button>

              <Text
                w="full"
                color="brand.lightText"
                fontSize={["xs", "xs", "sm"]}
              >
                By clicking the button above, you agree to our
                <Link
                  as={NavLink}
                  color="brand.primary"
                  to="/terms-of-service"
                  ml="1"
                  fontSize={["xs", "xs", "sm"]}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  as={NavLink}
                  color="brand.primary"
                  to="/privacy-policy"
                  ml="1"
                  fontSize={["xs", "xs", "sm"]}
                >
                  Privacy Policy
                </Link>
              </Text>

              <Divider pt="3" />
              <Flex
                w="full"
                fontWeight="medium"
                color="brand.lightText"
                fontSize={["xs", "xs", "sm"]}
              >
                <Text>Already have an account?</Text>

                <Link color="brand.primary" href="/auth/login" ml="2">
                  Login
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};

export default Register;
