const defaultObject = (params) => params !== undefined ? params:{};
const setResponseHandler = (handleResponse) =>
  handleResponse !== undefined ? handleResponse : (response) => response.json()
;
const combineParams = (parametersForThisRequest,params) => ( {...defaultObject(parametersForThisRequest), ...defaultObject(params)} ); 

const JsonRequest = ({ mainPath, headers, handleResponse,params }) => {
  const options = {
    mainPath: mainPath,
    headers: {
      "Content-Type": "application/json",
      ...defaultObject(headers)
    }
  }

  const setUrl = (url, params) => url + new URLSearchParams(params);

  return ({
    post: async (to, parametersForThisRequest) => 
      responseWrapper(`${mainPath}/${to}`,{ 
        ...options,body:JSON.stringify(parametersForThisRequest.body),method:"post"
    }),
    getByParameters: async (from,parametersForThisRequest) => 
      responseWrapper(
        setUrl( `${mainPath}/${from}?` , combineParams(parametersForThisRequest,params) ), 
          {...options,method:"get"}, 
        handleResponse
    ),
    getByID: async (from,parametersForThisRequest) => 
      responseWrapper(
        setUrl( `${mainPath}/${from}?` , combineParams(parametersForThisRequest,params) ), 
        { ...options, method:"get" }, 
        handleResponse
    ),
    delete: async (from,parametersForThisRequest) => 
      responseWrapper(
        setUrl( `${mainPath}/${from}?` , combineParams(parametersForThisRequest,params) ), 
        {...options,method:"get"}, 
      handleResponse
    )
  })
};


async function responseWrapper(url,options, handleResponse) {
  try {
    const response = await fetch(url,options);
    return await setResponseHandler()(response);
  } catch (error) {
    return { status: 500, body: null };
  }
}

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

module.exports=JsonRequest;