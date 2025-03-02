import axios from 'axios';
import { AppConstants } from '../constants/AppConstants';

export type UserDetails = {
  email: string;
  name: string;
  username: string;
  password: string;
};
export class SignInAPI {
  static async signIn(details: UserDetails) {
    try {
      const { data } = await axios({
        method: 'POST',
        url: `${AppConstants.BASE_URL}/user/sign-up`,
      });
      if (data) {
        return {
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch (err) {
      return {
        success: false,
      };
    }
  }
}
