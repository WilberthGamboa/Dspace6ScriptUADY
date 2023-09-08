class DeleteService {
    constructor(){
        this.serverURL = process.env.URLSERVIDOR

    }

    async deleteItems(cookieses){
        try {
            const response = await axios.get(url, {
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