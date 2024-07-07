const BUSINESS_ID = process.env.EXPO_PUBLIC_BUSINESS_ID;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const APP_ID = process.env.EXPO_PUBLIC_APP_ID;

const apiUrl = `https://api.timbu.cloud/products?organization_id=${BUSINESS_ID}&Appid=${APP_ID}&Apikey=${API_KEY}`;

export const apiCall = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return { success: true, data };
  } catch (err) {
    console.log("got error:", err.message);
    return { success: false, msg: err.message };
  }
};
