const fetch=require('node-fetch');
// const setTokenHeader = (tokenHeader) => tokenHeader !== undefined ? tokenHeader:{};
// const setResponseHandler = (handleResponse) => handleResponse !== undefined ? handleResponse:(response) => response;
// const createJsonRequestHandler = ({mainPath,headers,tokenHeader,handleResponse}) => {
//   const options = {
//     mainPath:mainPath,
//     handleResponse:setResponseHandler(handleResponse),
//     headers:{
//       "Content-Type": "application/json",
//       ...setTokenHeader(tokenHeader)
//     }
//   }
//   return ({
//     post: async (to,value) => jsonPostRequest({request}),
//   })
// };
// async function responseWrapper(request,handleResponse){
//   try {
//     const response = await request();
//     return await this.handleResponse(response);
//   } catch (error) {
//     return { status: 500, body: null };
//   }
// }

class JsonRequestHandler {
    constructor({ mainPath, headers,tokenHeader,handleResponse }) {
      this.setMainPath(mainPath);
      this.tokenHeader = tokenHeader !== undefined ? tokenHeader:{};
      this.handleResponse = handleResponse !== undefined ? handleResponse:(response) => response;
      this.headers = {
        "Content-Type": "application/json",
      };
      this.setHeaders(headers);
      this.requireAuth=true;
    }
    setMainPath(mainPath) {
      this.mainPath = mainPath;
    }
    setHeaders(headers) {
      this.headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }
    getToken() {
      return this.tokenHeader;
    }
    async get(from) {
      try {
        const response = await fetch(
          `${this.mainPath}/${from}`,
          {
            method: "get",
            headers: {
              ...this.headers,
              ...this.tokenHeader
            },
        });
        return await this.handleResponse(response);
      } catch (error) {
        return { status: 500, body: null };
      }
    }
    async post(to, value) {
      
      try {
        const response = await fetch(
          `${this.mainPath}/${to}`, {
          method: "post",
          headers: {
            ...this.headers,
            ...this.tokenHeader
          },
          body: JSON.stringify(value)
        });
        
        return await this.handleResponse(response);
      } 
      catch (error) {
        return ({ status: 500, body: {message:error} });
      }
    }
    async delete(from) {
      try{
        const response = await fetch(
          `${this.mainPath}/${from}`, {
          method: "delete",
          headers: {
            ...this.headers,
            ...this.tokenHeader
          }
        });
        return await this.handleResponse(response);
      }
      catch (error) {
        return ({ status: 500, body: {message:error} });
      }
    }
    async patchID(to, id, value) {
      const response = await fetch(
        `${this.mainPath}/${to}/${id}`, 
        {
        method: "PATCH",
        headers: {
          ...this.headers,
          ...this.tokenHeader
        },
        body: JSON.stringify(value)
      });
      return { status: response.status, body: await response.json() };
    }
  }

module.exports=JsonRequestHandler;