import axios from 'axios';
export class DeleteService {
    constructor(){
        this.serverURL = `${process.env.URLSERVIDOR}/rest/items/?limit=500`

    }

    async deleteItems(cookieses){
        try {
            const response = await axios.get(this.serverURL, {
              headers: {
                Cookie: cookieses,
              },
            });
        
            if (response.status !== 200) {
              console.error(response.status);
              process.exit(1);
            }
        
            console.log(response.data)
          } catch (error) {
            console.error(error.message);
            process.exit(1);
          }
    }

     async  deleteItem2(itemID, jsessionID) {
      const url = `http://${config.dspace.ip}:${config.dspace.port}/rest/items/${itemID}`;
      const cookies = `JSESSIONID=${jsessionID}`;
    
      try {
        const response = await axios.delete(url, {
          headers: {
            Cookie: cookies,
          },
        });
    
        if (response.status !== 200) {
          console.error(response.status);
          process.exit(1);
        }
    
        // Handle the successful response if needed
        // You can access the response data using response.data
      } catch (error) {
        console.error(error.message);
        process.exit(1);
      }
    }
}