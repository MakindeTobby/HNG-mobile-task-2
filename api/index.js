const BUSINESS_ID = "a640eea16fb64be1959fda2f0e620953&Appid=J283CZPFCXLRI4Q";
const API_KEY = "bf0a95998aab4c2db507769f9c93bc4220240704233801699678";

const apiUrl = `https://api.timbu.cloud/products?organization_id=${BUSINESS_ID}&Apikey=${API_KEY}`;

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
