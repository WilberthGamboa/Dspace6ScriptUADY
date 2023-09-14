import axios from 'axios';
import 'dotenv/config';
export class DeleteService {
    constructor(){
        this.serverURL = `${process.env.URLSERVIDOR}`

    }

    

     async  deleteItem(cookieses) {
      const items = await this.getItems(cookieses);
      
   
     const x = items.forEach(async item => {
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
      console.log(x)
        
      });
   
    }
    async getItems(cookieses){
      try {
        const response = await axios.get(`${this.serverURL}/rest/items/?limit=100`, {
          headers: {
            Cookie: cookieses,
          },
        });
    
        if (response.status !== 200) {
          console.error(response.status);
          process.exit(1);
        }
    
        console.log(response.data)
        return response.data;
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
    }
}