import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";//If the environment variable REACT_APP_BASE_URL is set (e.g., in a .env file), it uses that value; otherwise, it defaults to http://localhost:3001. This flexibility allows you to easily switch between different environments (development, staging, production) without changing your code.

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;//stores the JWT

  //endpoint: The specific API endpoint you're hitting (e.g., 'companies/${handle}').
  // data: The payload for POST, PATCH, etc., requests. For GET requests, this would be empty or contain query parameters.
  // method: The HTTP method (GET, POST, PATCH, etc.). Defaults to 'get'.
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;//combines them to form the full URL for the request

    // ensure that every time you make an authenticated request, you check if the token exists and include it in the headers...ensures that if a token is present, it will be used in the Authorization header; otherwise, no Authorization header will be sent.
    const headers = JoblyApi.token ? { Authorization: `Bearer ${JoblyApi.token}` } : {}; //prepares HTTP headers- this token is necessary for the endpoints that require authentication
    const params = (method === "get")//for get request any data passed is treated as URL params
        ? data //for other request types, data is included in the request body
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }


  // Adds or updates the token used for authenticated requests.
  static setToken(newToken) {
    JoblyApi.token = newToken;
  }

  // ********Individual API routes**********

  //******************COMPANIES*********************
  // API method to fetch a list of companies
  static async getCompanies(searchFilters = {}) {
    let res = await this.request(`companies`, searchFilters);
    return res.companies;
  }
  /** Get details on a company by handle. */

  static async getCompanyInfo(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

//*****************USERS***************************
  // API method to register a new user...GOES WITH signup IN APP.JS
  static async register(userData) {
    let res = await this.request(`auth/register`, userData, "post");
    return res.token;
  }

  // API method to authenticate a user and get a token..Goes with login in App.js
  static async login(credentials) {
    let res = await this.request(`auth/token`, credentials, "post");
    return res.token;
  }

    // API method to get the current user's details...GOES WITH getUser in App.js
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  // API method to update the current user's details...WILL GO WITH PROFILE UPDATE PAGE LATER
  static async updateUser(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  //****************JOBS**********************
    // API method to fetch a list of jobs
  static async getJobs(searchFilters = {}) {
    let res = await this.request(`jobs`, searchFilters);
    return res.jobs;
  }
  /** Apply to a job */

  static async applyToJob(username, id) {
    await this.request(`users/${username}/jobs/${id}`, {}, "post");
  }
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


    export default JoblyApi;