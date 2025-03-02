import axios from 'axios';

export class LoginProcesses {
  /**
   * Verifying user from backend
   * @param username
   * @param password
   * @returns
   */
  static async verifyUser(username: string, password: string) {
    try {
      const { data } = await axios({
        url: `${import.meta.env.VITE_BACKEND_SERVER_URL}/user/login`,
        method: 'post',
        data: {
          username,
          password,
        },
      });

      return data?.isValid ?? false;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
