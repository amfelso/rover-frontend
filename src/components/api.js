import AWS from "aws-sdk";

const region = "us-east-1"; // Update to your region
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const invokeUrl = process.env.REACT_APP_API_GATEWAY_INVOKE_URL;

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const invokeApi = async (method, path, body = null) => {
  const apiGatewayEndpoint = invokeUrl;

  const signer = new AWS.Signers.V4(
    new AWS.HttpRequest(`${apiGatewayEndpoint}${path}`, region),
    "execute-api"
  );

  signer.addAuthorization(AWS.config.credentials, new Date());

  const headers = {
    ...signer.headers,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(`${apiGatewayEndpoint}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error("Error invoking API:", error);
    throw error;
  }
};

/**
 * Fetches the `earth_date` for the MVP simulation from the DynamoDB table.
 * @returns {Promise<string>} The `earth_date` in YYYY-MM-DD format.
 */
export const fetchDefaultSimulationDate = async () => {
  const params = {
    TableName: "SimulatedDates",
    Key: {
      simulation_id: "mvp", // Fetch the record for `mvp`
    },
  };

  try {
    const data = await dynamoDB.get(params).promise();

    if (data.Item && data.Item.earth_date) {
      console.log("Fetched Simulation Date:", data.Item.earth_date);
      return data.Item.earth_date; // Return the fetched date
    } else {
      console.warn(
        "No simulation date found for MVP. Defaulting to today's date."
      );
      return new Date().toISOString().split("T")[0]; // Default to today's date
    }
  } catch (error) {
    console.error("Error fetching simulation date from DynamoDB:", error);
    return new Date().toISOString().split("T")[0]; // Default to today's date
  }
};
