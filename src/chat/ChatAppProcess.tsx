import axios from 'axios';

export class ChatApp {
  /**
   * Fetch conversation for the user
   * @param from
   * @param to
   * @returns
   */
  static async fetchConversation(from: string, to: string) {
    try {
      const { data } = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BACKEND_SERVER_URL}/chat`,
        params: {
          from,
          to,
        },
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
