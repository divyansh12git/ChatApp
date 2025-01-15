import {
  IDeleteUser,IGetAllUsers,IGetUser,IMutateUser,IUpdateUser
} from "../../../interfaces/databaseController";
import { User } from "../../../interfaces/types";
import { userStrategy } from "../../../interfaces/databaseController";

class userDBManager {
  private _strategy: userStrategy;
  constructor(strategy: userStrategy) {
    this._strategy = strategy;
  }
  set strategy(strategy:userStrategy){
      this._strategy=strategy;
  }
  get strategy() {
    return this._strategy;
  }

  doAction(arg: User | string): Promise<User > | Promise<Array<User>> | Promise<Boolean> {
    if (typeof arg === "string") {
      // Type guard for string (username)
      return this._strategy.execute(arg);
    } else {
      // Type guard for User object
      return this._strategy.execute(arg);
    }
  }
}
export default userDBManager;
