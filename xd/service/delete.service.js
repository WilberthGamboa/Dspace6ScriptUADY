import axios from 'axios';
import 'dotenv/config';
export class DeleteService {
  constructor() {
    this.serverURL = `${process.env.URLSERVIDOR}`
    this.numberItemsDelete = `${process.env.NUMBERSITEMDELETE}`

  }

  async deleteItem(cookieses) {
    const items = await this.getItems(cookieses);
    for (const item of items) {

      const itemID = item.uuid;

      const url = `${this.serverURL}/rest/items/${itemID}`;

      try {
        const response = await axios.delete(url, {
          headers: {
            Cookie: cookieses,
          },
        });

        if (response.status !== 200) {
          console.error(response.status);
          // process.exit(1);
        }

        // Handle the successful response if needed
        // You can access the response data using response.data
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
  


    }



  }
  async getItems(cookieses) {
    try {
      const response = await axios.get(`${this.serverURL}/rest/items/?limit=${this.numberItemsDelete}`, {
        headers: {
          Cookie: cookieses,
        },
      });

      if (response.status !== 200) {
        console.error(response.status);
        process.exit(1);
      }

      return response.data;
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
}