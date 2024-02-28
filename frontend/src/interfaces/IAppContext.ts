import { IUser } from ".";

export default interface IAppContext {
  isLoading: boolean;

  user: IUser | null;

  refetch: () => void;
}
